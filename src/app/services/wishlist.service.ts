import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  numberOfWishlistItems = new BehaviorSubject(0);
  header: any = {};
  wishlistProducts: any[] = [];
  constructor(
    private _HttpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    if (isPlatformBrowser(platformId)) {
      this.header = {
        token: localStorage.getItem('userToken'),
      };
    }

    this.getWishlist().subscribe({
      next: (res) => {
        this.numberOfWishlistItems.next(res.count);
        this.wishlistProducts = res.data;
      }
    })
  }

  addToWishlist(id: string): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/wishlist',
      {
        productId: id,
      },
      {
        headers: this.header,
      }
    );
  }

  deleteFromWishlist(id: string): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      { headers: this.header }
    );
  }

  getWishlist(): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { headers: this.header }
    );
  }
}
