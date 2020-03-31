import * as _ from 'lodash';
import { UserInputError } from 'apollo-server';
import { Resolver, Query, Arg, Args, Info } from 'type-graphql';
import { graphqlMongodbProjection } from 'graphql-mongodb-projection';

import { User, UserModel } from '../entities/user';

@Resolver(of => User)
export class UserResolver {

    @Query(() => User)
    public async user(
        @Arg("id", { nullable: false })
        id: string,

        @Info()
        info: any,
    ): Promise<User> {
        const item = await UserModel.findById(id).select(graphqlMongodbProjection(info));

        if (_.isNil(item)) {
            throw new UserInputError(`${id} not found`);
        }

        return item;
    }

    @Query(returns => [User])
    async getUsers(): Promise<User[]> {
        return await UserModel.find({});
    }

}