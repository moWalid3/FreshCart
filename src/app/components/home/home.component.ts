import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  allProducts: any[] = [];
  constructor(private _ProductsService: ProductsService){

  }

  ngOnInit(): void {
    this._ProductsService.getProducts(1).subscribe({
      next: (res)=> {
        this.allProducts = res.data;
        this.allProducts = this.allProducts.reverse();
      }
    })
  }

}
