import { Post } from "@/modules/post/domain/post";
import { PostMap } from "@/modules/post/mappers/postMap";
import { PostId } from "@/modules/post/domain/postId";

import { IPostRepo } from "./IPostRepo";

export class PostRepo implements IPostRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  async exists(postId: PostId): Promise<boolean> {
    const PostModel = this.models.Post;
    const post = await PostModel.findById(postId);
    return !!post === true;
  }

  async save(post: Post): Promise<void> {
    const PostModel = this.models.Post;
    const rawPost = await PostMap.toPersistence(post);
    return await PostModel.create(rawPost);
  }
}