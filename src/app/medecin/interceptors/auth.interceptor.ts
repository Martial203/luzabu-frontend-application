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
import { MedecinService } from '../services/medecin.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private medecinService: MedecinService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const token = this.medecinService.getToken();
    
    if(token){
      const headers = new HttpHeaders()
      .append('Authorization', 'Bearer ${token}');
      const newRequest = request.clone({headers});
      return next.handle(newRequest);
    }else{
      return next.handle(request);
    }

  }
}
