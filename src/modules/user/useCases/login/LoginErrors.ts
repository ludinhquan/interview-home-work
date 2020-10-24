
import { Result } from "@/core/logic/Result"
import { UseCaseError } from "@/core/logic/UseCaseError"

export namespace LoginUseCaseErrors {

  export class UserNameDoesntExistError extends Result<UseCaseError> {
    constructor () {
      super(false, {
        message: `Username or password incorrect.`
      } as UseCaseError)
    }
  }
  
}