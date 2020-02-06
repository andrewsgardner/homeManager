import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { KeycloakOptions } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    constructor() {
    }

    public getGqlBaseUrl(): string {
        return environment.gqlBaseUrl;
    }

    public useKeycloak(): boolean {
        return !_.isNil(environment.keycloak);
    }

    public getKeycloakInit(): KeycloakOptions {
        return {
            config: environment.keycloak,
            initOptions: {
              onLoad: 'login-required'
            }
        }
    }
}