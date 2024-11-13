const axios = require('axios');

export const getFileFromGitHub = async (repoUrl: string, sha: string, token: string) => {
    try {
        // Extract the repo owner and name from the URL
        const [, , , owner, repo] = repoUrl.split('/');
        console.log({ owner, repo });
        // GitHub API URL to get a file by SHA
        const url = `https://api.github.com/repos/${owner}/${repo}/git/blobs/${sha}`;

        // Make the GET request
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`, // GitHub token for authentication
                Accept: 'application/vnd.github.v3.raw', // to get raw file content
            },
        });
        console.log('File content:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching file:', error);
    }
};

// Example usage
