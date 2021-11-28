import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user';
import { CRUDService } from '../services/crud.service';

export class AuthActions extends CRUDService<IUser> {
  constructor(http: HttpClient) {
    super(http, 'api');
  }

  cities(): Observable<any[]> {
    return this.readEntities(undefined, '/city/get');
  }

  login(user: IUser): Observable<any> {
    return this.createEntity(user, '/login')
  }

  register(user: IUser): Observable<any> {
    return this.createEntity(user, '/register');
  }

  logout(): Observable<any> {
    return this.readEntity(undefined, '/logout');
  }

}
