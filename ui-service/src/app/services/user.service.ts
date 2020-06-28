import * as _ from 'lodash';
import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { GqlBaseService } from './gql-base.service';
import { IGqlResponseEnvelope } from '../models/gql-response-envelope.interface';
import { IUser } from '../models/user.interface';
import { IUserData } from '../models/user-data.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GqlBaseService {

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

  public queryUserData(filterSpec: any): Observable<IGqlResponseEnvelope<IUserData[]>> {
    const query = gql`query UserDataList($filter: ObjectIdScalar!) {
      userDataList(filter: $filter) {
        items {
          id
          type
          name
          userdata
        }
        totalCount
      }
    }`;

    const variables = {
      filter: filterSpec
    };

    return this.apollo.query<any>({ query, variables }).pipe(
      map((res) => this.convertGqlResponse<IUserData[]>(res, 'userDataList')),
      catchError((e) => this.handleGqlException<IUserData[]>(e))
    )
  }
}
