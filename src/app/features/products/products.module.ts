import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductsRoutingModule } from './products-routing.module';
import { GenericService } from '../../core/services/generic.service';
import { Iuser } from '../../core/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../core/interfaces/product.interface';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { FilterComponent } from '../../shared/components/filter/filter.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { DefaultImagePipe } from '../../shared/pipes/default-image.pipe';


@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductDetailsComponent,

  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ],
  providers: [
    { provide: 'userService', useFactory: () => new GenericService<Iuser, Iuser | Iuser>({ resourceEndpoint: '/users' }), deps: [HttpClient] },
    { provide: 'productsService', useFactory: () => new GenericService<IProduct, IProduct | IProduct>({ resourceEndpoint: '/products' }), deps: [HttpClient] }
  ],

  exports: [
    ProductsPageComponent
  ]
})
export class ProductsModule {

}
