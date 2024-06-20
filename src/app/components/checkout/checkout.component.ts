import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  constructor(private _CartService: CartService){}

  checkoutForm: FormGroup = new FormGroup({
    details: new  FormControl(null, [Validators.required]),
    phone: new  FormControl(null, [Validators.required]),
    city: new  FormControl(null, [Validators.required]),

  });

  handleCheckout(checkoutForm: FormGroup) {
    let shippingAddress = checkoutForm.value;

    this._CartService.payOnline("66735249ed0dc0016c0522dc", shippingAddress).subscribe({
      next : (res) => {
        window.location.href = res.session.url;
      }
    })
  }
}
