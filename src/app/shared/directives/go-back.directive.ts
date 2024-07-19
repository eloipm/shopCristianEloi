import { Location } from '@angular/common';
import {Directive, HostListener, inject} from '@angular/core';

@Directive({
  selector: '[goBack]'
})
export class GoBackDirective {
private location = inject(Location);


@HostListener('click')
onClick(){
 this.location.back()
}  



}
