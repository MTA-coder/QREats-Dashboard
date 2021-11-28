import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeActions } from '../actions/type-actions';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  typeActions: TypeActions;

  constructor(http: HttpClient) {
    this.typeActions = new TypeActions(http);
  }

  fetchTypes() {
    return this.typeActions.getData();
  }

}
