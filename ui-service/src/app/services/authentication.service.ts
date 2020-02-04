import { Injectable } from '@angular/core';

declare var Keycloak: any;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private keycloakAuth: any;

  constructor() {}

  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      const config = {
        'url': '/auth',
        'realm': 'apartment-manager',
        'clientId': 'apartment-manager-client'
      };

      this.keycloakAuth = new Keycloak(config);
      this.keycloakAuth.init({ onLoad: 'login-required' })
        .success(() => {
          resolve();
        })
        .error(() => {
          reject();
        });
    });
  }

  getToken(): string {
    return this.keycloakAuth.token;
  }
}
