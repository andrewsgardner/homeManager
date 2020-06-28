import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { filter, switchMap, map, tap } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { ConfigService } from './config.service';
import { IUserProfile } from '../models/user-profile.interface';
import { IUserAccess } from '../models/user-access.interface';
import { IUser } from '../models/user.interface';
import { ApolloQueryResult } from 'apollo-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public lastLoginFlag: boolean = false;

  constructor(private configService: ConfigService,
              private keycloakService: KeycloakService,
              private apollo: Apollo) { }

  public isLoggedIn(): Observable<boolean> {
    return from(this.keycloakService.isLoggedIn());
  }

  public userProfile(forceReload?: boolean): Observable<IUserProfile> {
    if (this.configService.useKeycloak()) {
      return from(this.keycloakService.isLoggedIn()).pipe(
        filter((f: boolean) => f === true),
        switchMap(() => from(this.keycloakService.loadUserProfile(forceReload)).pipe(
          map((kcProfile: Keycloak.KeycloakProfile) => ({
            ...kcProfile,
            systemUser: false
          }))
        )),
      );
    } else {
      return of({
        id: '0123456789',
        username: 'systemuser',
        firstName: 'John',
        lastName: 'Smith',
        enabled: true,
        emailVerified: true,
        totp: true,
        createdTimestamp: 0,
        systemUser: true
      });
    }
  }

  public logout() {
    if (this.configService.useKeycloak()) {
      this.keycloakService.logout();
    }
  }

  public updateLastLogin(): Observable<IUser> {
    if (this.lastLoginFlag) {
      return of(null);
    }

    const mutation = gql`
      mutation {
        login {
          id
          lastLoginDate
        }
      }
    `;

    return this.apollo.mutate<IUser>({
      mutation
    }).pipe(
      tap((data: ApolloQueryResult<IUser>) => {
        console.log('[Apollo login] ', data);
        this.lastLoginFlag = true;
      }),
      map((data: ApolloQueryResult<IUser>) => {
        return data.data;
      })
    )
  }

  public getUserAccess(): Observable<IUserAccess>{
    const jwDecode = require('jwt-decode');
    
    return from(this.keycloakService.getToken()).pipe(
      map((rawToken: string) => {
        let tokenContent: any;

        try {
          tokenContent = jwDecode(rawToken);
        } catch {
          return {
            groups: []
          };
        }

        const groups: string[] = (_.isArray(tokenContent.groups)) ? tokenContent.groups.map((g: string) => g.substr(1)) : [];

        return { groups };
      })
    )
  }
}
