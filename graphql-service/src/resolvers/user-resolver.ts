import { ObjectId } from 'mongodb';
import { Resolver, Query, Arg } from 'type-graphql';

import { ObjectIdScalar } from '../utils/object-id.scalar';

import { User, UserModel } from '../entities/user';

@Resolver(of => User)
export class UserResolver {

    @Query(returns => User, { nullable: true })
    user(@Arg('userId', type => ObjectIdScalar) userId: ObjectId) {
        return UserModel.findById(userId);
    }

    @Query(returns => [User])
    async getUsers(): Promise<User[]> {
        return await UserModel.find({});
    }

}