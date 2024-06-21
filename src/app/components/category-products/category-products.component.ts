import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.scss'
})
export class CategoryProductsComponent implements OnInit {

  allProducts: any = [];
  searchType: string = 'category';
  categoryId: any = '';
  categoryName: any = '';

  constructor(private _ProductsService: ProductsService, private _ActivatedRoute: ActivatedRoute, private spinner: NgxSpinnerService){}

  ngOnInit(): void {
    this.spinner.show();
    this._ActivatedRoute.paramMap.subscribe( params => this.categoryId = params.get('id')); 

    this._ProductsService.getSpecificCategory(this.categoryId).subscribe({
      next: res => this.categoryName = res.data.name,
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
      },
    })
    
  }

  getFinalProducts() {
    this.allProducts =  this.allProducts.filter((product: any) => product?.category?.name === this.categoryName);  
  }
}
