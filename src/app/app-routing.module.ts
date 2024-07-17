import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSignupComponent } from './features/pages/login-signup/login-signup.component';
import { HomeComponent } from './features/pages/home/home.component';
import { ErrorPageComponent } from './features/pages/error-page/error-page.component';
import { NoAuthComponent } from './features/pages/no-auth/no-auth.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'user-form'},
  {path: 'user-form', component: LoginSignupComponent },
  {path: 'home', component: HomeComponent },
  {path:'no-auth',component:NoAuthComponent},
  {path:'**',component:ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
