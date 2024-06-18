import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  categories: any;
  constructor(private _ProductsService: ProductsService){}

  ngOnInit(): void {
    this._ProductsService.getCategories().subscribe((res)=> this.categories = res.data)
  }
}
