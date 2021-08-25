import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetPasswordGuard implements CanActivate {

  constructor(private activatedRoute: ActivatedRoute){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return true;
      // this.activatedRoute.params.subscribe(params =>{
      //   if (params["token"]==254) {
      //     return true;
      //   }
      //   else return false;
         
      // })
  }
  
}
