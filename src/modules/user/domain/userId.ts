
import { UniqueEntityID } from "@/core/domain/UniqueEntityID";
import { Result } from "@/core/logic/Result";
import { Entity } from "@/core/domain/Entity";


export class UserId extends Entity<any> {

  get id (): UniqueEntityID {
    return this._id;
  }

  private constructor (id?: UniqueEntityID) {
    super(null, id)
  }

  public static create (id?: UniqueEntityID): Result<UserId> {
    return Result.ok<UserId>(new UserId(id));
  }
}