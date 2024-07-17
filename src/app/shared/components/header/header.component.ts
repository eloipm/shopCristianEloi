import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../core/services/login.service';
import { Iuser } from '../../../core/interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  private router=inject(Router);
  private serice = inject(LoginService)
  private isDarkMode = false;

  user!:Iuser;
  ngOnInit(): void {
    this.serice.retrieveUser().subscribe(
      data=> this.user = data
    )
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

  navigateToHome() {
    this.router.navigate(['home']);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['user-form']);
  }
}
