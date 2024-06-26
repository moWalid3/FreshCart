import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLogin = false;
  numberOfCartItems: number = 0;
  numberOfWishlistItems: number = 0;
  constructor(private _AuthService:AuthService , private _CartService : CartService, private _WishlistService: WishlistService){
    
  }
  
  ngOnInit(): void {

    this._AuthService.userData.subscribe({
      next: ()=> {
        if(this._AuthService.userData.getValue() !== null) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      }
    })
    
    this._CartService.numberOfCartItems.subscribe((value)=> this.numberOfCartItems = value);
    this._WishlistService.numberOfWishlistItems.subscribe((value)=> this.numberOfWishlistItems = value);
    
  }

  handleLogOut() {
    this._AuthService.logOut();
  }
}
