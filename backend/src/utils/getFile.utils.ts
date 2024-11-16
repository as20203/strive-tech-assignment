import axios from 'axios'

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

// Example usage
