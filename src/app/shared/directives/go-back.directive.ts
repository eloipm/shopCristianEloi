import { Location } from '@angular/common';
import { AfterContentInit, ChangeDetectorRef, Directive, HostListener, inject, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs';

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
