
import { Result } from "@/core/logic/Result";
import { Guard } from "@/core/logic/Guard";
import { ValueObject } from "@/core/domain/ValueObject";

interface PostTitleProps {
  value: string;
}

export class PostTitle extends ValueObject<PostTitleProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: PostTitleProps) {
    super(props);
  }

  public static create(props: PostTitleProps): Result<PostTitle> {
    const PostTitleResult = Guard.againstNullOrUndefined(props.value, 'title');
    if (!PostTitleResult.succeeded) {
      return Result.fail<PostTitle>(PostTitleResult.message)
    }

    return Result.ok<PostTitle>(new PostTitle(props));
  }
}