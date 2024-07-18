import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GoBackDirective } from './directives/go-back.directive';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FilterComponent } from './components/filter/filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DefaultImagePipe } from './pipes/default-image.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';



@NgModule({
  declarations: [
    SpinnerComponent,
    HeaderComponent,
    FooterComponent,
    GoBackDirective,
    ProductCardComponent,
    UserCardComponent,
    SearchBarComponent,
    FilterComponent,
    DefaultImagePipe,
    SafeUrlPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    GoBackDirective,
    ProductCardComponent,
    UserCardComponent,
    SearchBarComponent,
    FilterComponent
  ]
})
export class SharedModule { }
