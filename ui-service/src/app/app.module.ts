import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, ApplicationRef } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';

const keycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    KeycloakAngularModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: KeycloakService,
      useValue: keycloakService
    }
  ],
  entryComponents: [AppComponent]
})
export class AppModule implements DoBootstrap {
  async ngDoBootstrap(appRef: ApplicationRef) {
    const { keycloak } = environment;

    try {
      await keycloakService.init({
        config: keycloak,
        initOptions: {
          onLoad: 'login-required'
        }
      })
      .then(() => {
        console.log('[ngDoBootstrap] bootstrap ui-service');
      });
      appRef.bootstrap(AppComponent);
    } catch (error) {
      console.error('[ngDoBootstrap] init Keycloak failed', error);
    }
  }
}
