
import express from 'express'
import { middleware } from '@/infra/http';
import { createPostController } from '@/modules/post/useCases/createPost';
import { getPostsController } from '@/modules/post/useCases/getPosts';

const postRouter = express.Router();

postRouter.get('/',
    (req, res) => getPostsController.execute(req, res)
)

postRouter.post('/',
    middleware.ensureAuthenticated(),
    (req, res) => createPostController.execute(req, res)
)

export { postRouter };