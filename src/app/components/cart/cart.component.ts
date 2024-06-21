import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  cartProducts : any[] = [];
  totalPrice: number = 0;
  numberOfProducts: number = 0;
  constructor(private _CartService: CartService, private spinner: NgxSpinnerService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.spinner.show();
    this._CartService.getCart().subscribe({
      next: (res) => {
        this.cartProducts = res.data.products;
        this.totalPrice = res.data.totalCartPrice;
        this.numberOfProducts = this.cartProducts.length;
        this.spinner.hide();
      },
      error : err => {
        console.log(err);
        this.spinner.hide();
      }
    });
  }

  clearCart(cartBox: HTMLElement) {
    this.toastr.success('Products removed successfully from your cart.');
    this._CartService.clearCart().subscribe();
    this._CartService.numberOfCartItems.next(0);
    cartBox.remove();
    this.totalPrice = 0;
    this.numberOfProducts = 0;
  }
  
  removeProduct(id: string, price: number, countEle: HTMLElement) {
    this.toastr.success('Product removed successfully from your cart.');
    this._CartService.removeProduct(id).subscribe((res)=> this._CartService.numberOfCartItems.next(res.numOfCartItems));
    document.getElementById(id)?.remove();
    this.totalPrice -= (price * (+countEle.innerHTML));
    this.numberOfProducts--;
  }

  updateProductQuantity(id: string, price: number, operation: string, countEle: HTMLElement) {
    let newCount = this.handleCount(countEle, operation, price);
    
    this._CartService.updateProductQuantity(id, newCount).subscribe();
  }


  private handleCount(countEle: HTMLElement, operation: string, price: number) {
    let newCount;

    if (operation == '+') {
      this.totalPrice += price;
      newCount = (Number(countEle?.textContent) + 1).toString();
      countEle!.innerHTML = newCount;

      if (newCount == '1') {
        countEle?.nextElementSibling?.classList.remove("minus-disabled");
      }
    } else {
      this.totalPrice -= price;
      newCount = (Number(countEle?.innerHTML) - 1).toString();
      countEle!.innerHTML = newCount;

      if (newCount == '0') {
        countEle.nextElementSibling?.classList.add("minus-disabled");
      }
    }
    return newCount;
  }

  

}
