import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { LoginSignupComponent } from './login-signup.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { authGuard } from '../../../core/guards/auth.guard';
import { tokenAuthInterceptor } from '../../../core/interceptors/token-auth.interceptor';

describe('LoginSignupComponent', () => {
  let component: LoginSignupComponent;
  let fixture: ComponentFixture<LoginSignupComponent>;
  let http : HttpTestingController;
  let router:Location;

//   const token = {
//     "access_token":"token1",
//     "refresh_token":"token2"
//   }

//   const user = {
//     "id": 92,
//     "email": "manolo@gmail.com",
//     "password": "12345",
//     "name": "manolo",
//     "role": "admin",
//     "avatar": "https://cdn.iconscout.com/icon/free/png-256/free-anonymous-user-3-1133988.png?f=webp&w=256",
//     "creationAt": "2024-07-17T15:35:46.000Z",
//     "updatedAt": "2024-07-17T15:35:46.000Z"
// }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginSignupComponent],
      providers:[provideHttpClient(withInterceptors([tokenAuthInterceptor]))],
      imports:[
        // HttpClientTestingModule,
        // DynamicTestModule,
        ReactiveFormsModule,
        RouterModule.forRoot(
        [{path: 'user-form', component: LoginSignupComponent},
         {path: 'home', component: HomeComponent}]
      )]
    })
    .compileComponents();
    
    // http = TestBed.inject(HttpTestingController);
    // router = TestBed.inject(Location);
    fixture = TestBed.createComponent(LoginSignupComponent);
    // router = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log user', ()=>{
    const refEl = fixture.elementRef;
    const items = refEl.nativeElement;
    const label = items.querySelector("#login-label");
    expect(label).toBeTruthy();
  
    label.click();
    fixture.detectChanges();
    const email = items.querySelector("#liEmail");
    const password:HTMLInputElement = items.querySelector("#liPassword");
    const button = items.querySelector("#login-button");
    // let correo = fixture.debugElement.nativeElement.querySelector('#liEmail');
    fixture.detectChanges();
    
    // router.events.subscribe(
    //   data=> console.log(data)
      
    // )
    console.log(router);
    
    email.value = "manolo@gmail.com";
    // correo.value = "manolo@gmail.com";
    password.value = "12345";
    
    fixture.detectChanges();
    email.dispatchEvent(new Event('input'));
    password.dispatchEvent(new Event('input'));
    // correo.dispatchEvent(new Event('input'));
    
    button.click();
    fixture.detectChanges();
    // http.expectOne('https://api.escuelajs.co/api/v1/auth/login')
    // mockHtttp.flush(token);
    // expect(sessionStorage.getItem('token')).toEqual('token1');
    // expect(label.textContent).toEqual("Login")

    // const mockHtttp2 = http.expectOne('https://api.escuelajs.co/api/v1/auth/profile')
    // mockHtttp2.flush(user);
    // expect(JSON.parse(sessionStorage.getItem('user')!).id).toEqual(92)
    console.log(router)
  })
});
