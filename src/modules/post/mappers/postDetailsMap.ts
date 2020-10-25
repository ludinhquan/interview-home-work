import { UniqueEntityID } from "@/core/domain/UniqueEntityID";
import { Mapper } from "@/core/infra/Mapper";
import { Comment } from "@/modules/comment/domain/comment";
import { CommentMap } from "@/modules/comment/mappers/commentMap";
import { User } from "@/modules/user/domain/user";
import { UserName } from "@/modules/user/domain/userName";
import { UserMap } from "@/modules/user/mappers/userMap";
import { PostContent } from "../domain/postContent";
import { PostDetails } from "../domain/postDetails";
import { PostId } from "../domain/postId";
import { PostTitle } from "../domain/postTitle";
import { PostDTO } from "../dtos/postDTO";

export class PostDetailsMap implements Mapper<PostDetails> {

  public static toDomain(raw: any): PostDetails {
    const comments: Comment[] = raw.comments.map(c => CommentMap.toDomain(c))
    const author: User = User.create({
      username: UserName.create({ value: raw.author_id.username }).getValue(),
      name: raw.author_id.name,
      dob: raw.author_id.dob
    }, new UniqueEntityID(raw.author_id._id)).getValue();

    return PostDetails.create({
      author,
      postId: PostId.create(new UniqueEntityID(raw._id)).getValue(),
      title: PostTitle.create({ value: raw.title }).getValue(),
      content: PostContent.create({ value: raw.content }).getValue(),
      tags: raw.tags,
      createdAt: raw.created_at,
      comments,
      numComments: comments.length,
    }).getValue()
  }

  public static toDTO(postDetails: PostDetails): PostDTO {
    return {
      postId: postDetails.postId.id.toString(),
      author: UserMap.toDTO(postDetails.author),
      title: postDetails.title.value,
      content: postDetails.content.value,
      createdAt: postDetails.createdAt,
      numComments: postDetails.numComments,
      comments: (postDetails.comments || []).map(c => CommentMap.toDTO(c)),
    }
  }
}