import { IUser } from './user.interface';

export interface IUserData {
    id?: string;
    type: string;
    name: string;
    sequence: number;
    userdata: any;
    createdDate?: string;
    createdBy?: IUser;
}