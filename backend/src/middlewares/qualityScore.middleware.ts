import { NextFunction, Request, Response } from "express";
import { checkGitHubRepo, validateGitHubHash } from "~/utils";

export const validateCreateCodeQuality = async (request: Request, response: Response, next: NextFunction) => {
    const { repoUrl, sha, type } = request.body
    const shaType = ['file', 'commit']
    const validateUrl = await checkGitHubRepo(repoUrl)
    console.log({ validateUrl })
    if (!validateUrl) {
        return response.status(400).json({
            message: 'invalid github repo url'
        })
    }
    if (!shaType.includes(type)) {
        return response.status(400).json({
            message: 'invalid sha type'
        })
    }

    const validateSHA = await validateGitHubHash(repoUrl, sha, type)
    if (!validateSHA) {
        return response.status(400).json({
            message: 'invalid sha'
        })
    }

    return next()

}