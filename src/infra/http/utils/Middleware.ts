
import { IAuthService } from "@/modules/user/services/authService/IAuthService";

export class Middleware {
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.authService = authService;
  }

  private endRequest(status: 400 | 401 | 403, message: string, res: any): any {
    return res.status(status).send({ message });
  }

  public ensureAuthenticated() {
    return async (req, res, next) => {
      const bearerToken = req.headers['authorization']
      const token = bearerToken.match(/Bearer\s(.*)/, bearerToken)
      // Confirm that the token was signed with our signature.
      if (token) {
        const decoded = await this.authService.decodeJWT(token?.[1]);
        const signatureFailed = !!decoded === false;
        if (signatureFailed) {
          return this.endRequest(403, 'Token invalid!.', res)
        }
        req.user = decoded;

        next();
      } else {
        return this.endRequest(403, 'No access token provided', res)
      }
    }
  }
}