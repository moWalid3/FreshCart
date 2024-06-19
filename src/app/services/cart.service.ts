import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  header: any = {
    token: localStorage.getItem('userToken'),
  };

  constructor(private _HttpClient: HttpClient) {}

  addToCart(id: string): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/cart',
      {
        productId: id,
      },
      {
        headers: this.header,
      }
    );
  }

  getCart(): Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: this.header,
    });
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: this.header,
    });
  }

  removeProduct(id: string): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { headers: this.header }
    );
  }

  updateProductQuantity(id: string, count: string) : Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count: count },
      { headers: this.header }
    );
  }
}
