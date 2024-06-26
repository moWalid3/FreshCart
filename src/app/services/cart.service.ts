import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root',
})
export class CartService {

  numberOfCartItems = new BehaviorSubject(0);
  header: any = {};
  cartId: any = '';
  constructor(
    private _HttpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any,
    private spinner: NgxSpinnerService
    ) {

    if (isPlatformBrowser(platformId)){
      this.header = {
        token: localStorage.getItem('userToken'),
      };
    }

    this.spinner.show();
    this.getCart().subscribe({
      next: (res) => {
        this.numberOfCartItems.next(res.numOfCartItems);
        this.cartId = res.data._id;
        this.spinner.hide();
      },
      error: (err)=> this.spinner.hide()
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

  payOnline(shippingAddress: object): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${this.cartId}?url=http://localhost:4200`,
      {
        shippingAddress: shippingAddress
      },
      {
        headers: this.header
      }
    )
  }

  cashOrder(shippingAddress: object): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${this.cartId}`,
      {
        shippingAddress: shippingAddress
      },
      {
        headers: this.header
      }
    )
  }
}
