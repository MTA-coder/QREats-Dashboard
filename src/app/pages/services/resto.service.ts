import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { RestoActions } from "../actions/reto-actions";
import { IRestaurent } from "src/app/models/restaurent";

@Injectable({
  providedIn: 'root'
})
export class RestoService {

  restoActions: RestoActions;
  restuarentSubject = new Subject<IRestaurent>();

  constructor(http: HttpClient) {
    this.restoActions = new RestoActions(http);
  }

  createResto(resto: IRestaurent) {
    return this.restoActions.createResto(resto);
  }

}
