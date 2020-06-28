import * as _ from 'lodash';
import { UserInputError } from 'apollo-server';
import { Resolver, Query, Arg, Info, Ctx, Mutation } from 'type-graphql';
import { graphqlMongodbProjection } from 'graphql-mongodb-projection';
import { DateTime } from 'luxon';

import { UserEntity, UserModel } from '../entities/user.entity';
import { IContext } from '../models/context.interface';

@Resolver(of => UserEntity)
export class UserResolver {

    @Query(() => UserEntity)
    public async user(
        @Ctx()
        ctx: IContext,
        
        @Arg("id", { nullable: false })
        id: string,

        @Info()
        info: any,
    ): Promise<UserEntity> {
        const item = await UserModel.findById(id).select(graphqlMongodbProjection(info));

        if (_.isNil(item)) {
            throw new UserInputError(`${id} not found`);
        }

        return item;
    }

    @Query(returns => [UserEntity])
    async getUsers(): Promise<UserEntity[]> {
        return await UserModel.find({});
    }

    @Mutation(() => UserEntity)
    public async login(
        @Ctx()
        ctx: IContext,

    ): Promise<UserEntity> {
        const updateDoc = {
            lastLoginDate: DateTime.utc().toJSDate(),
            firstName: _.isString(ctx.user.firstName) ? ctx.user.firstName : '',
            lastName: _.isString(ctx.user.lastName) ? ctx.user.lastName : '',
            email: _.isString(ctx.user.email) ? ctx.user.email : ''
        };

        const updated = await UserModel.findOneAndUpdate({
            _id: ctx.user._id
        },
        updateDoc, { new: false });

        return updated;
    }

}