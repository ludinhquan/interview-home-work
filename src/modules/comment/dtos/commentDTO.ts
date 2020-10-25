
import { UserDTO } from "@/modules/user/dtos/userDTO";

export interface CommentDTO {
  commentId: string;
  text: string;
  author: UserDTO;
  createdAt: string | Date;
}

