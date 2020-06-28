import { ArgsType, Field } from "type-graphql";

import { PaginationArgs } from "../pagination.args";
import { IFilterable } from "../../../models/filterable.interface";
import { ObjectIdScalar } from "../../../scalars/object-id.scalar";

@ArgsType()
export class FetchUserDataArgs extends PaginationArgs implements IFilterable {

    @Field((type) => ObjectIdScalar, { nullable: true })
    public filter?: any;

}