import { AppError } from "@/core/logic/AppError";
import { UseCase } from "@/core/domain/UseCase";
import { Either, Result, left, right } from "@/core/logic/Result";

import { IPostRepo } from "@/modules/post/repos/impl/IPostRepo";
import { GetPostReqDTO } from "./GetPostReqDTO";

type Response = Either<
  AppError.UnexpectedError,
  Result<any>
>


export class GetPostsUseCase implements UseCase<any, Promise<Response>> {
  private postRepo: IPostRepo;

  constructor(postRepo: IPostRepo) {
    this.postRepo = postRepo;
  }

  async execute(params: GetPostReqDTO): Promise<Response> {
    try {
      const posts = await this.postRepo.getPosts(params)
      return right(Result.ok(posts))
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}