import { CanActivate, Router } from '@angular/router';
import {Injectable } from '@angular/core';
import { AuthenticationService } from '../AdminService/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLogin() || this.authService.isAdmin()) {
      // Redirect to home or any other page if already logged in
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
