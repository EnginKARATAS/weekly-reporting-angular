import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    
    if (this.cookieService.get('isLoggedIn').includes("true") || this.cookieService.get('gmisLoggedIn').includes("true")) {
      
      return true;
    } else {
      this.router.navigate(['login']).then(b =>{
        window.location.reload();
      });
      
      return false;
    }
  }
}
