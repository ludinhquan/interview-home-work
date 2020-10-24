
import { Result } from "@/core/logic/Result";
import { Guard } from "@/core/logic/Guard";
import { ValueObject } from "@/core/domain/ValueObject";

interface PostContentProps {
  value: string;
}

export class PostContent extends ValueObject<PostContentProps> {
  get value (): string {
    return this.props.value;
  }

  private constructor (props: PostContentProps) {
    super(props);
  }

  public static create (props: PostContentProps): Result<PostContent> {
    const PostContentResult = Guard.againstNullOrUndefined(props.value, 'content');
    if (!PostContentResult.succeeded) {
      return Result.fail<PostContent>(PostContentResult.message)
    }

    return Result.ok<PostContent>(new PostContent(props));
  }
}