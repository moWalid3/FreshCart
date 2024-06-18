import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  allProducts: any[] = [];
  constructor(private _ProductsService: ProductsService){

  }

  ngOnInit(): void {
    this._ProductsService.getProducts(1).subscribe({
      next: (res)=> {
        this.allProducts = res.data;
        this.allProducts = this.allProducts.reverse().slice(0, 16);
      }
    })
  }
}
