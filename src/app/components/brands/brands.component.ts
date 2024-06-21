import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  brands: any;
  allProducts: any = [];
  constructor(private _ProductsService: ProductsService, private spinner: NgxSpinnerService){}

  ngOnInit(): void {
    this.spinner.show();
    this._ProductsService.getBrands().subscribe({
      next: (res)=> this.brands = res.data,
      complete: ()=> this.spinner.hide()
    })
  }
}
