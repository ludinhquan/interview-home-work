
import express from 'express'
import { middleware } from '@/infra/http';
import { createPostController } from '@/modules/post/useCases/createPost';

const postRouter = express.Router();

postRouter.post('/',
    middleware.ensureAuthenticated(),
    (req, res) => createPostController.execute(req, res)
)

export { postRouter };