import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from '../../../core/services/login.service';
import { Iuser } from '../../../core/interfaces/user.interface';
import { BasketService } from '../../../core/services/basket.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  private router=inject(Router);
  private service = inject(LoginService);
  private basketS = inject(BasketService);
  private isDarkMode = false;

  user?:Iuser;
  currentUrl?: string;
  basket:Product[] = [];

  ngOnInit(): void {
    this.service.retrieveUser().subscribe(
      data=>{
        this.user = data}
    );

    this.basketS.basket.subscribe(
      data=> this.basket = data
    )

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }

  isActive(route: string): boolean {
    return this.currentUrl === route;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }

  logout(){
    this.service.user.next(undefined);
    sessionStorage.clear();
    this.router.navigate(['user-form']);
  }

  potato(){
    console.log('click');
  }
}
