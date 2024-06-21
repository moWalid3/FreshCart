import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{
  constructor(private _CartService: CartService, private _Router: Router, private spinner: NgxSpinnerService){}

  ngOnInit(): void {
    this._CartService.getCart().subscribe({
      next: (response) => {
        this._CartService.cartId = response.data._id;
      },
      error: (err) => {},
    });
  }

  checkoutForm: FormGroup = new FormGroup({
    details: new  FormControl(null, [Validators.required]),
    phone: new  FormControl(null, [Validators.required]),
    city: new  FormControl(null, [Validators.required]),

  });

  payOnline(checkoutForm: FormGroup) {
    let shippingAddress = checkoutForm.value;

    this._CartService.payOnline(shippingAddress).subscribe({
      next : (res) => {
        window.location.href = res.session.url;
      }
    })
  }

  cashOrder(checkoutForm: FormGroup) {
    this.spinner.show();
    let shippingAddress = checkoutForm.value;
    this._CartService.cashOrder(shippingAddress).subscribe({
      next : (res) => {
        this._CartService.numberOfCartItems.next(0);
        this._Router.navigate(['/orders']);
      },
      complete: ()=> this.spinner.hide()
    })
  }

}
