
import { Result } from "@/core/logic/Result";
import { Guard } from "@/core/logic/Guard";
import { AggregateRoot } from "@/core/domain/AggregateRoot";
import { UniqueEntityID } from "@/core/domain/UniqueEntityID";

import { UserId } from "./userId";
import { JWTToken } from "./jwt";
import { UserName } from "./userName";
import { UserPassword } from "./userPassword";

interface UserProps {
  username: UserName;
  password?: UserPassword;
  name?: string;
  accessToken?: JWTToken;
  dob?: string | Date;
}

export class User extends AggregateRoot<UserProps> {

  get userId (): UserId {
    return UserId.create(this._id)
      .getValue();
  }

  get username (): UserName {
    return this.props.username;
  }

  get name (): string {
    return this.props.name;
  }

  get password (): UserPassword {
    return this.props.password;
  }

  get dob (): string | Date {
    return this.props.dob;
  }

  get accessToken (): string {
    return this.props.accessToken;
  }

  public setAccessToken (token: JWTToken): void {
    this.props.accessToken = token;
  }


  private constructor (props: UserProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public static create (userProps: UserProps, id?: UniqueEntityID): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: userProps.username, argumentName: 'username' },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message)
    }

    const user = new User(userProps, id);

    return Result.ok<User>(user);
  }
}