import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class OrdersApiService {

  getOrderById(id: number): Observable<Order> {
    const order: Order = { // for editing
      id: id,
      orderDate: new Date(1636550100000),
      comment: 'Haaliya',
      comment2: '',
      shippingAddress: {
        city: 'Tel-Aviv',
        country: 'Israel'
      },
      orderItems: [{
        id: 1,
        amount: 12,
        productId: 2
      },
      {
        id: 2,
        amount: 5,
        productId: 1
      }],
      hobbies: ['Reading']
    };

    return of(order).pipe(delay(2500));
  }



  constructor() { }
}
