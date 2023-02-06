import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.auth.token) {
      return next.handle(req)
    }

    const headers = new HttpHeaders({
      Authorization: this.auth.token
    })

    const newReq = req.clone({
      headers
    })

    return next.handle(newReq)
  }
}
