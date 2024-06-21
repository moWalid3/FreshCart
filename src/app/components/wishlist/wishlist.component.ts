import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
  wishlistProducts: any[] = [];
  numberOfProducts: number = 0;
  constructor(
    private _WishlistService: WishlistService,
    private _CartService: CartService, 
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.spinner.show();
    this._WishlistService.getWishlist().subscribe( {
      next: res=> {
        this.wishlistProducts = res.data;
        this.numberOfProducts = this.wishlistProducts.length;
      },
      complete: ()=> this.spinner.hide()
    });
    
  }

  addToCart(id: string) {
    this.toastr.success('Product added successfully to your cart.');
    this._CartService.addToCart(id).subscribe({
      next: (res)=> {
        this._CartService.numberOfCartItems.next(res.numOfCartItems);
      }
    });
  }

  removeFromWishlist(id: any, wishlistProduct : HTMLElement) {
    this.toastr.success('Product removed successfully from your wishlist.');
    this._WishlistService.deleteFromWishlist(id).subscribe({
      next: (res) => {
        this._WishlistService.numberOfWishlistItems.next(res.data.length);
      }
    })

    wishlistProduct.remove();
    this.numberOfProducts--;
  }

}
