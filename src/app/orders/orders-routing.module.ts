import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { EditAddOrderComponent } from './Pages/edit-add-order/edit-add-order.component';

const routes: Routes = [
  {
    path: '', component: OrdersComponent,
    children: [
      { path: 'add', component: EditAddOrderComponent }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
