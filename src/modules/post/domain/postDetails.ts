import { Result } from "@/core/logic/Result";
import { ValueObject } from "@/core/domain/ValueObject";
import { Guard, IGuardArgument } from "@/core/logic/Guard";
import { User } from "@/modules/user/domain/user";
import { Comment } from "@/modules/comment/domain/comment";

import { PostContent } from "./postContent";
import { PostTitle } from "./postTitle";
import { PostId } from "./postId";

interface PostDetailsProps {
  postId: PostId;
  author: User;
  title: PostTitle;
  content: PostContent;
  tags?: string[],
  numComments?: number;
  comments?: Comment[];
  createdAt?: Date | string;
}

export class PostDetails extends ValueObject<PostDetailsProps> {
  get postId(): PostId {
    return this.props.postId;
  }

  get author(): User {
    return this.props.author;
  }

  get title(): PostTitle {
    return this.props.title;
  }

  get content(): PostContent {
    return this.props.content;
  }

  get createdAt(): Date | string {
    return this.props.createdAt;
  }

  get numComments(): number {
    return this.props.numComments;
  }

  get comments(): Comment[] {
    return this.props.comments;
  }

  get tags(): string[] {
    return this.props.tags;
  }

  private constructor(props: PostDetailsProps) {
    super(props);
  }

  public static create(props: PostDetailsProps): Result<PostDetails> {
    const guardArgs: IGuardArgument[] = [
      { argument: props.author, argumentName: 'author' },
      { argument: props.title, argumentName: 'title' },
      { argument: props.content, argumentName: 'content' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);

    if (!guardResult.succeeded) {
      return Result.fail<PostDetails>(guardResult.message);
    }

    return Result.ok<PostDetails>(new PostDetails(props));
  }
}