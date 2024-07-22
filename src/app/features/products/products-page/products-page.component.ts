import {
  Component,
  inject,
  Inject,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { GenericService } from '../../../core/services/generic.service';
import { Iuser } from '../../../core/interfaces/user.interface';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IProduct } from '../../../core/interfaces/product.interface';
import { Subscription } from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { User } from '../../../core/models/user.model';
import { ICategory } from '../../../core/interfaces/category.interface';
import { LoginService } from '../../../core/services/login.service';
import { BasketService } from '../../../core/services/basket.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
})
export class ProductsPageComponent implements OnDestroy, OnInit {
  private router = inject(Router);
  // private auth = inject(LoginService);
  private subs: Subscription[] = [];
  private bService = inject(BasketService);

  allList: (Product | User)[] = [];
  showList: (Product | User)[] = [];
  categoriesList: ICategory[] = [];

  currentCategory?: number;
  loading: boolean = false;
  searchValue: string = '';
  showCategories: boolean = true;

  cService: GenericService<ICategory, ICategory>;
  pService: GenericService<IProduct, IProduct>;
  uService: GenericService<User, User>;
  constructor(
    private auth:LoginService,
    @Inject('categoriesService')
    categoryService: GenericService<ICategory, ICategory>,
    @Inject('productsService')
    productsService: GenericService<IProduct, IProduct>,
    @Inject('userService') userService: GenericService<User, User>
  ) {
    this.cService = categoryService;
    this.pService = productsService;
    this.uService = userService;
    this.subs.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if (event.url.includes('user')) {
            this.showCategories = false;
            this.getUsers();
          } else {
            this.getCategories();
            this.showCategories = true;

            this.getProducts();
          }
        }
      })
    );
  }

  buttonFunct(item?: User | Product) {
    if (this.auth.getUserData().role === 'admin') {
      if (item?.getType() === 'user') {
        this.deleteUser(item!.getId());
      } 
    }
  }

  addToCart(item:Product){
    this.bService.saveBasket(item);
  }

  deleteUser(id: number) {
    console.log("eliminar user");
    
    if(id===this.auth.getUserData().id){
      return;
    }
    this.uService.remove(id).subscribe(
      {
        next:(data)=>{
          console.log('updatear la lista');
          
        this.getUsers()
        },
        error:(err)=>{console.log(err);
        }
      }
    );;
  }

  deleteItem(id: number) {
    this.pService.remove(id);
  }

  ngOnInit(): void {
    this.loading = true;
    // this.subs.push(
    //   this.getCategories()
    // );
  }

  getCategories(){
    this.categoriesList = [];
    this.subs.push(   
      this.cService.getList().subscribe({
        next: (data) => {
          this.categoriesList = data;
        
          
          this.loading = false;
        },
        complete: () => {},
      })
    );
  }

  getProducts() {
    this.allList = [];
    this.subs.push(
      this.pService.getList().subscribe({
        next: (data) =>
          data.forEach((product) => {
            this.allList.push(new Product(product));
            this.showList = this.allList;
            this.loading = false;
          }),
      })
    );
    this.filterList();
  }

  getUsers() {
    console.log("vamos a los users");
    
    this.allList = [];
    this.subs.push(
      this.uService!.getList().subscribe({
        next: (data) =>
         { data.forEach((user) => {
              if(!this.allList.find((listItem)=>listItem.id===user.id)){
                this.allList.push(new User(user));
              }
            })
            this.showList = this.allList;
            this.loading = false;
          }})
        ,
      
    );
    this.filterList();
  }

  updateCategory(categoryId: number) {
    this.currentCategory = categoryId;
    this.filterList();
  }

  updateShowList(searchValue: string) {
    this.searchValue = searchValue;
    this.filterList();
  }

  filterList() {
    console.log("hasta aqui llega",this.currentCategory);
    
    this.showList = this.allList.filter(
      (data) =>
        data.getSearchValue().includes(this.searchValue) 
      &&
        data.isCategory(this.currentCategory??0)
    );
  }

  updateList(list: (User|Product)[]){
    list.forEach((item)=>{
      if(this.allList.find((listItem)=>listItem.getId()===item.getId())){
        this.allList.push(item);
      }
    })
  }
  

  navigateToProductDetails(item: Product | User) {
    if (item instanceof Product) {
      this.router.navigate(['/product', item.id]);
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
