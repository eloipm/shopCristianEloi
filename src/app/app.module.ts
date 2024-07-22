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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenAuthInterceptor } from './core/interceptors/token-auth.interceptor';
import { GenericService } from './core/services/generic.service';
import { Iuser } from './core/interfaces/user.interface';
import { IProduct } from './core/interfaces/product.interface';
import { ICategory } from './core/interfaces/category.interface';

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
    FormsModule
  ],
  providers: [
    provideHttpClient(withInterceptors([tokenAuthInterceptor])),
    {provide:'categoriesService',useFactory: ()=>new GenericService<ICategory,ICategory | ICategory>({resourceEndpoint:'/categories'}),deps:[HttpClient]},
    {provide:'productsService',useFactory: ()=>new GenericService<IProduct,IProduct | IProduct>({resourceEndpoint:'/products'}),deps:[HttpClient]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
