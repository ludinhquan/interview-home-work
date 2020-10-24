
import { Mapper } from '@/core/infra/Mapper'
import { UniqueEntityID } from '@/core/domain/UniqueEntityID';

import { User } from '../domain/user';
import { UserName } from '../domain/userName';
import { UserPassword } from '../domain/userPassword';

interface UserDTO {
    username: string,
    password: string,
}

export class UserMap implements Mapper<User> {
    public static toDTO(user: User): UserDTO {
        return {
            username: user.username.value,
            password: user.password.value,
        }
    }

    public static toDomain(raw: any): User {
        const userNameOrError = UserName.create({ name: raw.username });
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
        }
    }
}