import { JWTClaims } from "@/modules/user/domain/jwt";

export interface ReplyToPostDTO {
  author: JWTClaims;
  postId: string;
  comment: string;
}