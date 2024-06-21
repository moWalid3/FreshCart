import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss',
})
export class ProductdetailsComponent implements OnInit {
  productDetails: any;
  currentCoverImageSrc: string = '';
  isOnWishlist :boolean = false;
  constructor(
    private _ProductsService: ProductsService,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService,
    private _WishlistService: WishlistService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    let id: any;
    this._ActivatedRoute.paramMap.subscribe(
      (params) => (id = params.get('id'))
    );

    this._ProductsService.getSpecificProduct(id).subscribe({
      next: (res) => {
        this.productDetails = res.data;
        this.currentCoverImageSrc = this.productDetails?.images[0];
      },
    });

    this.isItOnTheWishlist(id);
  }

  getSrc(src: string) {
    this.currentCoverImageSrc = src;
  }

  addToCart(id: string) {
    this.toastr.success('Product added successfully to your cart.');
    this._CartService.addToCart(id).subscribe({
      next: (res) =>
        this._CartService.numberOfCartItems.next(res.numOfCartItems),
    });
  }

  isItOnTheWishlist(id: any) {
    let wishlistProducts: any[] = [];
    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        wishlistProducts = res.data;
        this.isOnWishlist =  wishlistProducts?.some((product) => product._id == id);
      },
      complete: ()=> this.spinner.hide()
    });
  }


  handleWishlist(heartEle: HTMLElement, id: any) {
    if(heartEle.firstElementChild?.classList.contains("fa-regular")) {
      this.toastr.success('Product added successfully to your wishlist.');
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
