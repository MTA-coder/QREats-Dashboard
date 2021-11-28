import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { MenuRoutingModule } from './menu.routing.module';
import { MenuComponent } from './menu.component';
import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    MenuRoutingModule,
    QRCodeModule
  ],
})
export class MenuModule { }
