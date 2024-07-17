import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/pages/home/home.component';
import { AboutComponent } from './features/pages/about/about.component';
import { LoginSignupComponent } from './features/pages/login-signup/login-signup.component';
import { BasketComponent } from './features/pages/basket/basket.component';
import { NoAuthComponent } from './features/pages/no-auth/no-auth.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { tokenAuthInterceptor } from './core/interceptors/token-auth.interceptor';

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
    AppRoutingModule,
    SharedModule,
    CoreModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        allowedDomains: ['home']
      }
    })
  ],
  providers: [
    provideHttpClient(withInterceptors([tokenAuthInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
