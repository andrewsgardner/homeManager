import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanAuthenticationGuard } from './guards/keycloak-auth.guard';

import { AppComponent } from './app.component'; // TODO: remove when real routing is established


const routes: Routes = [
  { path: '', component: AppComponent, canActivate: [CanAuthenticationGuard], data: { requiredGroups: ['hm-user'] } }, // TODO: remove when real routing is established
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {  
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
