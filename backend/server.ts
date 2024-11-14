import { config } from 'dotenv';
config();

import express, { Request, Response } from 'express';
import { join } from 'path';

import { register } from 'tsconfig-paths';
import { compilerOptions } from './tsconfig.json';
import { getFileFromGitHub } from '~/utils';
// import { evaluateCodeQuality, getFileFromGitHub } from '~/utils';

const baseUrl = join(__dirname, '');

register({
    baseUrl,
    paths: compilerOptions.paths
});


/*
Testing only

*/

// const repoUrl = 'https://github.com/as20203/online-market-ts';
// const sha = 'd76043dd80d1eaf92b749f24fdf7ee95004e48ef';
// const token = process.env.GITHUB_ACCESS_TOKEN || ''; // Replace with your GitHub token

// const checkCodeQuality = async () => {
//     const content = await getFileFromGitHub(repoUrl, sha, token);
//     console.log(await getFileType(content))
// }

// checkCodeQuality()

// #####

// Import the 'express' module

// Create an Express application
const app = express();

// Set the port number for the server
const port = process.env.PORT || 3000;

// Define a route for the root path ('/')
app.get('/', (request: Request, response: Response) => {
    // Send a response to the client
    response.send('Hello, TypeScript + Node.js + Express!');
});

import { qualityScoreRouter } from '~/routes'
app.use('/code-quality', qualityScoreRouter);


// Start the server and listen on the specified port
app.listen(port, () => {
    // Log a message when the server is successfully running
    console.log(`Server is running on http://localhost:${port}`);
});