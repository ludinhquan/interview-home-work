import { UniqueEntityID } from "@/core/domain/UniqueEntityID";
import { Mapper } from "@/core/infra/Mapper";
import { User } from "@/modules/user/domain/user";
import { UserName } from "@/modules/user/domain/userName";
import { UserMap } from "@/modules/user/mappers/userMap";
import { CommentDetails } from "../domain/commentDetails";
import { CommentId } from "../domain/commentId";
import { CommentText } from "../domain/commentText";
import { CommentDTO } from "../dtos/commentDTO";

export class CommentDetailsMap implements Mapper<CommentDetails> {

  public static toDomain(raw: any): CommentDetails {
    const author: User = User.create({
      username: UserName.create({ value: raw.author_id.username }).getValue(),
      name: raw.author_id.name,
      dob: raw.author_id.dob
    }, new UniqueEntityID(raw.author_id._id)).getValue();

    return CommentDetails.create({
      author,
      commentId: CommentId.create(new UniqueEntityID(raw._id)).getValue(),
      text: CommentText.create({ value: raw.text }).getValue(),
      createdAt: raw.created_at
    }).getValue()
  }

  public static toDTO(commentDetails: CommentDetails): CommentDTO {
    return {
      commentId: commentDetails.commentId.id.toString(),
      text: commentDetails.text.value,
      author: UserMap.toDTO(commentDetails.author),
      createdAt: commentDetails.createdAt
    }
  }
}