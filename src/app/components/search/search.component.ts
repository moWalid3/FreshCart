import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  @Input() allProducts: any[] = [];

  searchTerm : string = "";
  constructor( private _CartService: CartService){}

  ngOnInit(): void {

  }

  addToCart(id: string) {
    this._CartService.addToCart(id).subscribe({
      next: (res)=> {
        this._CartService.numberOfCartItems.next(res.numOfCartItems);
      }
    });
  }


}
