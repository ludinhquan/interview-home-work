import { Post } from "@/modules/post/domain/post";
import { PostMap } from "@/modules/post/mappers/postMap";
import { PostId } from "@/modules/post/domain/postId";

import { IPostRepo } from "./IPostRepo";
import { PostDetailsMap } from "../../mappers/postDetailsMap";
import { GetPostReqDTO } from "../../useCases/getPosts/GetPostReqDTO";
import { GetPostResDTO } from "../../useCases/getPosts/GetPostResDTO";

type BaseQuery = {
  [field: string]: number | string | object
}

export class PostRepo implements IPostRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  private id(postId: PostId | string): string {
    return postId instanceof PostId
      ? (<PostId>postId).id.toString()
      : postId
  }

  async exists(postId: PostId | string): Promise<boolean> {
    const PostModel = this.models.Post;
    const post = await PostModel.findById(this.id(postId));
    return !!post === true;
  }

  async getPosts(params: GetPostReqDTO): Promise<GetPostResDTO> {
    const PostModel = this.models.Post;
    const query: BaseQuery = {}
    if (params.title)
      query.title = { $regex: params.title, $options: 'i' };

    const posts =
      await PostModel
        .find(query)
        .skip((params.current - 1) * params.limit)
        .limit(params.limit)
        .populate('author_id');
    const total = await PostModel.count(query);

    return {
      total,
      current: params.current || 1,
      posts: posts.map(post => PostDetailsMap.toDomain(post)),
    }
  }

  async addCommentToPost(commentId: string, postId: PostId | string): Promise<void> {
    const PostModel = this.models.Post;
    const post = await PostModel.findOneAndUpdate({ _id: this.id(postId) }, { $addToSet: { comments: commentId } });
    return post;
  }

  async save(post: Post): Promise<void> {
    const PostModel = this.models.Post;
    const rawPost = await PostMap.toPersistence(post);
    return await PostModel.create(rawPost);
  }
}