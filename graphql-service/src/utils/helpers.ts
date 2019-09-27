import { User, UserModel } from '../entities/user';

export async function seedDatabase() {

    const defaultUser = await new UserModel({
        email: 'example@email.com',
        nickname: 'Anonymous',
        password: 'test',
    } as User).save();

    return {
        defaultUser,
    }

}