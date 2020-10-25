import { AppError } from "@/core/logic/AppError";
import { UseCase } from "@/core/domain/UseCase";
import { Either, Result, left, right } from "@/core/logic/Result";

import { User } from "@/modules/user/domain/user";
import { UserName } from "@/modules/user/domain/userName";
import { UserPassword } from "@/modules/user/domain/userPassword";
import { IUserRepo } from "@/modules/user/repos/impl/IUserRepo";

import { CreateUserDTO } from "./CreateUserDTO";
import { CreateUserUseCaseErrors } from "./CreateUserErrors";
import { AuthService } from "../../services/authService";
import { JWTToken } from "../../domain/jwt";

type Response = Either<
  CreateUserUseCaseErrors.UsernameTakenError |
  AppError.UnexpectedError,
  Result<string>
>

export class CreateUserUseCase implements UseCase<CreateUserDTO, Promise<Response>> {
  private userRepo: IUserRepo;
  private authService: AuthService

  constructor(userRepo: IUserRepo, authService: AuthService) {
    this.userRepo = userRepo;
    this.authService = authService;
  }

  async execute(request: CreateUserDTO): Promise<Response> {
    const passwordOrError = UserPassword.create({ value: request.password });
    const usernameOrError = UserName.create({ value: request.username });

    const dtoResult = Result.combine([
      passwordOrError, usernameOrError
    ]);

    if (dtoResult.isFailure) {
      return left(Result.fail<void>(dtoResult.error)) as Response;
    }

    const password: UserPassword = passwordOrError.getValue();
    const username: UserName = usernameOrError.getValue();

    try {
      const userAlreadyExists = await this.userRepo.exists(username);

      if (userAlreadyExists) {
        return left(
          new CreateUserUseCaseErrors.UsernameTakenError(username.value)
        ) as Response;
      }

      const userOrError: Result<User> = User.create({
        password, username,
      });

      if (userOrError.isFailure) {
        return left(
          Result.fail<User>(userOrError.error.toString())
        ) as Response;
      }

      const user = userOrError.getValue();

      await this.userRepo.save(userOrError.getValue());
      const jwtToken: JWTToken = this.authService.signJWT({
        userId: user.userId.id.toString(),
        username: user.username.value
      });

      return right(Result.ok(jwtToken))

    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as Response;
    }
  }
}