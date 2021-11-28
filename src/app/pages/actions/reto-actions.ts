import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRestaurent } from 'src/app/models/restaurent';
import { CRUDService } from '../services/crud.service';

export class RestoActions extends CRUDService<IRestaurent> {
  constructor(http: HttpClient) {
    super(http, 'api/restaurant');
  }

  createResto(resto: IRestaurent): Observable<any> {
    return this.createEntity(resto, '/create');
  }

}
