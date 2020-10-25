import { Post } from "@/modules/post/domain/post";
import { PostMap } from "@/modules/post/mappers/postMap";
import { PostId } from "@/modules/post/domain/postId";

import { IPostRepo } from "./IPostRepo";
import { PostDetails } from "../../domain/postDetails";
import { PostDetailsMap } from "../../mappers/postDetailsMap";

export class PostRepo implements IPostRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  async exists(postId: PostId | string): Promise<boolean> {
    const PostModel = this.models.Post;
    const post = await PostModel.findById(postId);
    return !!post === true;
  }

  async getPosts(): Promise<PostDetails[]> {
    const PostModel = this.models.Post;
    const posts = await PostModel.find({}).populate('author_id');
    return posts.map(post => PostDetailsMap.toDomain(post));
  }

  async save(post: Post): Promise<void> {
    const PostModel = this.models.Post;
    const rawPost = await PostMap.toPersistence(post);
    return await PostModel.create(rawPost);
  }
}