import { User, UserModel } from '../entities/user';
import { DateTime } from 'luxon';

export async function seedDatabase() {

    const now = DateTime.utc().toJSDate();
    const uuid4 = require('uuid4');

    const defaultUser = await new UserModel({
        _id: uuid4(),
        firstName: 'System',
        lastName: 'User',
        nickname: 'Anonymous',
        email: 'example@email.com',
        lastLoginDate: now,
        createdDate: now,
        updatedDate: now,
        systemUser: true
    } as User).save();

    return {
        defaultUser,
    }

}