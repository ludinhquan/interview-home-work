import { AppError } from "@/core/logic/AppError";
import { UseCase } from "@/core/domain/UseCase";
import { Either, Result, left, right } from "@/core/logic/Result";

import { IPostRepo } from "@/modules/post/repos/impl/IPostRepo";

import { CreatePostDTO } from "./CreatePostDTO";
import { CreatePostUseCaseErrors } from "./CreatePostErrors";

import { PostTitle } from "../../domain/postTitle";
import { PostContent } from "../../domain/postContent";
import { Post, PostProps } from "../../domain/post";
import { UserId } from "@/modules/user/domain/userId";
import { UniqueEntityID } from "@/core/domain/UniqueEntityID";

type Response = Either<
  CreatePostUseCaseErrors.UsernameTakenError |
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>

export class CreatePostUseCase implements UseCase<CreatePostDTO, Promise<Response>> {
  private postRepo: IPostRepo;

  constructor(postRepo: IPostRepo) {
    this.postRepo = postRepo;
  }

  async execute(request: CreatePostDTO): Promise<Response> {
    const titleOrError = PostTitle.create({ value: request.title });
    const contentOrError = PostContent.create({ value: request.content });
    const ownerIdOrError = UserId.create(new UniqueEntityID(request.ownerId));

    const dtoResult = Result.combine([titleOrError, contentOrError, ownerIdOrError]);

    if (dtoResult.isFailure) {
      return left(Result.fail<void>(dtoResult.error)) as Response;
    }

    const title: PostTitle = titleOrError.getValue();
    const content: PostContent = contentOrError.getValue();
    const ownerId: UserId = ownerIdOrError.getValue();

    try {
      const postProps: PostProps = {
        title,
        content,
        ownerId,
        tags: request.tags,
      };

      const postOrError = Post.create(postProps);
      
      if (postOrError.isFailure) {
        return left(postOrError);
      }
      const post = postOrError.getValue();

      await this.postRepo.save(post);
      return right(Result.ok<void>())
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as Response;
    }
  }
}