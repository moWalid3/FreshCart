import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {

  constructor(private _AuthService:AuthService, private _Router:Router){

  }

  ngOnInit(): void {
    if(localStorage.getItem("userToken") !== null) {
      this._Router.navigate(["/home"]);
    }
  }

  isLoading: boolean = false;
  errorMsg: string = '';

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{5,}/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{5,}/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, {validators: this.rePasswordMatch});


  rePasswordMatch(registerForm: any) {
    let passwordControl = registerForm.get('password');
    let rePasswordControl = registerForm.get('rePassword');
    if(passwordControl.value === rePasswordControl.value) {
      return null; // matched
    } else {
      rePasswordControl.setErrors({passwordmatch: "password and repassword don't match"});
      return {passwordmatch: "password and repassword don't match"};
    }
  }

  handleRegister(registerForm: FormGroup) {
    this.isLoading = true;
    if (registerForm.valid) {
      this._AuthService.register(registerForm.value).subscribe({
        next: (res)=> {
          if(res.message === 'success') {
            this.isLoading = false;
            this._Router.navigate(["/login"]);
          }
        },
        error: (err) => {
          if(err.error.errors?.msg) {
            this.errorMsg = err.error.errors.msg;
          } else {
            this.errorMsg = err.error.message;
          }
          this.isLoading = false;
        },
      })
    }
  }
}
