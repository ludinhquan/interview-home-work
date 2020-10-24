import { userRepo } from "@/modules/user/repos";
import { authService } from "@/modules/user/services";

import { LoginUserUseCase } from "./LoginUseCase";
import { LoginController } from "./LoginController";

const loginUseCase = new LoginUserUseCase(userRepo, authService);
const loginController = new LoginController(loginUseCase);

export { loginController, loginUseCase }