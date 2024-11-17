import axios from 'axios';

type HashType = 'commit' | 'file';
const token = process.env.GITHUB_ACCESS_TOKEN || '';

/**
 * Validate a GitHub commit or file hash.
 * @param url - The GitHub repository URL.
 * @param hash - The commit or file hash to validate.
 * @param type - The type of hash ('commit' or 'file').
 * @returns A promise that resolves to true if the hash is valid, otherwise false.
 */
export const validateGitHubHash = async (url: string, hash: string, type: HashType): Promise<boolean> => {
    try {
        const match = url.match(/^https:\/\/github\.com\/([\w-]+)\/([\w.-]+)(\/)?$/);
        if (!match) {
            console.log('Failed to parse the GitHub URL.');
            return false;
        }
        const [, owner, repo] = match;
        if (typeof hash !== 'string') {
            return false
        }

        // Determine the appropriate GitHub API endpoint based on the hash type
        const apiUrl =
            type === 'commit'
                ? `https://api.github.com/repos/${owner}/${repo}/commits/${hash}`
                : `https://api.github.com/repos/${owner}/${repo}/git/blobs/${hash}`;
        // Validate the hash using the GitHub API
        const response = await axios.get(apiUrl, {
            headers: {
                'User-Agent': 'node.js',
                Accept: 'application/vnd.github.v3+json',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.status === 200
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 404) {
                console.log(`Invalid ${type} hash.`);
                return false;
            }
        }
        if (error instanceof Error) {
            console.error(`Error validating ${type} hash:`, error.message);
            return false
        }
        console.error('Invalid error')
        return false;
    }
}