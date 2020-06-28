import { Field, ObjectType } from 'type-graphql';
import { index, getModelForClass, prop } from '@typegoose/typegoose';

import { ObjectIdScalar } from '../scalars/object-id.scalar';

@index({ type: 1, name: 1, createdBy: 1, sequence: 1 }, { unique: true })
@ObjectType()
export class UserDataEntity {

    @prop()
    @Field({ name: "id" })
    public _id: string;

    @prop({ maxlength: 32 })
    @Field({ nullable: false })
    public type: string;

    @prop({ maxlength: 128 })
    @Field({ nullable: false })
    public name: string;

    @prop()
    @Field({ nullable: false })
    public createdById: string;

    @prop()
    @Field({ nullable: false })
    public sequence: number;

    @prop()
    @Field((type) => ObjectIdScalar, { nullable: false })
    public userdata: any;

    @prop()
    @Field({ nullable: false })
    public createdDate: Date;

    @prop()
    @Field({ nullable: false })
    public updatedDate: Date;

}

export const UserDataModel = getModelForClass(UserDataEntity, {
    schemaOptions: {
        collection: "userdata",
        versionKey: "version"
    }
});