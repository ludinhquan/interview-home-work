
import { Result } from "@/core/logic/Result";
import { Guard } from "@/core/logic/Guard";
import { AggregateRoot } from "@/core/domain/AggregateRoot";
import { UniqueEntityID } from "@/core/domain/UniqueEntityID";


import { UserId } from "@/modules/user/domain/userId";
import { Comment } from "@/modules/comment/domain/comment";

import { PostId } from "./postId";
import { PostTitle } from "./postTitle";
import { PostContent } from "./postContent";

export interface PostProps {
    authorId: UserId,
    title: PostTitle;
    content: PostContent;
    tags?: string[];
    comments?: Comment[];
    createdAt?: string | Date;
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

    get tags(): string[] {
        return this.props.tags;
    }

    get authorId(): UserId {
        return this.props.authorId;
    }

    get comments(): Comment[]{
        return this.props.comments;
    }
    
    get createdAt(): string | Date {
        return this.props.createdAt;
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