import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective {


  private element=inject(ElementRef)

  ngOnInit() {
    this.element.nativeElement.focus();
  }

}
