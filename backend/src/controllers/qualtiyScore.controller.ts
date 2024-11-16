import { Request, Response } from 'express';
import { getFileFromGitHub, evaluateCodeQuality, getCommitReport } from '~/utils';

export const createCodeQualtity = async (request: Request, response: Response) => {
    try {
        const { repoUrl, sha, type } = request.body
        console.log(request.body)

        switch (type) {
            case 'file':
                const content = await getFileFromGitHub(repoUrl, sha);
                const quality = await evaluateCodeQuality(content)
                return response.status(200).json({
                    quality
                })
            case 'commit':
                const report = await getCommitReport(repoUrl, sha)
                return response.status(200).json({
                    quality: report
                })
            default:
                return response.status(422).json({
                    message: 'Invalid type provided'
                })
        }

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