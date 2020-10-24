
import { JWTToken } from "@/modules/user/domain/jwt";

export interface LoginDTO {
  username: string;
  password: string;
}

export interface LoginDTOResponse {
  accessToken: JWTToken;
}