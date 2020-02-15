import { KeycloakConfig } from 'keycloak-angular';

const keycloakConfig: KeycloakConfig = {
  url: '/auth',
  realm: 'apartment-manager',
  clientId: 'apartment-manager-client'
};

export const environment = {
  production: true,
  environment: $ENV.Environment,
  uiPort: $ENV.UiPort,
  gqlBaseUrl: '/graphql',
  keycloak: keycloakConfig,
};
