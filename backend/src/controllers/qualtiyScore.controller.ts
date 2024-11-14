import { Request, Response } from 'express';
import { getFileFromGitHub, evaluateCodeQuality } from '~/utils';
// const repoUrl = 'https://github.com/as20203/online-market-ts';
// const sha = 'd76043dd80d1eaf92b749f24fdf7ee95004e48ef';
interface Error {
    message: string;
}

export const createCodeQualtity = async (request: Request, response: Response) => {
    try {
        const { repoUrl, sha } = request.body
        console.log(request.body)
        const token = process.env.GITHUB_ACCESS_TOKEN || '';
        const content = await getFileFromGitHub(repoUrl, sha, token);
        const quality = await evaluateCodeQuality(content)
        response.status(200).json({
            quality
        })

    } catch (error) {
        if (error instanceof Error) {
            const { message } = error;
            console.log({ error: error?.message })
            response.status(500).json({
                error: message
            })
        } else {
            response.status(500).json({
                error: 'An unknown error occured'
            })
        }
    }
}