import { AppError } from "@/core/logic/AppError";
import { UseCase } from "@/core/domain/UseCase";
import { Either, Result, left, right } from "@/core/logic/Result";

import { UniqueEntityID } from "@/core/domain/UniqueEntityID";
import { UserId } from "@/modules/user/domain/userId";
import { PostTitle } from "@/modules/post/domain/postTitle";
import { PostContent } from "@/modules/post/domain/postContent";
import { Post, PostProps } from "@/modules/post/domain/post";
import { IPostRepo } from "@/modules/post/repos/impl/IPostRepo";

import { CreatePostDTO } from "./CreatePostDTO";
import { PostDTO } from "../../dtos/postDTO";
import { PostDetailsMap } from "../../mappers/postDetailsMap";
import { PostDetails } from "../../domain/postDetails";
import { UserName } from "@/modules/user/domain/userName";
import { User } from "@/modules/user/domain/user";
import { PostId } from "../../domain/postId";

type Response = Either<
  AppError.UnexpectedError,
  Result<PostDTO>
>

export class CreatePostUseCase implements UseCase<CreatePostDTO, Promise<Response>> {
  private postRepo: IPostRepo;

  constructor(postRepo: IPostRepo) {
    this.postRepo = postRepo;
  }

  async execute(request: CreatePostDTO): Promise<Response> {
    const titleOrError = PostTitle.create({ value: request.title });
    const contentOrError = PostContent.create({ value: request.content });
    const authorIdOrError = UserId.create(new UniqueEntityID(request.author.userId));

    const dtoResult = Result.combine([titleOrError, contentOrError]);

    if (dtoResult.isFailure) {
      return left(Result.fail<void>(dtoResult.error)) as Response;
    }

    const title: PostTitle = titleOrError.getValue();
    const content: PostContent = contentOrError.getValue();
    const authorId: UserId = authorIdOrError.getValue();

    try {
      const postProps: PostProps = {
        title,
        content,
        authorId,
        tags: request.tags,
        createdAt: new Date().toISOString()
      };

      const postOrError = Post.create(postProps);

      if (postOrError.isFailure) {
        return left(postOrError);
      }
      const post = postOrError.getValue();
      await this.postRepo.save(post);
      const authorName = UserName.create({ value: request.author.username }).getValue();

      const postDetails: PostDetails = PostDetails.create({
        postId: post.postId,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        numComments: 0,
        author: User.create({ username: authorName }, authorId.id).getValue(),
      }).getValue()

      return right(Result.ok<PostDTO>(PostDetailsMap.toDTO(postDetails)))
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as Response;
    }
  }
}