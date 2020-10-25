import { Mapper } from '@/core/infra/Mapper'
import { UniqueEntityID } from '@/core/domain/UniqueEntityID';

import { User } from '../domain/user';
import { UserName } from '../domain/userName';
import { UserPassword } from '../domain/userPassword';
import { UserDTO } from '../dtos/userDTO';

export class UserMap implements Mapper<User> {
    public static toDTO(user: User): UserDTO {
        return {
            userId: user.userId.id.toString(),
            name: user.name,
            username: user.username.value,
        }
    }

    public static toDomain(raw: any): User {
        const userNameOrError = UserName.create({ value: raw.username });
        const userPasswordOrError = UserPassword.create({ value: raw.password, hashed: true });

        const userOrError = User.create({
            username: userNameOrError.getValue(),
            password: userPasswordOrError.getValue(),
        }, new UniqueEntityID(raw.id));

        userOrError.isFailure ? console.log(userOrError.error) : '';

        return userOrError.isSuccess ? userOrError.getValue() : null;
    }

    public static async toPersistence(user: User): Promise<any> {
        let password: string = null;
        if (!!user.password === true) {
            if (user.password.isAlreadyHashed()) {
                password = user.password.value;
            } else {
                password = await user.password.getHashedValue();
            }
        }

        return {
            _id: user.userId.id.toString(),
            username: user.username.value,
            password: password,
            name: user.name,
            dob: user.dob,
        }
    }
}