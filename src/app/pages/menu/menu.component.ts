import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IProduct } from 'src/app/models/product';
import { IType } from 'src/app/models/type';
import { ProductService } from '../services/product.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  types: IType[];
  products: IProduct[];

  selectedId: number;
  restoId: number;

  sourceIco = './assets/media/food/menu/';


  constructor(private _activatedRoute: ActivatedRoute, private _productService: ProductService, private storage: StorageService) { }

  ngOnInit(): void {
    this.subscripeParam();
  }


  subscripeParam() {
    this._activatedRoute.params.subscribe((params: Params) => {
      var query = undefined;
      if (params['typeId'] == undefined) this.selectedId = 0;
      else {
        this.selectedId = params['typeId'];
        query = { 'type_id': this.selectedId };
      }
      this.restoId = +atob(params['restaurentId']);
      if (this.selectedId == 0)
        this.fetchProductsByRestoId();

    });
  }

  onclickFetch(id) {
    this.selectedId = id;
    const query = { 'type_id': id };
    this._productService.fetchProducts(query, this.restoId).subscribe((response: any) => {

      var responseProduct: IProduct[] = response.data.slice();

      responseProduct.forEach((element: IProduct) => {
        element.type.icon = this.sourceIco + element.type.icon;
      });

      this.products = responseProduct.slice();

    });
  }

  fetchProductsByRestoId() {
    this._productService.fetchProducts(undefined, this.restoId).subscribe((response: any) => {

      if (this.selectedId == 0) this.types = [];

      var responseProduct: IProduct[] = response.data.slice();

      responseProduct.forEach((element: IProduct) => {
        element.type.icon = this.sourceIco + element.type.icon;
        if (this.selectedId == 0)
          this.types.push(element.type);
      });
      this.products = responseProduct.slice();

      // remove Duplicated
      if (this.selectedId == 0) {
        this.types = Array.from(new Set(this.types.map(a => a.id)))
          .map(id => {
            return this.types.find(a => a.id === id)
          });
      }

    });
  }


}
