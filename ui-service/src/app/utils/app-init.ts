import { KeycloakService } from 'keycloak-angular';
import { ConfigService } from 'src/app/services/config.service';
import { environment } from 'src/environments/environment';
/*
export function initializer(keycloak: KeycloakService, configService: ConfigService): () => Promise<any> {
    if (configService.useKeycloak()) {
        const config = configService.getKeycloakInit();
        return (): Promise<any> => keycloak.init(config);
    }

    return (): Promise<any> => null;
}
*/
/*
export function initializer(keycloak: KeycloakService): () => Promise<any> {
    return (): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                await keycloak.init({
                    config: environment.keycloak
                });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    };
}
*/

export function initializer(keycloak: KeycloakService): () => Promise<any> {
    return (): Promise<any> => keycloak.init({
        config: environment.keycloak
    });
}