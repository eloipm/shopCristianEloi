import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  basket = new BehaviorSubject<IProduct[]>(this.getBasket());


  saveBasket(){
    localStorage.setItem('basket', JSON.stringify(this.basket))
  }

  getBasket():IProduct[]|[]{
    return JSON.parse(localStorage.getItem('basket')!) ?? []
  }
  
  
}
