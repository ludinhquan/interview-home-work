import { AppError } from "@/core/logic/AppError";
import { UseCase } from "@/core/domain/UseCase";
import { Either, Result, left, right } from "@/core/logic/Result";

import { IPostRepo } from "@/modules/post/repos/impl/IPostRepo";

export type PostDetail = {
  title: string,
}

type Response = Either<
  AppError.UnexpectedError,
  Result<PostDetail[]>
>


export class GetPostsUseCase implements UseCase<any, Promise<Response>> {
  private postRepo: IPostRepo;

  constructor(postRepo: IPostRepo) {
    this.postRepo = postRepo;
  }

  async execute(): Promise<Response> {
    try {
      const posts = await this.postRepo.getPosts()
      return right(Result.ok<PostDetail[]>(posts))
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}