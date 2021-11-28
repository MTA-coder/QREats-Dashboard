import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IType } from 'src/app/models/type';
import { CRUDService } from '../services/crud.service';

export class TypeActions extends CRUDService<IType> {

  constructor(http: HttpClient) {
    super(http, 'api/type');
  }

  getData(): Observable<IType[]> {
    return this.readEntities(undefined, '/get');
  }

}
