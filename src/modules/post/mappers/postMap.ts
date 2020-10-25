
import { UniqueEntityID } from "@/core/domain/UniqueEntityID";
import { Mapper } from "@/core/infra/Mapper";
import { CommentMap } from "@/modules/comment/mappers/commentMap";
import { UserId } from "@/modules/user/domain/userId";
import { UserMap } from "@/modules/user/mappers/userMap";

import { Post } from "../domain/post";
import { PostContent } from "../domain/postContent";
import { PostDetails } from "../domain/postDetails";
import { PostTitle } from "../domain/postTitle";
import { PostDTO } from "../dtos/postDTO";

export class PostMap implements Mapper<Post> {

  public static toDomain(raw: any): Post {
    const title = PostTitle.create({ value: raw.title }).getValue();
    const content = PostContent.create({ value: raw.content }).getValue();
    const authorId = UserId.create(new UniqueEntityID(raw.owner_id)).getValue()
    const comments = raw.comments.map(c => CommentMap.toDomain(c))

    const postDetailsOrError = Post.create({
      title,
      content,
      authorId,
      comments,
      tags: raw.tags || [],
      createdAt: raw.createdAt,
    })

    postDetailsOrError.isFailure ? console.log(postDetailsOrError.error) : '';

    return postDetailsOrError.isSuccess ? postDetailsOrError.getValue() : null;
  }

  public static toDTO(postDetails: PostDetails): PostDTO {
    return {
      postId: postDetails.postId.id.toString(),
      author: UserMap.toDTO(postDetails.author),
      title: postDetails.title.value,
      content: postDetails.content.value,
      createdAt: postDetails.createdAt,
      numComments: (postDetails.comments || []).length,
    }
  }

  public static toPersistence(post: Post): any {
    return {
      _id: post.postId.id.toString(),
      tags: post.tags,
      title: post.title.value,
      content: post.content.value,
      created_at: post.createdAt,
      author_id: post.authorId.id.toString(),
      comments: (post.comments || []).map(c => c.commentId.id.toString())
    }
  }
}