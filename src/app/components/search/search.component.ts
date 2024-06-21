import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  @Input() allProducts: any[] = [];
  @Input() searchType: string = 'products';
  @Input() searchTerm : string = "";
  wishlistProducts: any[] = [];
  constructor( private _CartService: CartService, private _WishlistService: WishlistService, private toastr: ToastrService){}

  ngOnInit(): void {

    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlistProducts = res.data;
      }
    })

  }

  addToCart(id: string) {
    this.toastr.success('Product added successfully to your cart.');
    this._CartService.addToCart(id).subscribe({
      next: (res)=> {
        this._CartService.numberOfCartItems.next(res.numOfCartItems);
      }
    });
  }

  isItOnTheWishlist(id:any) {
    return this.wishlistProducts.some(product => id == product._id);
  }

  handleWishlist(heartEle: HTMLElement, id: any) {
    if(heartEle.firstElementChild?.classList.contains("fa-regular")) {
      this.toastr.success('Product added successfully to your Wishlist.');
      heartEle.firstElementChild?.classList.replace("fa-regular", "fa-solid");
      this._WishlistService.addToWishlist(id).subscribe({
        next: (res) => {
          this._WishlistService.numberOfWishlistItems.next(res.data.length);
        }
      })

    } else {
      this.toastr.success('Product removed successfully from your wishlist.');
      heartEle.firstElementChild?.classList.replace("fa-solid", "fa-regular");
      this._WishlistService.deleteFromWishlist(id).subscribe({
        next: (res) => {
          this._WishlistService.numberOfWishlistItems.next(res.data.length);
        }
      })

    }
  }

}
