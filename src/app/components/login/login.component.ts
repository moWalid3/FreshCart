import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  isLoading: boolean = false;
  errorMsg: string = '';

  constructor(private _Router: Router, private _AuthService: AuthService) {}

  ngOnInit(): void {
    if(localStorage.getItem("userToken") !== null) {
      this._Router.navigate(["/home"]);
    }
  }

  loginForm: FormGroup = new FormGroup ({
    email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{5,}/)])
  })

  handleLogin(loginForm: FormGroup) {
    this.isLoading = true;
    if(loginForm.valid) {
      this._AuthService.login(loginForm.value).subscribe({
        next: (res) => {
          if(res.message === 'success') {
            localStorage.setItem("userToken", res.token);
            this._AuthService.decodeUserData();
            this.isLoading = false;
            this._Router.navigate(["/home"])
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMsg = err.error.message;
        },
      })
    }
  }
}
