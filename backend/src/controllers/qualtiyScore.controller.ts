import { Request, Response } from 'express';
import { getFileFromGitHub, evaluateCodeQuality } from '~/utils';
import { extname } from 'path';


// const repoUrl = 'https://github.com/as20203/online-market-ts';
// const sha = 'd76043dd80d1eaf92b749f24fdf7ee95004e48ef';
export const createCodeQualtity = async (request: Request, response: Response) => {
    const { repoUrl, sha } = request.body
    const token = process.env.GITHUB_ACCESS_TOKEN || '';
    const content = await getFileFromGitHub(repoUrl, sha, token);
    const quality = await evaluateCodeQuality(content)
    response.status(200).json({
        quality
    })
}