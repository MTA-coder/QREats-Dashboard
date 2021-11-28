import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbModule, NgbProgressbarModule, NgbTooltipModule, } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './layout/layout.component';
import { AsideComponent } from './aside/aside.component';
import { AsideMenuComponent } from './aside-menu/aside-menu.component';
import { HeaderMenuComponent } from './header/header-menu/header-menu.component';
import { PageTitleComponent } from './header/page-title/page-title.component';
import { HeaderComponent } from './header/header.component';
import { TopbarComponent } from './topbar/topbar.component';
import { ScriptsInitComponent } from './scripts-init/scripts-init.component';
import { LayoutScrollTopComponent } from './scroll-top/scroll-top.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ContentComponent } from './content/content.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { ProductFormComponent } from 'src/app/pages/product/product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angular2-qrcode';


@NgModule({
  declarations: [
    LayoutComponent,
    AsideComponent,
    AsideMenuComponent,
    HeaderComponent,
    HeaderMenuComponent,
    PageTitleComponent,
    TopbarComponent,
    ScriptsInitComponent,
    LayoutScrollTopComponent,
    ToolbarComponent,
    ContentComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    LayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    QRCodeModule
  ],
  exports: [RouterModule],
})
export class LayoutModule { }
