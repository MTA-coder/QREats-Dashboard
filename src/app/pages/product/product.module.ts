import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { ProductTypeComponent } from './product-type/product-type.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SafeHtmlPipe } from '../pipe/safe-html.pipe';

@NgModule({
  declarations: [
    ProductComponent,
    ProductTypeComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    InlineSVGModule,
    ProductRoutingModule,
  ],
})
export class ProductModule { }
