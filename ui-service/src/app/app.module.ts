import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, ApplicationRef } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { ConfigService } from 'src/app/services/config.service';

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
  constructor(private configService: ConfigService) {}

  async ngDoBootstrap(appRef: ApplicationRef) {
    try {
      const config = (this.configService.useKeycloak()) ? this.configService.getKeycloakInit() : null;
      
      await keycloakService.init(config)
      .then(() => {
        console.log('[ngDoBootstrap] bootstrap ui-service');
      });
      appRef.bootstrap(AppComponent);
    } catch (error) {
      console.error('[ngDoBootstrap] init Keycloak failed', error);
    }
  }
}
