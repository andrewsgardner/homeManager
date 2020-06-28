import { UserDataEntity } from "../../../entities/user-data.entity";
import { MaxLength, IsIn, IsInt } from "class-validator";
import { Field, InputType } from "type-graphql";

import { ObjectIdScalar } from "../../../scalars/object-id.scalar";

@InputType({ description: "New user data" })
export class UserDataCreateInput implements Partial<UserDataEntity> {

    @Field({ nullable: false })
    @MaxLength(32)
    @IsIn(["set-theme"])
    public type: string;

    @Field({ nullable: false })
    @MaxLength(128)
    public name: string;

    @Field({ nullable: false })
    @IsInt()
    public sequence: number;

    @Field((type) => ObjectIdScalar, { nullable: true })
    public userdata: any;

}