import { Repo } from "@/core/infra/Repo";
import { PostId } from "@/modules/post/domain/postId";

import { CommentDetails } from "../../domain/commentDetails";

export interface ICommentRepo extends Repo<any> {
    getCommentsByPost(postId: PostId): Promise<CommentDetails[]>
}
