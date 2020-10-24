import { userRepo } from "@/modules/user/repos";

import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";

const createUseCase = new CreateUserUseCase(userRepo);
const createController = new CreateUserController(createUseCase);

export { createUseCase, createController }