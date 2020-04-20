import { KeycloakConfig } from 'keycloak-angular';

const keycloakConfig: KeycloakConfig = {
  url: '/auth',
  realm: 'home-manager-prod',
  clientId: 'home-manager-client'
};

export const environment = {
  production: true,
  environment: $ENV.Environment,
  uiPort: $ENV.UiPort,
  gqlBaseUrl: '/graphql',
  keycloak: keycloakConfig,
};
