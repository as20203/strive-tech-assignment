import axios from 'axios';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { getFileFromGitHub, evaluateCodeQuality } from '~/utils';

const token = process.env.GITHUB_ACCESS_TOKEN || '';

interface FileData {
    sha: string;
    filename: string;
    status: 'modified' | 'added' | 'removed'; // Define allowed statuses
    additions: number;
    deletions: number;
    changes: number;
    blob_url: string;
    raw_url: string;
    contents_url: string;
    patch?: string; // Optional since not all files may have a patch
}

interface Results {
    filename: string;
    codeContent: string;
}

export const fetchCommitFiles = async (repoUrl: string, commitHash: string): Promise<FileData[]> => {
    try {
        const [, , , owner, repo] = repoUrl?.split('/');
        const url = `https://api.github.com/repos/${owner}/${repo}/commits/${commitHash}`;
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        // Get file changes from the commit
        const files: FileData[] = response.data.files;
        return files;
    } catch (error) {
        console.error('Error fetching commit data:', error);
        return [];
    }
}

export const splitTextIntoChunks = async (text: string) => {
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 6000, // Number of characters per chunk
        chunkOverlap: 200, // Number of characters that overlap between chunks
    });

    const chunks = await textSplitter.splitText(text);
    return chunks;
}


const getFileEvaluations = async (results: Results[]) => {
    return await Promise.allSettled(
        results.map(async ({ filename, codeContent }) => {
            if (codeContent) {
                try {
                    const chunks = await splitTextIntoChunks(codeContent);
                    // Use Promise.allSettled to handle chunk evaluations
                    const evaluationsResults = await Promise.allSettled(
                        chunks.map(chunk => evaluateCodeQuality(chunk))
                    );

                    // Filter out rejected evaluations and join successful ones
                    const evaluations = evaluationsResults
                        .filter(result => result.status === 'fulfilled')
                        .map(result => result.value)
                        .join('\n\n');

                    return {
                        filename,
                        evaluation: evaluations,
                    };
                } catch (error) {
                    console.error(`Error processing file ${filename}:`, error);
                    return null;
                }
            }
            return null;
        })
    );

}
export const getCommitReport = async (repoUrl: string, commitHash: string) => {

    // Fetching files in commit
    const files = await fetchCommitFiles(repoUrl, commitHash)
    if (files.length > 0) {

        // Getting files content
        const filePromises = files.map(async (file) => {
            const { filename, sha } = file;
            console.log(`Fetching file: ${filename}`);

            const codeContent = await getFileFromGitHub(repoUrl, sha);
            return { filename, codeContent };
        });
        const results = await Promise.all(filePromises);

        // Getting file code quality evaluations from llm.
        const fileEvaluations = await getFileEvaluations(results)

        // Filter out null results and only include successfully processed files
        const successfulEvaluations: { filename: string; evaluation: string }[] = fileEvaluations
            .filter(
                (result): result is PromiseFulfilledResult<{ filename: string; evaluation: string }> =>
                    result.status === 'fulfilled' && result.value !== null
            )
            .map(result => result.value);

        let report = `Code Quality Report for commit ${commitHash}:\n\n`;

        // Return successful evaluations
        successfulEvaluations.forEach(({ filename, evaluation }) => {
            report += `File: ${filename}\n`;
            report += `Evaluation: \n${evaluation}\n\n`;
        });
        console.log({ report })
        return report
    }
    return ''
}