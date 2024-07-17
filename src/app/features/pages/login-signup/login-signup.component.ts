import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { LoginService } from '../../../core/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss'
})
export class LoginSignupComponent implements OnInit {

  private service = inject(LoginService)
  private route = inject(Router)

  SignUpForm?: FormGroup;
  LogInForm?: FormGroup;

  ngOnInit() {
    const avatar = environment.avatar;

    this.SignUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      avatar: new FormControl(avatar)
    });

    this.LogInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ClickSignUp() {
    const signUpData = this.SignUpForm?.value;

    this.service.postUser(signUpData).subscribe({
      error: (err) => { console.error(err) }
    });

    console.log(signUpData);
    (this.SignUpForm as FormGroup).reset();
  }

  ClickLogIn() {
    const { email, password } = this.LogInForm?.value;
    this.service.postAuth(email, password).subscribe({
      next: () => {
        if(localStorage.getItem('token')){
          this.route.navigate(['home'])
        }
       },
      error: (err) => { console.error(err) }
    });

  }
}
