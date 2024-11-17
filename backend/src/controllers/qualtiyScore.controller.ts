import { Request, Response } from 'express';
import { getCommitReport, getFileReport } from '~/utils';

export const createCodeQualtity = async (request: Request, response: Response) => {
    try {
        const { repoUrl, sha, type } = request.body

        switch (type) {
            case 'file':
                const quality = await getFileReport(repoUrl, sha)
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
            return response.status(500).json({
                error: message
            })
        }
        return response.status(500).json({
            error: 'An unknown error occured'
        })
    }
}