import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  basket = new BehaviorSubject<Product[]>(this.getBasket());


  saveBasket(item: Product) {
    let oldB: Product[] = this.getBasket();
    if (oldB.find(product => product.id == item.id)) {
      oldB.find(product => product.id == item.id)!.quantity++;
    } else {
      oldB.push(item);
    }
    sessionStorage.setItem('basket', JSON.stringify(oldB))
    this.basket.next(this.getBasket());
  }

  readBakset() {
    return this.basket.asObservable();
  }

  deleteBasketItem(id: number) {
    let oldB: Product[] = this.getBasket();
    const newCart = oldB.filter(items => items.id != id);
    sessionStorage.setItem('basket', JSON.stringify(newCart))
    this.basket.next(this.getBasket());
  }

  updateBasketItem(updatedItem: Product) {
    let oldB: Product[] = this.getBasket();
    const itemToRemove = oldB.find(item => item.id === updatedItem.id);
    if (itemToRemove) {
      itemToRemove.quantity = updatedItem.quantity;
      sessionStorage.setItem('basket', JSON.stringify(oldB));
      this.basket.next(this.getBasket());
    }
  }

  getBasket(): Product[] | [] {
    return JSON.parse(sessionStorage.getItem('basket')!) ?? []
  }

  clearBasket(){
    sessionStorage.removeItem('basket');
    this.basket.next(this.getBasket());
  }
}