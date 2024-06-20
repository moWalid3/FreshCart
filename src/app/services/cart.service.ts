import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, afterNextRender } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  numberOfCartItems = new BehaviorSubject(0);
  header: any = {};

  constructor(private _HttpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: any) {

    if (isPlatformBrowser(platformId)){
      this.header = {
        token: localStorage.getItem('userToken'),
      };
    }

    this.getCart().subscribe({
      next: (res) => {
        this.numberOfCartItems.next(res.numOfCartItems);
      },
    })

  }
  

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

  payOnline(cartId: string, shippingAddress: object): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress: shippingAddress
      },
      {
        headers: this.header
      }
    )
  }
}
