import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthMedecinService } from 'src/app/landing-page/services/auth-medecin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthMedecinGuard implements CanActivateChild {

  authenticated: boolean = false;

  constructor(private medecinAuthService: AuthMedecinService, private router: Router) {
    this.authenticated = (this.medecinAuthService.getToken()) ? true: false;
    if(!this.authenticated){
      this.router.navigateByUrl('/');
    }
  }
  
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.authenticated;
  }

  getSessionInfos (): string|null{
    return sessionStorage.getItem('Token');
  }
  
}
