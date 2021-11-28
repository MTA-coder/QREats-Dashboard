import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IProduct } from 'src/app/models/product';
import { ProductActions } from '../actions/product-actions';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productActions: ProductActions;
  product = new Subject<IProduct>();

  constructor(http: HttpClient) {
    this.productActions = new ProductActions(http);
  }

  set(product: IProduct) {
    this.product.next(product);
  }

  setinitial() {
    this.product.next({ id: 0, url: '', description: '', name: '', price: 0, type_id: 0 });
  }

  fetchProducts(query, restaurentId) {
    return this.productActions.readProduct(query, restaurentId);
  }


  createProduct(product: IProduct) {
    return this.productActions.createProduct(product);
  }

  updateProductById(productId, query) {
    return this.productActions.updateProduct(productId, query);
  }

  upload(file) {
    return this.productActions.uploadImg(file);
  }

  deleteSelectedProduct(productId) {
    return this.productActions.deleteProduct(productId);
  }

}
