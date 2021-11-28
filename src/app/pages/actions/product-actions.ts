import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/models/product';
import { CRUDService } from '../services/crud.service';
export class ProductActions extends CRUDService<IProduct> {

  constructor(http: HttpClient) {
    super(http, 'api/product');
  }

  readProduct(query, restoId: string): Observable<IProduct[]> {
    return this.readEntities(query, '/get/' + restoId);
  }

  createProduct(Product: IProduct): Observable<IProduct> {
    return this.createEntity(Product, '/create');
  }

  updateProduct(Id: number, form: any): Observable<any> {
    return this.updateQueryEntity(form, '/update/' + Id);
  }

  deleteProduct(Id: number): Observable<any> {
    return this.deleteEntity(Id, '/delete');
  }

  uploadImg(file) {
    return this.createEntity(file, '/file/upload');
  }

}
