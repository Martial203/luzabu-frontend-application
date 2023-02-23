import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const sessionInfos = this.authService.getSessionInfos();
    
    if(sessionInfos){
      const headers = new HttpHeaders()
      .append('Authorization', 'Bearer ${sessionInfos.token}');
      const newRequest = request.clone({headers});
      return next.handle(newRequest);
    }else{
      return next.handle(request);
    }

  }
}
