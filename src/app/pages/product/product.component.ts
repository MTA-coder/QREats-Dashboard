import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  dataSource: IProduct[];
  default = "../../../assets/media/food/default.jpg";

  constructor(private _productService: ProductService) {
  }

  ngOnInit(): void {
  }

  showDetails(product) {
    this._productService.set(product);
  }

  fetchProduct(products: IProduct[]) {
    this.dataSource = products.slice();
    this.dataSource.forEach((element: IProduct) => { element.url = this.default });
  }

}
