import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Iuser } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  postUser(user:Iuser){
    return this.http.post<Iuser>(`${this.apiUrl}/users`,user).pipe(
      catchError(error=>{
        console.error('Error while posting user: ',error)
        return throwError(() => new Error(error));
      }
      )
    )
  }

  postAuth(email:string, password:string){
    return this.http.post<Data>(`${this.apiUrl}/auth/login`,{email:email,password:password}).pipe(
      map(response=>{
        const token=response['access_token'];
        const refresh_token=response['refresh_token'];
        localStorage.setItem('token', token);
        localStorage.setItem('refresh_token', refresh_token);
        console.log('TOKENSAUTH:'+token)
        //return response
      }),
      catchError(error=>{
        console.error('Error while authenticating user: ',error)
        return throwError(() => new Error(error));
      }
      )
    )
  }
}
