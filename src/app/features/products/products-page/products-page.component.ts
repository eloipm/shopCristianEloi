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
export class ProductsPageComponent implements  OnDestroy,OnInit{
 private router = inject(Router);
 private subs:Subscription[] = [];

allList: (Product | User)[] = [];
showList: (Product | User)[] = [];
categoriesList: ICategory[] = [];

currentCategory?:number;

cService:GenericService<ICategory,ICategory>;
constructor(
  @Inject('categoriesService')categoryService: GenericService<ICategory,ICategory>,
  @Inject('productsService')productsService: GenericService<IProduct,IProduct>,
  @Inject('userService')userService: GenericService<Iuser,Iuser>,
){
  this.cService = categoryService;
  this.subs.push(
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      console.log(event);
      if(event.url.includes('user')){
        this.subs.push(
        userService!.getList().subscribe( {next: (data)=>
          data.forEach((user)=>{
            this.allList.push(new User(user))
            this.showList = this.allList;
          })
        }))
      }else{
        this.subs.push(
        productsService!.getList().subscribe(
          {next: (data)=>
            data.forEach((product)=>{
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

ngOnInit(): void {
  this.subs.push(
this.cService.getList().subscribe(
  {
    next: (data)=>{this.categoriesList = data;
    }
  }
)
  )
}
  
updateCategory(categoryId:number){
this.currentCategory = categoryId;
}

  updateShowList(list: (Product | User)[]){
    console.log("update views");
    
      this.showList = list;
  }

  ngOnDestroy(): void {
    this.subs.forEach(s=>s.unsubscribe())
  }

 
 
}
