import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OktaAuthGuard } from './gurads/okta-auth.guard';

const routes: Routes = [
  { path: 'login/callback', component: OktaCallbackComponent }, 
  { path: 'home', component: HomeComponent, canActivate: [OktaAuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
