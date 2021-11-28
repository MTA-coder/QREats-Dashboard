import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu.component';

export const routes: Routes = [
  {
    path: ':restaurentId/table/:tableId',
    component: MenuComponent
  },
  {
    path: ':restaurentId',
    component: MenuComponent
  },
  {
    path: ':restaurentId/table/:tableId/type/:typeId',
    component: MenuComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule { }
