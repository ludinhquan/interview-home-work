
import { Result } from "@/core/logic/Result";
import { UseCaseError } from "@/core/logic/UseCaseError";

export namespace ReplyToPostErrors {

  export class PostNotFoundError extends Result<UseCaseError> {
    constructor (postId: string) {
      super(false, {
        message: `Couldn't find a post by id {${postId}}.`
      } as UseCaseError)
    }
  }

}