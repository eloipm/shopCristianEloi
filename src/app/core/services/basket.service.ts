import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  basket = new BehaviorSubject<Product[]>(this.getBasket());


  saveBasket(item:Product){
    let oldB:Product[] = this.getBasket();
    oldB.push(item);
    sessionStorage.setItem('basket', JSON.stringify(oldB))
    this.basket.next(this.getBasket());
  }

  readBakset(){
    return this.basket.asObservable();
  }

  getBasket():Product[]|[]{
    return JSON.parse(sessionStorage.getItem('basket')!) ?? []
  }
  
}