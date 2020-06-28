import { ObjectType } from 'type-graphql';

import { PaginationResponse } from '../pagination-response';
import { UserDataEntity } from '../../../entities/user-data.entity';

@ObjectType()
export class PaginationUserDataResponse extends PaginationResponse(UserDataEntity) {}