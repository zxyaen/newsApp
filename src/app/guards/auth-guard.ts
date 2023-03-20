import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isLoggedIn = localStorage.getItem('session')
    if (isLoggedIn) {
      let session = JSON.parse(isLoggedIn)
      this.loginService.checkSession(session.status).then(res => {
        if (res.status == 400) {
          // 若session无效，则禁止跳转到用户页，并重定向到主页
          this.router.navigate(['/home']);
          return false;
        } if (res.status == 200) {
          // this.router.navigate(['/user/homepage']);
          return true
        } else {
          this.router.navigate(['/home']);
          return false
        }
      })
    }
    return true;
  }
}
