import { config } from 'dotenv';
config();

import express, { Request, Response } from 'express';
import { join } from 'path';
import cors from 'cors'
import { register } from 'tsconfig-paths';
import { compilerOptions } from './tsconfig.json';

const baseUrl = join(__dirname, 'src');

register({
    baseUrl,
    paths: compilerOptions.paths
});

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://localhost', 'http://localhost:3000']
}));


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//*********** */
// import { evaluateCodeQuality, fetchCommitFiles, getFileFromGitHub, splitTextIntoChunks } from '~/utils';

// const repoUrl = 'https://github.com/as20203/online-market-ts'
// const sha = 'dc03a6344c877896b92701a54061bdec8f62e43d'

// const getCommitFiles = async (repoUrl: string, commitHash: string) => {
//     const files = await fetchCommitFiles(repoUrl, sha)
//     if (files.length > 0) {
//         const filePromises = files.map(async (file) => {
//             const { filename, sha } = file;
//             console.log(`Fetching file: ${filename}`);
//             const codeContent = await getFileFromGitHub(repoUrl, sha);
//             return { filename, codeContent };
//         });
//         const results = await Promise.all(filePromises);

//         const fileEvaluations = await Promise.allSettled(
//             results.map(async ({ filename, codeContent }) => {
//                 if (codeContent) {
//                     try {
//                         const chunks = await splitTextIntoChunks(codeContent);
//                         // Use Promise.allSettled to handle chunk evaluations
//                         const evaluationsResults = await Promise.allSettled(
//                             chunks.map(chunk => evaluateCodeQuality(chunk))
//                         );

//                         // Filter out rejected evaluations and join successful ones
//                         const evaluations = evaluationsResults
//                             .filter(result => result.status === 'fulfilled')
//                             .map(result => result.value)
//                             .join('\n\n');

//                         return {
//                             filename,
//                             evaluation: evaluations,
//                         };
//                     } catch (error) {
//                         console.error(`Error processing file ${filename}:`, error);
//                         return null; // Skip this file if there's an error
//                     }
//                 }
//                 return null; // Skip files with falsy codeContent
//             })
//         );

//         // Filter out null results and only include successfully processed files
//         const successfulEvaluations: { filename: string; evaluation: string }[] = fileEvaluations
//             .filter(
//                 (result): result is PromiseFulfilledResult<{ filename: string; evaluation: string }> =>
//                     result.status === 'fulfilled' && result.value !== null
//             )
//             .map(result => result.value);

//         let report = `Code Quality Report for commit ${commitHash}:\n\n`;

//         successfulEvaluations.forEach(({ filename, evaluation }) => {
//             report += `File: ${filename}\n`;
//             report += `Evaluation: \n${evaluation}\n\n`;
//         });
//         console.log({ report })
//         return report
//     }
//     return ''

// }

// const repoUrl = 'https://github.com/as20203/online-market-ts'
// const sha = 'dc03a6344c877896b92701a54061bdec8f62e43d'

// getCommitFiles(repoUrl, sha)



//*************** */

app.get('*', (_: Request, response: Response) => {
    // Send a response to the client
    response.send('Hello, TypeScript + Node.js + Express!');
});


import { qualityScoreRouter } from '~/routes'
app.use('/api/code-quality', qualityScoreRouter);

// Start the server and listen on the specified port
app.listen(port, () => {
    // Log a message when the server is successfully running
    console.log(`Server is running on http://localhost:${port}`);
});