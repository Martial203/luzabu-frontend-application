import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthMedecinService } from 'src/app/landing-page/services/auth-medecin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthMedecinGuard implements CanActivateChild {

  constructor(private medecinAuthService: AuthMedecinService) {}
  
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return (this.medecinAuthService.getSessionInfos()) ? true : false;
  }

  getSessionInfos (): string|null{
    return sessionStorage.getItem('Token');
  }
  
}
