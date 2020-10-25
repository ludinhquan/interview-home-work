
import { Entity } from "@/core/domain/Entity";
import { Result } from "@/core/logic/Result";
import { Guard } from "@/core/logic/Guard";
import { UniqueEntityID } from "@/core/domain/UniqueEntityID";

import { UserId } from "@/modules/user/domain/userId";
import { PostId } from "@/modules/post/domain/postId";

import { CommentId } from "./commentId";
import { CommentText } from "./commentText";

export interface CommentProps {
  authorId: UserId;
  text: CommentText;
  postId: PostId;
}

export class Comment extends Entity<CommentProps> {

  get commentId (): CommentId {
    return CommentId.create(this._id)
      .getValue();
  }

  get postId (): PostId {
    return this.props.postId;
  }

  get authorId (): UserId {
    return this.props.authorId;
  }

  get text (): CommentText {
    return this.props.text;
  }

  private constructor (props: CommentProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: CommentProps, id?: UniqueEntityID): Result<Comment> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.authorId, argumentName: 'authorId' },
      { argument: props.text, argumentName: 'text' },
      { argument: props.postId, argumentName: 'postId' },
    ]);

    if (!nullGuard.succeeded) {
      return Result.fail<Comment>(nullGuard.message);
    } else {

      const comment = new Comment(props, id);

      return Result.ok<Comment>(comment);
    }
  }
}