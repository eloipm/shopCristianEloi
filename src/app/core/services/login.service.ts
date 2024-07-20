import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { Iuser } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  user = new BehaviorSubject<Iuser|undefined>(this.getUserData());

  postUser(user: Iuser) {
    return this.http.post<Iuser>(`${this.apiUrl}/users`, user).pipe(
      catchError((error) => {
        console.error('Error while posting user: ', error);
        return throwError(() => new Error(error));
      })
    );
  }

  postAuth(email: string, password: string) {
    return this.http
      .post<Data>(`${this.apiUrl}/auth/login`, {
        email: email,
        password: password,
      })
      .pipe(
        map((response) => {
          const token = response['access_token'];
          const refresh_token = response['refresh_token'];
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('refresh_token', refresh_token);
        }),
        catchError((error) => {
          window.alert('Error while authenticating user, please try again.')
          console.error('Error while authenticating user: ', error);
          return throwError(() => new Error(error));
        })
      );
  }

  getUser() {
    const header = new HttpHeaders();
    header.append('Authorization', sessionStorage.getItem('token')!);
    return this.http.get<Iuser>(`${this.apiUrl}/auth/profile`).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
        }
      }),
      map((data) => {
        sessionStorage.setItem('user', JSON.stringify(data));
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  getUserData(): Iuser {
    return JSON.parse(sessionStorage.getItem('user')!);
  }

  retrieveUser() {
    return this.user.asObservable();
  }
}
