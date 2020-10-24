
import { Result } from "@/core/logic/Result"
import { UseCaseError } from "@/core/logic/UseCaseError"

export namespace CreateUserUseCaseErrors {

  export class UsernameTakenError extends Result<UseCaseError> {
    constructor(username: string) {
      super(false, {
        message: `The username ${username} was already taken`
      } as UseCaseError)
    }
  }

}