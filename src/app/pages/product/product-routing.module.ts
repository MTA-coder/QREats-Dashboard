import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { ProductComponent } from './product.component';

export const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    component: ProductComponent
  },
  {
    path: ':typeId',
    // canActivate: [AuthGuard],
    component: ProductComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule { }
