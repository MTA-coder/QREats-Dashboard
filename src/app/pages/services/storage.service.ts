import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  user: IUser

  constructor() {
    this.user = this.getLocalObject('user');
  }

  setToken(token: string) {
    sessionStorage.setItem('token', JSON.stringify(token));
  }

  setItem(name, value) {
    sessionStorage.setItem(name, JSON.stringify(value));
  }

  getToken() {
    return JSON.parse(sessionStorage.getItem('token'));
  }

  removeToken() {
    sessionStorage.removeItem('token');
  }

  setLocalObject(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getLocalObject(key: string) {
    return JSON.parse(sessionStorage.getItem(key));
  }

  removeLocalObject(item: string) {
    sessionStorage.removeItem(item);
  }

  removeAll() {
    sessionStorage.clear();
  }

}
