import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GoBackDirective } from './directives/go-back.directive';



@NgModule({
  declarations: [
    SpinnerComponent,
    HeaderComponent,
    FooterComponent,
    GoBackDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    GoBackDirective
  ]
})
export class SharedModule { }