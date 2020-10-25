
import { ValueObject } from "@/core/domain/ValueObject";
import { Result } from "@/core/logic/Result";
import { Guard } from "@/core/logic/Guard";

import { User } from "@/modules/user/domain/user";

import { CommentText } from "./commentText";
import { CommentId } from "./commentId";

interface CommentDetailsProps {
  commentId: CommentId;
  text: CommentText;
  author: User;
  createdAt: Date | string;
}

export class CommentDetails extends ValueObject<CommentDetailsProps> {

  get commentId (): CommentId {
    return this.props.commentId;
  }

  get text (): CommentText {
    return this.props.text;
  }

  get author (): User {
    return this.props.author;
  }

  get createdAt (): Date | string {
    return this.props.createdAt;
  }

  private constructor (props: CommentDetailsProps) {
    super(props);
  }

  public static create (props: CommentDetailsProps): Result<CommentDetails> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.commentId, argumentName: 'commentId' },
      { argument: props.text, argumentName: 'text' },
      { argument: props.author, argumentName: 'author' },
    ]);

    if (!nullGuard.succeeded) {
      return Result.fail<CommentDetails>(nullGuard.message);
    }

    return Result.ok<CommentDetails>(new CommentDetails(props));
  }
}