import { UserDTO } from "@/modules/user/dtos/userDTO";
import { CommentDTO } from "@/modules/comment/dtos/commentDTO";

export interface PostDTO {
    postId: string,
    title: string;
    content: string,
    createdAt: string | Date;
    author: UserDTO;
    numComments: number;
    comments?: CommentDTO[]
}

