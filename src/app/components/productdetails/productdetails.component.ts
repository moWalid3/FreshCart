import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent implements OnInit{
  productDetails:any;
  currentCoverImageSrc: string = '';
  constructor(private _ProductsService: ProductsService, private _ActivatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    let id: any;
    this._ActivatedRoute.paramMap.subscribe((params) => id = params.get("id"));

    this._ProductsService.getSpecificProduct(id).subscribe({
      next: (res) => {
        this.productDetails = res.data;
        this.currentCoverImageSrc = this.productDetails?.images[0];
      }
    })
    
  }

  getSrc(src: string) {
    this.currentCoverImageSrc = src;
  }
}
