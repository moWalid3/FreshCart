import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { 

  }

  getProducts(pageNumber: number = 1): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageNumber}`);
  }

  getSpecificProduct(id: string): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  } 

  getCategories(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  } 
}
