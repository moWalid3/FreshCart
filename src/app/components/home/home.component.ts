import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  allProducts: any[] = [];
  constructor(private _ProductsService: ProductsService, private spinner: NgxSpinnerService){

  }

  ngOnInit(): void {
    this.spinner.show();
    this._ProductsService.getProducts(1).subscribe({
      next: (res)=> {
        this.allProducts = res.data;
        this.allProducts = this.allProducts.reverse();
      },
      complete: ()=> this.spinner.hide()
    })
  }

}
