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
    origin: ['http://localhost:3000']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (request: Request, response: Response) => {
    // Send a response to the client
    response.send('Hello, TypeScript + Node.js + Express!');
});

import { qualityScoreRouter } from '~/routes'
app.use('/api/code-quality', qualityScoreRouter);

app.get('*', (request: Request, response: Response) => {
    // Send a response to the client
    response.send('Hello, TypeScript + Node.js + Express!');
});


// Start the server and listen on the specified port
app.listen(port, () => {
    // Log a message when the server is successfully running
    console.log(`Server is running on http://localhost:${port}`);
});