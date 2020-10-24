import { Repo } from "@/core/infra/Repo";

import { User } from "@/modules/user/domain/user";
import { UserName } from "@/modules/user/domain/userName";

export interface IUserRepo extends Repo<any> {
  getUserByUserId(userId: string): Promise<User>;
  getUserByUserName(userName: UserName | string): Promise<User>;
  save(user: User): Promise<void>;
}
