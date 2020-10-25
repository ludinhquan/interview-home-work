import { Repo } from "@/core/infra/Repo";
import { PostId } from "../../domain/postId";

import { GetPostReqDTO } from "../../useCases/getPosts/GetPostReqDTO";
import { GetPostResDTO } from "../../useCases/getPosts/GetPostResDTO";

export interface IPostRepo extends Repo<any> {
    getPosts(params: GetPostReqDTO): Promise<GetPostResDTO>,
    addCommentToPost(commentId: string, postId: PostId | string): Promise<void>
}
