
import express from 'express'
import { middleware } from '@/infra/http';
import { loginController } from '@/modules/user/useCases/login';
import { createController } from '@/modules/user/useCases/createUser';

const userRouter = express.Router();

userRouter.post('/',
    (req, res) => createController.execute(req, res)
)

userRouter.post('/login',
    (req, res) => loginController.execute(req, res)
)

export { userRouter };