import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

type ResponseToken = {
  token: string
}

const ANGULAR_TOKEN = 'angular-token'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly url: string = 'https://reqres.in/api/login'

  constructor(private http: HttpClient) { }

  login(payload: { email: string, password: string }): Observable<ResponseToken> {
     return this.http.post<ResponseToken>(this.url, payload)
      .pipe(
        tap((res: ResponseToken) => {
           this.token = res.token
        })
      )
  }

  set token(str: string) {
     localStorage.setItem(ANGULAR_TOKEN, str)
  }

  get token(): string {
    return localStorage.getItem(ANGULAR_TOKEN) as string
  }
}
