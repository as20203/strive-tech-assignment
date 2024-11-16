import axios from 'axios';

function isValidGitHubUrlFormat(url: string): boolean {
    const regex = /^https:\/\/github\.com\/([\w-]+)\/([\w.-]+)(\/)?$/;
    return regex.test(url);
}

/**
 * Check if a GitHub repository exists using the GitHub API.
 * @param url - The GitHub URL to check.
 * @returns A promise that resolves to true if the repository exists, otherwise false.
 */
export const checkGitHubRepo = async (url: string): Promise<boolean> => {
    try {
        if (!isValidGitHubUrlFormat(url)) {
            console.log('Invalid GitHub URL format.');
            return false;
        }

        // Extract owner and repo name from the URL
        const match = url.match(/^https:\/\/github\.com\/([\w-]+)\/([\w.-]+)(\/)?$/);
        if (!match) {
            console.log('Failed to parse the GitHub URL.');
            return false;
        }
        const [, owner, repo] = match;

        // Construct the GitHub API URL
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;
        console.log({ apiUrl })
        // Make a GET request to the GitHub API
        const response = await axios.get(apiUrl, {
            headers: {
                'User-Agent': 'node.js', // GitHub API requires a User-Agent header
                Accept: 'application/vnd.github.v3+json',
            },
        });

        return response.status === 200; // Return true if the repository exists
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 404) {
                return false; // Repository does not exist
            }
        }
        if (error instanceof Error) {
            const { message } = error
            console.error('Error fetching the GitHub API:', message);
            return false
        }
        console.error('unknown error');
        return false; // Return false for unexpected errors
    }
}