import { Component, inject, Inject, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { GenericService } from '../../../core/services/generic.service';
import { Iuser } from '../../../core/interfaces/user.interface';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IProduct } from '../../../core/interfaces/product.interface';
import { Subscription } from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { User } from '../../../core/models/user.model';
import { ICategory } from '../../../core/interfaces/category.interface';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent implements OnDestroy, OnInit {
  private router = inject(Router);
  private subs: Subscription[] = [];

  allList: (Product | User)[] = [];
  showList: (Product | User)[] = [];
  categoriesList: ICategory[] = [];

  currentCategory?: number;
  loading: boolean = false;
  searchValue:string="";

  cService: GenericService<ICategory, ICategory>;
  pService:GenericService<IProduct, IProduct>;
  constructor(
    @Inject('categoriesService') categoryService: GenericService<ICategory, ICategory>,
    @Inject('productsService') productsService: GenericService<IProduct, IProduct>,
    @Inject('userService') userService: GenericService<Iuser, Iuser>,
  ) {
    this.cService = categoryService;
    this.pService = productsService;
    this.subs.push(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          console.log(event);
          if (event.url.includes('user')) {
            this.subs.push(
              userService!.getList().subscribe({
                next: (data) =>
                  data.forEach((user) => {
                    this.allList.push(new User(user))
                    this.showList = this.allList;
                  })
              }))
          } else {
            this.subs.push(
              productsService!.getList().subscribe(
                {
                  next: (data) =>
                    data.forEach((product) => {
                      this.allList.push(new Product(product))
                      this.showList = this.allList;
                    })
                }
              )
            )
          }
        }
      }));
  }

  // addItem(){
  //   this.pService.add({
  //       "title": "Producto 1",
  //       "price": 10,
  //       "description": "Descripcion producto 1 VU2024",
  //       "categoryId": 3,
  //       "images": [
  //         "https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png"
  //       ]
      
  //   })
  // }

  ngOnInit(): void {
    this.loading = true;
    this.subs.push(
      this.cService.getList().subscribe(
        {
          next: (data) => {
            this.categoriesList = data;
            this.loading = false;
          },
          complete: ()=>{}
        }
      )
    )
  }

  updateCategory(categoryId: number) {
    this.currentCategory = categoryId;
    this.filterList();

  }

  updateShowList(searchValue:string) {
    this.searchValue = searchValue;
    this.filterList();
  }
  
  filterList(){
    this.showList = this.allList.filter(data=>data.getSearchValue().includes(this.searchValue) && data.isCategory(this.currentCategory!));
    
  }

  

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }



}
