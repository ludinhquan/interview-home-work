import { PostId } from "@/modules/post/domain/postId";

import { ICommentRepo } from "./ICommentRepo";
import { Comment } from "../../domain/comment";
import { CommentDetails } from "../../domain/commentDetails";
import { CommentMap } from "../../mappers/commentMap";
import { CommentId } from "../../domain/commentId";
import { CommentDetailsMap } from "../../mappers/commentDetailsMap";

type BaseQuery = {
  [field: string]: number | string | object
}
export class CommentRepo implements ICommentRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  async exists(commentId: CommentId): Promise<boolean> {
    const CommentModel = this.models.Comment;
    const comment = await CommentModel.findById(commentId);
    return !!comment === true;
  }

  async getCommentsByPost(postId: PostId): Promise<CommentDetails[]> {
    const CommentModel = this.models.Comment;
    const comments = await CommentModel.find({ post_id: postId.id.toString() }).populate('author_id');
    return comments.map(c => CommentDetailsMap.toDomain(c));
  }

  async save(comment: Comment): Promise<CommentDetails> {
    const CommentModel = this.models.Comment;
    const rawComment = CommentMap.toPersistence(comment);
    const result = await CommentModel.create(rawComment);
    return result;
  }
}