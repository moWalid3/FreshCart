import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-brand-products',
  templateUrl: './brand-products.component.html',
  styleUrl: './brand-products.component.scss'
})
export class BrandProductsComponent {
  allProducts: any = [];
  searchType: string = 'brand';
  brandId: any = '';
  brandName: any = '';

  constructor(private _ProductsService: ProductsService, private _ActivatedRoute: ActivatedRoute, private spinner: NgxSpinnerService){}

  ngOnInit(): void {
    this.spinner.show();
    this._ActivatedRoute.paramMap.subscribe( params => this.brandId = params.get('id')); 

    this._ProductsService.getSpecificBrand(this.brandId).subscribe({
      next: res => this.brandName = res.data.name,
    })

    this._ProductsService.getProducts(2).subscribe({
      next: (res)=> {
        this.allProducts.push(...res.data);
        this._ProductsService.getProducts(1).subscribe({
          next: (res)=> {
            this.allProducts.push(...res.data);
            this.getFinalProducts();
          },
          complete: ()=> this.spinner.hide()
        })  
      }
    })
    
  }

  getFinalProducts() {
    this.allProducts =  this.allProducts.filter((product: any) => product?.brand?.name === this.brandName);  
  }
}
