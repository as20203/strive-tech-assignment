import { Router } from 'express'
import { createCodeQualtity } from '~/controllers';
export const qualityScoreRouter = Router({ mergeParams: true });

qualityScoreRouter.post('/', createCodeQualtity)