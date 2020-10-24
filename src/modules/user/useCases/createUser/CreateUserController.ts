
import * as express from 'express'
import { BaseController } from "@/core/infra/BaseController";
import { DecodedExpressRequest } from "@/core/infra/DecodedRequest";

import { CreateUserDTO } from "./CreateUserDTO";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserUseCaseErrors } from "./CreateUserErrors";

export class CreateUserController extends BaseController {
  private useCase: CreateUserUseCase;

  constructor (useCase: CreateUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const dto: CreateUserDTO = req.body as CreateUserDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case CreateUserUseCaseErrors.UsernameTakenError:
            return this.notFound(error.errorValue().message)
          default:
            return this.fail(error.errorValue().message);
        }
      } else {
        return this.ok(res);
      }

    } catch (err) {
      return this.fail(err)
    }
  }
}