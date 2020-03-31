import * as _ from 'lodash';
import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BaseService } from './base.service';
import { IGqlResponseEnvelope } from '../models/gql-response-envelope';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(private apollo: Apollo) {
    super()
  }

  public getUser(userId: string): Observable<IGqlResponseEnvelope<IUser>> {
    const query = gql`query User($id: String!) {
      user(id: $id) {
        id
        firstName
        lastName
        email
        nickname
        createdDate
        updatedDate
      }
    }`;

    const variables = {
      id: userId
    };

    return this.apollo.query<any>({ query, variables }).pipe(
      map((res) => this.convertGqlResponse<IUser>(res, 'user')),
      catchError((e) => this.handleGqlException<IUser>(e))
    );
  }
}
