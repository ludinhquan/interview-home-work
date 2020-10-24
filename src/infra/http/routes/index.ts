
import express from 'express'

import { middleware } from '@/infra/http';
import { userRouter } from '@/modules/user/infra/routes';
import { postRouter } from '@/modules/post/infra/routes';

const routes = express.Router();

routes.use('/ping', 
    middleware.ensureAuthenticated(),
    (_, res) => res.end('Pong!')
);

routes.use('/users', userRouter);
routes.use('/posts', postRouter);

export { routes }