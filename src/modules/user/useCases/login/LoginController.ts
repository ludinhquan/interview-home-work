
import * as express from 'express'
import { BaseController } from "@/core/infra/BaseController";

import { LoginUserUseCase } from "./LoginUseCase";
import { LoginUseCaseErrors } from "./LoginErrors";
import { LoginDTO, LoginDTOResponse } from "./LoginDTO";

export class LoginController extends BaseController {
  private useCase: LoginUserUseCase;

  constructor(useCase: LoginUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    const dto: LoginDTO = req.body as LoginDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value.errorValue();
        const message = (error.message || error) as string;
        switch (error.constructor) {
          case LoginUseCaseErrors.UserNameDoesntExistError:
            return this.notFound(message)
          default:
            return this.fail(message);
        }
      } else {
        const dto: LoginDTOResponse = result.value.getValue() as LoginDTOResponse;
        return this.ok<LoginDTOResponse>(res, dto);
      }

    } catch (err) {
      return this.fail(err)
    }
  }
}