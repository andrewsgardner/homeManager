import { IGqlError } from './gql-error';
import { IPageInfo } from './page-info';

export interface IGqlResponseEnvelope<T> {
    success: boolean;
    errors: IGqlError[];
    data?: T;
    pageInfo?: IPageInfo;
}
