import { Mapper } from "@/core/infra/Mapper";
import { UserMap } from "@/modules/user/mappers/userMap";
import { CommentDetails } from "../domain/commentDetails";
import { CommentDTO } from "../dtos/commentDTO";

export class CommentDetailsMap implements Mapper<CommentDetails> {
  public static toDTO (commentDetails: CommentDetails): CommentDTO {
    return {
      commentId: commentDetails.commentId.id.toString(),
      text: commentDetails.text.value,
      author: UserMap.toDTO(commentDetails.author),
      createdAt: commentDetails.createdAt
    }
  } 
}