import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { BasketService } from '../../../core/services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit {
  basketItems!: Product[];
  totalPrice: number = 0;

  private basketService = inject(BasketService);

  ngOnInit(): void {
    this.basketService.readBakset().subscribe({
      next: (items) => {
        this.basketItems = items;
        this.calculateTotal();
      }
    });
  }

  private calculateTotal(): void {
    this.totalPrice = this.basketItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  deleteItem(id: number) {
    this.basketService.deleteBasketItem(id);
  }

  updateQuantity(item: Product) {
    this.basketService.updateBasketItem(item);
    this.calculateTotal();
  }

  removeAllItems(){
    this.basketService.clearBasket();
  }
}