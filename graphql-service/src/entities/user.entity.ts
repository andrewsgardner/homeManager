import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UserEntity {

    @prop()
    @Field({ name: "id" })
    public _id: string;

    @prop({ maxLength: 128 })
    @Field()
    public firstName: string;

    @prop({ maxLength: 128 })
    @Field()
    public lastName: string;

    @prop({ maxLength: 128 })
    @Field({ nullable: true })
    public nickname?: string;

    @prop({ maxLength: 128, required: true })
    @Field()
    public email: string;

    @prop()
    @Field()
    public lastLoginDate: Date;

    @prop()
    @Field()
    public createdDate: Date;

    @prop()
    @Field()
    public updatedDate: Date;

    @prop()
    @Field({ nullable: false })
    public systemUser: boolean;

}

export const UserModel = getModelForClass(UserEntity, {
    schemaOptions: {
        collection: "users",
        versionKey: "version"
    }
});