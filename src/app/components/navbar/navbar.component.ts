import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLogin = false;

  constructor(private _AuthService:AuthService ){

    this._AuthService.userData.subscribe({
      next: ()=> {
        if(this._AuthService.userData.getValue() !== null) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      }
    })
  
  }

  handleLogOut() {
    this._AuthService.logOut();
  }
}
