import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { User } from '../../../core/models/user.model';
import { ICategory } from '../../../core/interfaces/category.interface';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent{
@Input()list: ICategory[] = [];
@Output()categoryValue:EventEmitter<number>= new EventEmitter<number>();


sendCategory(categoryId?:number){
  this.categoryValue.emit(categoryId);
  }
}
