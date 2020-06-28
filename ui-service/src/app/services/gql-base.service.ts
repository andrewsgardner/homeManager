import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IGqlResponseEnvelope } from '../models/gql-response-envelope.interface';

@Injectable({
  providedIn: 'root'
})
export class GqlBaseService {

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
        retVal.pagination = {
          skippedRecords: 0,
          totalCount: _.get(res, `data.${countPath}.totalCount`)
        };
      }
      return retVal;
    }
  }

  protected handleGqlException<T>(e: any): Observable<IGqlResponseEnvelope<T>> {
    console.error(`[GQL RESPONSE ERROR]\n${JSON.stringify(e)}`);

    const graphQLErrors: any = _.get(e, 'graphQLErrors');
    const extensions: any = _.get(graphQLErrors[_.findIndex(graphQLErrors, 'extensions')], 'extensions');

    return of({
      success: false,
      errors: [{
        code: _.get(extensions, 'code'),
        errorMessage: 'A system error has occured - please try again.',
        innerError: e.message,
        stacktrace: _.get(extensions, 'exception.stacktrace'),
      }]
    });
  }
}
