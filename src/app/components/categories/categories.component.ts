import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  categories: any;
  constructor(private _ProductsService: ProductsService, private spinner: NgxSpinnerService){}

  ngOnInit(): void {
    this.spinner.show();
    this._ProductsService.getCategories().subscribe({
      next: (res)=> this.categories = res.data,
      complete: ()=> this.spinner.hide()
    })
  }
}
