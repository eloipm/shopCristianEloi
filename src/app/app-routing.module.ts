import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSignupComponent } from './features/pages/login-signup/login-signup.component';
import { HomeComponent } from './features/pages/home/home.component';
import { ErrorPageComponent } from './features/pages/error-page/error-page.component';
import { NoAuthComponent } from './features/pages/no-auth/no-auth.component';
import { AboutComponent } from './features/pages/about/about.component';
import { adminGuard } from './core/guards/admin.guard';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'user-form'},
  {path: 'products', loadChildren:() => import('./features/products/products.module').then(m=>m.ProductsModule), canActivate:[authGuard]},
  
  {path: 'home', component: HomeComponent, canActivate:[authGuard]},
  {path: 'about', component: AboutComponent, canActivate:[authGuard,adminGuard] },
  {path: 'user-form', component: LoginSignupComponent },
  {path:'no-auth',component:NoAuthComponent},
  {path:'**',component:ErrorPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }