
import { Mapper } from "@/core/infra/Mapper";
import { UserId } from "@/modules/user/domain/userId";
import { PostId } from "@/modules/post/domain/postId";
import { UniqueEntityID } from "@/core/domain/UniqueEntityID";

import { Comment } from "../domain/comment";
import { CommentText } from "../domain/commentText";

export class CommentMap implements Mapper<Comment> {

  public static toPersistence (comment: Comment): any {
    return {
      _id: comment.commentId.id.toString(),
      post_id: comment.postId.id.toString(),
      author_id: comment.authorId.id.toString(),
      text: comment.text.value,
      created_at: comment.createdAt,
    }
  }

  public static toDTO (comment: Comment): any {
    return {
      commentId: comment.commentId.id.toString(),
      postId: comment.postId.id.toString(),
      authorId: comment.authorId.id.toString(),
      text: comment.text.value
    }
  }

  public static toDomain (raw: any): Comment {
    const commentOrError = Comment.create({
      postId: PostId.create(new UniqueEntityID(raw.post_id)).getValue(),
      authorId: UserId.create(new UniqueEntityID(raw.member_id)).getValue(),
      text: CommentText.create({ value: raw.text }).getValue(),
    }, new UniqueEntityID(raw.comment_id));

    commentOrError.isFailure ? console.log(commentOrError.error) : '';

    return commentOrError.isSuccess ? commentOrError.getValue() : null;
  }
}