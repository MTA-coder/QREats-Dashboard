import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import fileUrl from 'file-url';
import { IProduct } from 'src/app/models/product';
import { IType } from 'src/app/models/type';
import { ProductService } from '../../services/product.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit {

  types: IType[];
  @Output() products = new EventEmitter<IProduct[]>();

  selectedId: number;

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
        this.selectedId = +params['typeId'];
        query = { 'type_id': this.selectedId };
      }
      var restaurentId = this.storage.getLocalObject('resto').id;
      if (this.selectedId == 0)
        this.fetchProductsByTypeId(restaurentId);

    });
  }

  onclickFetch(id) {
    this.selectedId = id;
    const query = { 'type_id': id };
    var restoId = this.storage.getLocalObject('resto').id;
    this._productService.fetchProducts(query, restoId).subscribe((response: any) => {

      var responseProduct: IProduct[] = response.data.slice();

      responseProduct.forEach((element: IProduct) => {
        // element['url'] = fileUrl(element['url']);
        element.type.icon = this.sourceIco + element.type.icon;
      });

      this.products.next(responseProduct);

    });
  }

  fetchProductsByTypeId(resaurentid) {
    this._productService.fetchProducts(undefined, resaurentid).subscribe((response: any) => {

      if (this.selectedId == 0) this.types = [];
      var responseProduct: IProduct[] = response.data.slice();
      console.log(responseProduct);

      responseProduct.forEach((element: IProduct) => {
        // element['url'] = fileUrl(element['url']);
        element.type.icon = this.sourceIco + element.type.icon;
        if (this.selectedId == 0)
          this.types.push(element.type);
      });
      this.products.next(responseProduct);

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
