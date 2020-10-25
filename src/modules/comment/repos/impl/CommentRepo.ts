import { PostMap } from "@/modules/post/mappers/postMap";
import { PostId } from "@/modules/post/domain/postId";

import { ICommentRepo } from "./ICommentRepo";
import { Comment } from "../../domain/comment";
import { CommentDetails } from "../../domain/commentDetails";
import { CommentMap } from "../../mappers/commentMap";

export class CommentRepo implements ICommentRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  async exists(postId: PostId): Promise<boolean> {
    const PostModel = this.models.Post;
    const post = await PostModel.findById(postId);
    return !!post === true;
  }

  async getCommentsByPost(postId: PostId): Promise<CommentDetails[]> {
    const PostModel = this.models.Post;
    const posts = await PostModel.find({}).populate('ownerId');
    return posts.map(post => PostMap.toDomain(post));
  }

  async save(comment: Comment): Promise<CommentDetails> {
    const CommentModel = this.models.Comment;
    const rawComment = CommentMap.toPersistence(comment);
    const result = await CommentModel.create(rawComment);
    return result;
  }
}