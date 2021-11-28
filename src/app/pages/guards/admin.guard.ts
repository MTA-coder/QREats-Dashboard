import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { IUser } from 'src/app/models/user';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    var currentAdmin = false;

    this.userService.getUser().subscribe((user: IUser) => {
      currentAdmin = user.is_Admin;
    });

    if (currentAdmin) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.userService.logout();
    return false;
  }
}
