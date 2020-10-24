
import { JWTToken, JWTClaims } from "@/modules/user/domain/jwt";

export interface IAuthService {
  signJWT (props: JWTClaims): JWTToken;
  decodeJWT (token: string): Promise<JWTClaims>;
}