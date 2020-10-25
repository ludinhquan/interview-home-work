

import express from 'express'
import { middleware } from '@/infra/http';

// import { getCommentsByPostSlugController } from '../../../useCases/comments/getCommentsByPostSlug';
import { replyToPostController } from '@/modules/comment/useCases/replyToPost';

const commentRouter = express.Router();

// commentRouter.get('/',
//   middleware.ensureAuthenticated(),
//   (req, res) => getCommentsByPostSlugController.execute(req, res)
// )

commentRouter.post('/',
  middleware.ensureAuthenticated(),
  (req, res) => replyToPostController.execute(req, res)
)

export {
  commentRouter
}