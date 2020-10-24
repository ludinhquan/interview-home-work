
import { Result } from "@/core/logic/Result";
import { Guard } from "@/core/logic/Guard";
import { AggregateRoot } from "@/core/domain/AggregateRoot";
import { UniqueEntityID } from "@/core/domain/UniqueEntityID";


import { UserId } from "@/modules/user/domain/userId";
import { PostId } from "./postId";
import { PostTitle } from "./postTitle";
import { PostContent } from "./postContent";
import { Tag } from "./tag";

export interface PostProps {
    ownerId: UserId,
    title: PostTitle;
    content: PostContent
    tags?: Tag[],
}

export class Post extends AggregateRoot<PostProps> {

    get postId(): PostId {
        return PostId.create(this._id)
            .getValue();
    }

    get title(): PostTitle {
        return this.props.title;
    }

    get content(): PostContent {
        return this.props.content;
    }

    get tags(): Tag[] {
        return this.props.tags;
    }

    get ownerId(): UserId {
        return this.props.ownerId;
    }


    private constructor(props: PostProps, id?: UniqueEntityID) {
        super(props, id)
    }

    public static create(postProps: PostProps, id?: UniqueEntityID): Result<Post> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: postProps.title, argumentName: 'title' },
            { argument: postProps.content, argumentName: 'content' }
        ]);

        if (!guardResult.succeeded) {
            return Result.fail<Post>(guardResult.message)
        }

        const post = new Post(postProps, id);

        return Result.ok<Post>(post);
    }
}