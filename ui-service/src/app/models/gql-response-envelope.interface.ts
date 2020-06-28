import { IGqlError } from './gql-error.interface';
import { IPagination } from './pagination.interface';

export interface IGqlResponseEnvelope<T> {
    success: boolean;
    errors: IGqlError[];
    data?: T;
    pagination?: IPagination;
}
