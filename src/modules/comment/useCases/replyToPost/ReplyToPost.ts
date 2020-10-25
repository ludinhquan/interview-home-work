import { AppError } from "@/core/logic/AppError";
import { UseCase } from "@/core/domain/UseCase";
import { Either, Result, left, right } from "@/core/logic/Result";

import { UniqueEntityID } from "@/core/domain/UniqueEntityID";
import { UserId } from "@/modules/user/domain/userId";
import { PostId } from "@/modules/post/domain/postId";
import { IPostRepo } from "@/modules/post/repos/impl/IPostRepo";
import { User } from "@/modules/user/domain/user";
import { UserName } from "@/modules/user/domain/userName";

import { ReplyToPostErrors } from "./ReplyToPostErrors";
import { ReplyToPostDTO } from "./ReplyToPostDTO";
import { Comment } from "../../domain/comment";
import { CommentText } from "../../domain/commentText";
import { CommentDetails } from "../../domain/commentDetails";
import { ICommentRepo } from "../../repos";
import { CommentDTO } from "../../dtos/commentDTO";
import { CommentDetailsMap } from "../../mappers/commentDetailsMap";

type Response = Either<
  ReplyToPostErrors.PostNotFoundError |
  AppError.UnexpectedError,
  Result<any>
>

export class ReplyToPost implements UseCase<ReplyToPostDTO, Promise<Response>> {
  private commentRepo: ICommentRepo;
  private postRepo: IPostRepo;

  constructor(commentRepo: ICommentRepo, postRepo: IPostRepo) {
    this.commentRepo = commentRepo;
    this.postRepo = postRepo;
  }

  public async execute(req: ReplyToPostDTO): Promise<Response> {
    try {
      const postIdOrError = PostId.create(new UniqueEntityID(req.postId));
      const authorIdOrError = UserId.create(new UniqueEntityID(req.author.userId));
      const commentTextOrError = CommentText.create({ value: req.comment });

      const dtoResult = Result.combine([
        postIdOrError, authorIdOrError, commentTextOrError
      ]);

      if (dtoResult.isFailure) {
        return left(Result.fail<void>(dtoResult.error)) as Response;
      }

      const postId = postIdOrError.getValue();
      const authorId = authorIdOrError.getValue();
      const text = commentTextOrError.getValue();

      const postIsExist = await this.postRepo.exists(postId);
      if (!postIsExist) return left(new ReplyToPostErrors.PostNotFoundError(postId.id.toString()));

      const commentOrError = Comment.create({
        postId,
        authorId,
        text,
        createdAt: new Date().toISOString()
      });

      if (commentOrError.isFailure) {
        return left(commentOrError);
      }

      const comment = commentOrError.getValue();
      await this.commentRepo.save(comment);
      await this.postRepo.addCommentToPost(comment.commentId.id.toString(), postId);
      const authorName = UserName.create({ value: req.author.username }).getValue();

      const commentDetails: CommentDetails = CommentDetails.create({
        commentId: comment.commentId,
        text: comment.text,
        createdAt: comment.createdAt,
        author: User.create({ username: authorName }, authorId.id).getValue(),
      }).getValue();

      return right(Result.ok<CommentDTO>(CommentDetailsMap.toDTO(commentDetails)));

    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}