import { userRepo } from "@/modules/user/repos";

import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";
import { authService } from "../../services";

const createUseCase = new CreateUserUseCase(userRepo, authService);
const createController = new CreateUserController(createUseCase);

export { createUseCase, createController }