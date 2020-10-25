
import { UserName } from "@/modules/user/domain/userName";
import { User } from "@/modules/user/domain/user";
import { UserMap } from "@/modules/user/mappers/userMap";

import { IUserRepo } from "./IUserRepo";

export class UserRepo implements IUserRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  async exists(userName: UserName | string): Promise<boolean> {
    const UserModel = this.models.User;
    const baseUser = await UserModel.findOne({
      username: userName instanceof UserName
        ? (<UserName>userName).value
        : userName
    });
    return !!baseUser === true;
  }

  async getUserByUserName(userName: UserName | string): Promise<User> {
    const UserModel = this.models.User;
    const baseUser = await UserModel.findOne({
      username: userName instanceof UserName
        ? (<UserName>userName).value
        : userName
    });
    if (!!baseUser === false) return null;
    return UserMap.toDomain(baseUser);
  }

  async save(user: User): Promise<boolean> {
    const UserModel = this.models.User;
    const exists = await this.exists(user.username);

    if (!exists) {
      const rawSequelizeUser = await UserMap.toPersistence(user);
      await UserModel.create(rawSequelizeUser);
    }

    return exists;
  }
}