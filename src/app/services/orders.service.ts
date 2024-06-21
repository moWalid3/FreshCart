import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _HttpClient: HttpClient) { }

  getOrders(cartOwner: any): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwner}`)
  }
}
