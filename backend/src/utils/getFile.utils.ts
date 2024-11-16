import axios from 'axios'
import { evaluateCodeQuality, splitTextIntoChunks } from '~/utils'

export const getFileFromGitHub = async (repoUrl: string, sha: string) => {
    try {
        const token = process.env.GITHUB_ACCESS_TOKEN || '';

        // Extract the repo owner and name from the URL
        const [, , , owner, repo] = repoUrl?.split('/');
        // GitHub API URL to get a file by SHA
        const url = `https://api.github.com/repos/${owner}/${repo}/git/blobs/${sha}`;

        // Make the GET request
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`, // GitHub token for authentication
                Accept: 'application/vnd.github.v3.raw', // to get raw file content
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching file:', error);
    }
};

export const getFileReport = async (repoUrl: string, sha: string) => {
    // Get file from github
    const content = await getFileFromGitHub(repoUrl, sha);
    // Split text into chunks for model capatcity
    const chunks = await splitTextIntoChunks(content);
    // Use Promise.allSettled to handle chunk evaluations
    const evaluationsResults = await Promise.allSettled(
        chunks.map(chunk => evaluateCodeQuality(chunk))
    );

    // Filter out rejected evaluations and join successful ones
    const evaluations = evaluationsResults
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value)
        .join('\n\n');
    return evaluations
}

