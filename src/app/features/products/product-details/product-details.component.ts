import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../core/interfaces/product.interface';
import { GenericService } from '../../../core/services/generic.service';
import { Product } from '../../../core/models/product.model';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @Input() item?: Product;

  private route = inject(ActivatedRoute);
  private pService: GenericService<IProduct, IProduct>;

  product?: IProduct;

  constructor(
    @Inject('productsService') productsService: GenericService<IProduct, IProduct>
  ) {
    this.pService = productsService;
  }

  ngOnInit(): void {
    const productTitle = this.route.snapshot.paramMap.get('id');
    if (productTitle) {
      this.pService.getById(Number(productTitle)).subscribe({
        next: (data) => this.product = data
      });
    }
  }
}
