
import express from 'express'

import { userRouter } from '@/modules/user/infra/routes';
import { middleware } from '..';

const routes = express.Router();

routes.use('/ping', 
    middleware.ensureAuthenticated(),
    (_, res) => res.end('Pong!')
);

routes.use('/users', userRouter);

export { routes }