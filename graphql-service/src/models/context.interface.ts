import { UserEntity } from "../entities/user.entity";

export interface IContext {
    user: UserEntity;
}