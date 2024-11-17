import { Router } from 'express'
import { createCodeQualtity } from '~/controllers';
import { validateCreateCodeQuality } from '~/middlewares';
export const qualityScoreRouter = Router({ mergeParams: true });

qualityScoreRouter.post('/', validateCreateCodeQuality, createCodeQualtity)