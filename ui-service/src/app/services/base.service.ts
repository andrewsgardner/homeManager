import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IGqlResponseEnvelope } from '../models/gql-response-envelope';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }

  protected convertGqlResponse<T>(res: any, dataPath: string, countPath?: string): IGqlResponseEnvelope<T> {
    if (res.error) {
      console.error('GraphQL Err Response', res.error);
      return {
        success: false,
        errors: res.error.errors.map((e) => ({
          errorMessage: e.message,
          code: _.get(e, 'extensions.code'),
        }))
      };
    } else {
      const retVal: IGqlResponseEnvelope<T> = {
        success: true,
        errors: [],
        data: _.get(res, 'data.' + dataPath) as T,
      };

      if (_.isString(countPath)) {
        retVal.pageInfo = {
          skippedRecords: 0,
          totalCount: _.get(res, `data.${countPath}.totalCount`)
        };
      }
      return retVal;
    }
  }

  protected handleGqlException<T>(e: any): Observable<IGqlResponseEnvelope<T>> {
    console.error(`[GQL RESPONSE ERROR]\n${JSON.stringify(e)}`);

    return of({
      success: false,
      errors: [{
        code: e.status,
        errorMessage: 'A system error has occured - please try again.',
        innerError: e.message,
      }]
    });
  }
}
