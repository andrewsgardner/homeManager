import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

import { AuthService } from '../services/auth.service';
import { ConfigService } from '../services/config.service';
import { IUserAccess } from '../models/user-access.interface';
 
@Injectable({
  providedIn: 'root'
})
export class CanAuthenticationGuard extends KeycloakAuthGuard {
  constructor(protected router: Router,
              protected keycloakAngular: KeycloakService,
              protected authService: AuthService,
              protected configService: ConfigService) {
    super(router, keycloakAngular);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.configService.useKeycloak()) {
      return super.canActivate(route, state) as Promise<boolean>;
    } else {
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    }
  }
 
  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {

      if (!this.configService.useKeycloak()) {
        resolve(true);
      }

      if (!this.authenticated) {
        console.info('Logging into Keycloak...');
        this.authService.lastLoginFlag = false;
        this.keycloakAngular.login();
        return;
      }

      this.authService.updateLastLogin().pipe(take(1)).subscribe();

      this.authService.getUserAccess().pipe(take(1)).subscribe((access: IUserAccess) => {

        if (_.isArray(route.data.requiredGroups) && _.some(route.data.requiredGroups)) {
          if (!route.data.requiredGroups.every((group) => access.groups.indexOf(group) > -1)) {
            resolve(false);
            return;
          }

          resolve(true);
        }

      });
    });
  }
}