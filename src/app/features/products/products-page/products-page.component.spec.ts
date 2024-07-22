import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Location } from '@angular/common';
import { ProductsPageComponent } from './products-page.component';
import { provideRouter, Router, RouterModule } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { zipAll } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ICategory } from '../../../core/interfaces/category.interface';
import { IProduct } from '../../../core/interfaces/product.interface';
import { GenericService } from '../../../core/services/generic.service';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { FilterComponent } from '../../../shared/components/filter/filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { DefaultImagePipe } from '../../../shared/pipes/default-image.pipe';
import { SafeUrlPipe } from '../../../shared/pipes/safe-url.pipe';
import { RouterTestingHarness } from '@angular/router/testing';
import { defaultEquals } from '@angular/core/primitives/signals';

describe('ProductsPageComponent', () => {
  let component: ProductsPageComponent;
  let fixture: ComponentFixture<ProductsPageComponent>;
  let http: HttpTestingController;
  let cService: GenericService<ICategory, ICategory>;
  let gService: GenericService<ICategory, ICategory>;
  let router:Router;
  let harness:RouterTestingHarness;
  let location:Location;

  const DUMMY_USERS = [
    {
      id: 1,
      email: 'john@mail.com',
      password: 'changeme',
      name: 'Jhon',
      role: 'customer',
      avatar: 'https://i.imgur.com/LDOO4Qs.jpg',
      creationAt: '2024-07-22T04:19:34.000Z',
      updatedAt: '2024-07-22T04:19:34.000Z',
    },
    {
      id: 2,
      email: 'maria@mail.com',
      password: '12345',
      name: 'Maria',
      role: 'customer',
      avatar: 'https://i.imgur.com/DTfowdu.jpg',
      creationAt: '2024-07-22T04:19:34.000Z',
      updatedAt: '2024-07-22T04:19:34.000Z',
    },
  ];

  const DUMMY_CATEGORIES = [
    {
      id: 1,
      name: 'Clothes',
      image: 'https://i.imgur.com/QkIa5tT.jpeg',
      creationAt: '2024-07-22T04:19:34.000Z',
      updatedAt: '2024-07-22T04:19:34.000Z',
    },
    {
      id: 2,
      name: 'Electronics',
      image: 'https://i.imgur.com/ZANVnHE.jpeg',
      creationAt: '2024-07-22T04:19:34.000Z',
      updatedAt: '2024-07-22T04:19:34.000Z',
    },
  ];

  const DUMMY_PRODUCTS = [
    {
      "id": 146,
      "title": "Change title",
      "price": 146,
      "description": "A description",
      "images": [
        "[\"https://placeimg.com/640/480/any\"]"
      ],
      "creationAt": "2024-07-22T15:27:59.000Z",
      "updatedAt": "2024-07-22T15:30:25.000Z",
      "category": {
        "id": 1,
        "name": "CG4",
        "image": "https://i.imgur.com/QkIa5tT.jpeg",
        "creationAt": "2024-07-22T04:19:34.000Z",
        "updatedAt": "2024-07-22T15:40:36.000Z"
      }
    },
    {
      "id": 148,
      "title": "ozin talim",
      "price": 5015,
      "description": "rjgnjk4",
      "images": [
        "[\"https://cdn.pixabay.com/photo/2016/04/01/08/49/box-1299001_1280.png\"]"
      ],
      "creationAt": "2024-07-22T15:29:28.000Z",
      "updatedAt": "2024-07-22T15:29:28.000Z",
      "category": {
        "id": 1,
        "name": "CG4",
        "image": "https://i.imgur.com/QkIa5tT.jpeg",
        "creationAt": "2024-07-22T04:19:34.000Z",
        "updatedAt": "2024-07-22T15:40:36.000Z"
      }
    },
  ]

  beforeEach(async () => {
    

     
    
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        
      ],
      providers: [
        // {provide:Router, useValue: {url: '/users'}},
        {
          provide: 'categoriesService',
          useFactory: () =>
            new GenericService<ICategory, ICategory | ICategory>({
              resourceEndpoint: '/categories',
            }),
        },
        {
          provide: 'productsService',
          useFactory: () =>
            new GenericService<ICategory, ICategory | ICategory>({
              resourceEndpoint: '/products',
            }),
        },
        {
          provide: 'userService',
          useFactory: () =>
            new GenericService<ICategory, ICategory | ICategory>({
              resourceEndpoint: '/user',
            }),
        },
      ],
      declarations: [
        ProductsPageComponent,
        SearchBarComponent,
        SpinnerComponent,
        FilterComponent,
        ProductCardComponent,
        DefaultImagePipe,
        SafeUrlPipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsPageComponent);
    harness = await RouterTestingHarness.create();
    http = TestBed.inject(HttpTestingController);
    location = TestBed.inject(Location);
    component = fixture.componentInstance;
    router = TestBed.inject(Router)
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get users', fakeAsync(() => {
    console.log('inicia ');
    // spyOn(router, 'navigate');
    let items = fixture.elementRef.nativeElement;
    let dbE = fixture.debugElement;

    // const mockHttp2 = http.expectOne(environment.apiUrl+'/categories?limit=100');
    // mockHttp2.flush(DUMMY_CATEGORIES)
    // let list = component.categoriesList;
    component.getUsers();

    fixture.detectChanges();
    const mockHttp = http.expectOne(environment.apiUrl + '/user?limit=100');
    mockHttp.flush(DUMMY_USERS);
    const full = component.allList;
    fixture.detectChanges();

    //Cargamos 2 users
    expect(full.length).toEqual(2);
    const users = dbE.queryAll(By.css('div'));
    const divs = dbE.queryAll(By.css('div[class=card-container]'));
    
    ///ES 3 por fallo de nomenclatura, el container general tiene la misma clase
    expect(divs.length).toEqual(3);
    const toDetail = dbE.query(By.css('[class=btn-container]'));
    const detailbutton = dbE.nativeElement.querySelector('#actionBtn');
    spyOn(fixture.componentInstance, 'deleteUser')
    console.log(detailbutton);
    
    // detailbutton.click()
    // tick();
    // fixture.detectChanges();
    ///No puedo testear simple porque necesito tener el usario admin y el token disponible
    // expect(fixture.componentInstance.deleteUser).toHaveBeenCalled();
    // fixture.detectChanges();
    // const divs2 = dbE.queryAll(By.css('div[class=card-container]'));
    // expect(divs2.length).toEqual(2);
  }));

 it('should get products and navigate after click',()=>{
  spyOn(router, 'navigate');
  let items = fixture.elementRef.nativeElement;
    let dbE = fixture.debugElement;
  component.getProducts();
  const mockHttp = http.expectOne(environment.apiUrl + '/products?limit=100');
  mockHttp.flush(DUMMY_PRODUCTS);
  const full = component.allList;
  fixture.detectChanges();

  expect(full.length).toEqual(2)
  const detailbutton = items.querySelector('[class=btn-container]') as HTMLButtonElement;
    
  detailbutton.click()
  
  expect(router.navigate).toHaveBeenCalledWith(['/product',146]);
 })
});
