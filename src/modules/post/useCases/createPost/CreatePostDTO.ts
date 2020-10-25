import { JWTClaims } from "@/modules/user/domain/jwt";

export interface CreatePostDTO {
  author: JWTClaims,
  title: string;
  content: string;
  tags: Array<string>
}