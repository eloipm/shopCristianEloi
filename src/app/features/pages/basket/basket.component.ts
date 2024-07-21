import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { BasketService } from '../../../core/services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss' 
})
export class BasketComponent implements OnInit {
  basketItems!: Product[] ;

  private basketService=inject(BasketService)

  ngOnInit(): void {
    this.basketService.readBakset().subscribe({
      next: (items) => this.basketItems = items
    });
  }
}
