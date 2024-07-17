import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './features/pages/error-page/error-page.component';
import { NoAuthComponent } from './features/pages/no-auth/no-auth.component';
import { HomeComponent } from './features/pages/home/home.component';

const routes: Routes = [
  {path:'no-auth',component:NoAuthComponent},
  {path:'**',component:ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
