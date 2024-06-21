import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { CartService } from '../../services/cart.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  constructor(private _OrdersService: OrdersService, private _CartService: CartService, private spinner: NgxSpinnerService){}

  cartOwner: any = '';
  allOrders: any[] = []; 
  ngOnInit(): void {

    this.getCartOwner();
    
  }

  getCartOwner() {
    this.spinner.show();
    this._CartService.getCart().subscribe({
      next: (res) => {
        this.cartOwner =  res.data.cartOwner;
        this.getOrders(this.cartOwner);
      },
      error: (err) => {
        const inputString = err.error.message;
        const regex = /user:\s(\w+)/;
        const match = inputString.match(regex);
        const userId = match![1];
        this.cartOwner = userId;
        this.getOrders(this.cartOwner);
      },
    })
  }

  getOrders(cartOwner: any) {
    this._OrdersService.getOrders(cartOwner).subscribe({
      next: res => {
        this.allOrders = res;
      },
      complete: ()=> this.spinner.hide()
    })
  }
}
