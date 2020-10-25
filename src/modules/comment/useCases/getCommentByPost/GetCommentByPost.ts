import { AppError } from "@/core/logic/AppError";
import { UseCase } from "@/core/domain/UseCase";
import { Either, Result, left, right } from "@/core/logic/Result";

import { UniqueEntityID } from "@/core/domain/UniqueEntityID";
import { PostId } from "@/modules/post/domain/postId";

import { ICommentRepo } from "../../repos";
import { GetCommentByPostErrors } from "./GetCommentByPostErrors";

type Response = Either<
  GetCommentByPostErrors.PostNotFoundError |
  AppError.UnexpectedError,
  Result<any>
>

export class GetCommentByPost implements UseCase<GetCommentByPost, Promise<Response>> {
  private commentRepo: ICommentRepo;

  constructor(commentRepo: ICommentRepo) {
    this.commentRepo = commentRepo;
  }

  public async execute(req): Promise<Response> {
    try {
      const postIdOrError = PostId.create(new UniqueEntityID(req.postId));

      const dtoResult = Result.combine([postIdOrError]);

      if (dtoResult.isFailure) {
        return left(Result.fail<void>(dtoResult.error)) as Response;
      }

      const postId = postIdOrError.getValue();
      
      const comments = await this.commentRepo.getCommentsByPost(postId);

      return right(Result.ok(comments));

    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}