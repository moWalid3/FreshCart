import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';
  userData = new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient, private _Router:Router) { 

    // now you can use localStorage in constructor
    if (this.isLocalStorageAvailable) {
      // code here
      if(localStorage.getItem("userToken") !== null) {
        this.decodeUserData();
      }
    }
  }

  decodeUserData() {
    let token = JSON.stringify(localStorage.getItem("userToken"));
    let decodedToken:any = jwtDecode(token);
    this.userData.next(decodedToken);
  }

  logOut() {
    localStorage.removeItem("userToken");
    this.userData.next(null);
    this._Router.navigate(["/login"]);
  }
  
  register(userData:object): Observable<any> {
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signup", userData);
  }

  login(userData: object): Observable<any> {
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signin", userData);
  }
}
