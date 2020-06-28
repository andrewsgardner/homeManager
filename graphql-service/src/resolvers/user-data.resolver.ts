import * as _ from 'lodash';
import { UserInputError } from 'apollo-server';
import { Resolver, Query, Info, Arg, Mutation, Ctx, Args } from 'type-graphql';
import { graphqlMongodbProjection, infoToProjection } from 'graphql-mongodb-projection';
import { DateTime } from 'luxon';

import { UserDataEntity, UserDataModel } from '../entities/user-data.entity';
import { IContext } from '../models/context.interface';
import { UserDataCreateInput } from './types/user-data/user-data-create.input';
import { PaginationUserDataResponse } from './types/user-data/pagination-user-data-response';
import { FetchUserDataArgs } from './types/user-data/fetch-user-data.args';
import { CreateQuery } from '../utils/create-query';

@Resolver(of => UserDataEntity)
export class UserDataResolver {

    private uuid4 = require('uuid4');

    @Query(() => UserDataEntity)
    public async userData(
        @Ctx()
        ctx: IContext,
        
        @Arg("id", { nullable: false })
        id: string,

        @Info()
        info: any,
    ): Promise<UserDataEntity> {
        const item = await UserDataModel.findById(id).select(graphqlMongodbProjection(info));

        if (_.isNil(item)) {
            throw new UserInputError(`${id} not found`);
        }

        return item;
    }

    @Query(() => PaginationUserDataResponse)
    public async userDataList(
        @Ctx()
        ctx: IContext,

        @Args()
        args: FetchUserDataArgs,

        @Info()
        info: any,
    ): Promise<PaginationUserDataResponse> {
        const res = new PaginationUserDataResponse();
        const query = CreateQuery.filterArg(args) || {};

        if (!_.isString(query.createdById)) {
            query.createdById = ctx.user._id;
        }

        res.items = await UserDataModel.find(query)
            .limit(args.limit)
            .skip(args.offset)
            .select(infoToProjection(info));
        
        res.totalCount = await UserDataModel.countDocuments(query);

        return res;
    }

    @Mutation(() => UserDataEntity)
    public async createUserData(
        @Ctx()
        ctx: IContext,

        @Arg("data")
        data: UserDataCreateInput,
    ): Promise<UserDataEntity> {
        const now = DateTime.utc().toJSDate();
        const item = new UserDataModel({
            ...data,
            _id: this.uuid4(),
            createdDate: now,
            updatedDate: now,
            version: 1,
            createdById: ctx.user._id
        });

        const inserted = await item.save();

        return inserted;
    }

}