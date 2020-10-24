import * as jwt from 'jsonwebtoken'
import { authConfig } from '@/config'
import { JWTToken, JWTClaims } from '@/modules/user/domain/jwt';

import { IAuthService } from './IAuthService';

export class AuthService implements IAuthService {
  
  public jwtHashName: string  = 'activeJwtClients';

  /**
   * @function signJWT
   * @desc Signs the JWT token using the server secret with some claims
   * about the current user.
   */

  public signJWT (props: JWTClaims): JWTToken {
    const claims: JWTClaims = {
      username: props.username,
      userId: props.userId,
    };
    return jwt.sign(claims, authConfig.secret, {
      expiresIn: authConfig.tokenExpiryTime
    });
  }

  /**
   * @method decodeJWT
   * @desc Decodes the JWT using the server secret. If successful decode,
   * it returns the data from the token.
   * @param {token} string
   * @return Promise<any>
   */

  public decodeJWT (token: string): Promise<JWTClaims> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return resolve(null);
        return resolve(decoded);
      });
    })
  }
}