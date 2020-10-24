import { Repo } from "@/core/infra/Repo";
import { PostDetail } from "../../useCases/getPosts/GetPostsUseCase";

export interface IPostRepo extends Repo<any> {
    getPosts(): Promise<PostDetail[]>
}
