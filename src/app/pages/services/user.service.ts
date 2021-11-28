import { HttpClient } from "@angular/common/http";
import { StorageService } from "./storage.service";
import { Observable, Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { AuthActions } from "../actions/auth-actions";
import { IUser } from "src/app/models/user";
import { RestoActions } from "../actions/reto-actions";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authActions: AuthActions;
  currentUser = new Subject<IUser>();

  constructor(http: HttpClient, private _storageService: StorageService, private _route: Router) {
    this.authActions = new AuthActions(http);
  }

  getAllCities() {
    return this.authActions.cities();
  }

  registeration(user: any) {
    return this.authActions.register(user);
  }

  loginUser(user: IUser) {
    return this.authActions.login(user);
  }

  logoutRequest() {
    return this.authActions.logout();
  }

  setLocalStorageUser(user: IUser) {
    this._storageService.setLocalObject('user', user);
    this.currentUser.next(user);
  }

  setToken(token: string) {
    this._storageService.setToken(token);
  }

  getUser(): Observable<any> {
    return this.currentUser.asObservable();
  }

  logout() {
    this._storageService.removeAll();
    this.currentUser.next(null);
    this._route.navigate(['/auth/login']);
  }

}
