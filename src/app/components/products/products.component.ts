import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  allProducts: any = [];
  constructor(private _ProductsService: ProductsService, private spinner: NgxSpinnerService){

  }

  ngOnInit(): void {
    this.spinner.show();
    this._ProductsService.getProducts(2).subscribe({
      next: (res)=> {
        this._ProductsService.getProducts(1).subscribe({
          next: (res)=> {
            this.allProducts.push(...res.data);
          }
        })  
        this.allProducts.push(...res.data);
      },
      complete: ()=> this.spinner.hide()
    })
    
  }
}
