import { Directive, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appGoHome]'
})
export class GoHomeDirective {

  private route = inject(Router)

  @HostListener('click')
  
  onClick() {
    this.route.navigate(['home'])
  }
}
