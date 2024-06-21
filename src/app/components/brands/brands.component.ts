import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  brands: any;
  allProducts: any = [];
  constructor(private _ProductsService: ProductsService){}

  ngOnInit(): void {
    this._ProductsService.getBrands().subscribe({
      next: (res)=> this.brands = res.data
    })
    
    // this._ProductsService.getProducts(2).subscribe({
    //   next: (res)=> {
    //     this._ProductsService.getProducts(1).subscribe({
    //       next: (res)=> {
    //         this.allProducts.push(...res.data);
    //       }
    //     })  
    //     this.allProducts.push(...res.data);
    //   }
    // })
  }
}
