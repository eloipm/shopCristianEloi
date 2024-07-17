import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/pages/home/home.component';
import { AboutComponent } from './features/pages/about/about.component';
import { LoginSignupComponent } from './features/pages/login-signup/login-signup.component';
import { BasketComponent } from './features/pages/basket/basket.component';
import { NoAuthComponent } from './features/pages/no-auth/no-auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LoginSignupComponent,
    BasketComponent,
    NoAuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
