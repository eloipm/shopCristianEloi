import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../../core/services/login.service';
import { Iuser } from '../../../core/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  private service=inject(LoginService);
  private route=inject(Router);

  user?:Iuser;
  //loggedInUsername: string | null = null;


  ngOnInit(){
    this.service.retrieveUser().subscribe(
      data=> this.user=data
    )
  }
  navigateToProducts(){
    this.route.navigate(['products'])
  }
}
