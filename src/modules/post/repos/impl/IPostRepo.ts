import { Repo } from "@/core/infra/Repo";
import { PostDetails } from "../../domain/postDetails";

export interface IPostRepo extends Repo<any> {
    getPosts(): Promise<PostDetails[]>
}
