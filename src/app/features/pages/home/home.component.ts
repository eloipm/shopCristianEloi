import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../../core/services/login.service';
import { Iuser } from '../../../core/interfaces/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  private service=inject(LoginService);

  user!:Iuser;
  //loggedInUsername: string | null = null;

  ngOnInit(){
    // this.loggedInUsername = this.loginService.getLoggedInUsername();
    // console.log(this.loggedInUsername)
    this.service.retrieveUser().subscribe(
      data=> this.user=data
    )
  }
}
