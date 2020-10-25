

import express from 'express'
import { middleware } from '@/infra/http';

import { replyToPostController } from '@/modules/comment/useCases/replyToPost';
import { getCommentByPostController } from '@/modules/comment/useCases/getCommentByPost'

const commentRouter = express.Router();

commentRouter.get('/',
  (req, res) => getCommentByPostController.execute(req, res)
)

commentRouter.post('/',
  middleware.ensureAuthenticated(),
  (req, res) => replyToPostController.execute(req, res)
)

export {
  commentRouter
}