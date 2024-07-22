import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[cardHover]'
})
export class CardHoverDirective {
  private refEl:ElementRef = inject(ElementRef)
  private currentStyle = this.refEl.nativeElement.style;
  @HostListener('mouseover')
  onMouseEnter(){
      this.refEl.nativeElement.style.boxShadow = '0px 0px 2px 2px #D2CFCE';
      this.refEl.nativeElement.style.transition = 'all 200ms ease-out';
      
  }

  @HostListener('mouseleave')
  onMouseLeave(){
      this.refEl.nativeElement.style = this.currentStyle;
  }

}
