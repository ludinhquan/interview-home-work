

import { AppError } from "@/core/logic/AppError";
import { UseCase } from "@/core/domain/UseCase";
import { Either, Result, left, right } from "@/core/logic/Result";


import { User } from "@/modules/user/domain/user";
import { JWTToken } from "@/modules/user/domain/jwt";
import { UserName } from "@/modules/user/domain/userName";
import { UserPassword } from "@/modules/user/domain/userPassword";
import { IUserRepo } from "@/modules/user/repos/impl/IUserRepo";
import { IAuthService } from "@/modules/user/services/authService/IAuthService";


import { LoginUseCaseErrors } from "./LoginErrors";
import { LoginDTO, LoginDTOResponse } from "./LoginDTO";

type Response = Either<
  LoginUseCaseErrors.UserNameDoesntExistError,
  Result<LoginDTOResponse>
>

export class LoginUserUseCase implements UseCase<LoginDTO, Promise<Response>> {
  private userRepo: IUserRepo;
  private authService: IAuthService;

  constructor(userRepo: IUserRepo, authService: IAuthService) {
    this.userRepo = userRepo;
    this.authService = authService
  }

  public async execute(request: LoginDTO): Promise<Response> {
    let user: User;
    let userName: UserName;
    let password: UserPassword;

    try {

      const usernameOrError = UserName.create({ name: request.username });
      const passwordOrError = UserPassword.create({ value: request.password });
      const payloadResult = Result.combine([usernameOrError, passwordOrError]);

      if (payloadResult.isFailure) {
        return left(Result.fail<any>(payloadResult.error))
      }

      userName = usernameOrError.getValue();
      password = passwordOrError.getValue();

      user = await this.userRepo.getUserByUserName(userName);

      const userFound = !!user;
      if (!userFound) {
        return left(new LoginUseCaseErrors.UserNameDoesntExistError())
      }
      
      const passwordValid = await user.password.comparePassword(password.value);

      if (!passwordValid) {
        return left(new LoginUseCaseErrors.UserNameDoesntExistError())
      }

      const accessToken: JWTToken = this.authService.signJWT({
        username: user.username.value,
        userId: user.userId.id.toString(),
      });

      user.setAccessToken(accessToken);

      return right(Result.ok<LoginDTOResponse>({ accessToken }));
    } catch (err) {
      return left(new AppError.UnexpectedError(err.toString()))
    }
  }
}