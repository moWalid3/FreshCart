import { Component, ElementRef, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  cartProducts : any[] = [];
  totalPrice: number = 0;
  numberOfProducts: number = 0;
  constructor(private _CartService: CartService) {}

  ngOnInit(): void {
    this._CartService.getCart().subscribe({
      next: (res) => {
        this.cartProducts = res.data.products;
        this.totalPrice = res.data.totalCartPrice;
        this.numberOfProducts = this.cartProducts.length;
        console.log(this.numberOfProducts);

      },
      error : err => console.log(err)
    });
  }

  clearCart(cartBox: HTMLElement) {
    this._CartService.clearCart().subscribe();
    cartBox.remove();
    this.totalPrice = 0;
    this.numberOfProducts = 0;
    console.log(this.numberOfProducts);
  }
  
  removeProduct(id: string, price: number, countEle: HTMLElement) {
    this._CartService.removeProduct(id).subscribe();
    document.getElementById(id)?.remove();
    this.totalPrice -= (price * (+countEle.innerHTML));
    this.numberOfProducts--;
    console.log(this.numberOfProducts);

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
