import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';
import { RouterService } from '../core/services/router.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private _loginService: LoginService,
    private _routerService: RouterService
  ) {}

  ngOnInit(): void {}

  public submitLogin(): void {
    if (this.loginForm.valid) {
      this._loginService.login(this.loginForm.value).subscribe({
        next: (data: { accessToken: string }) => {
          localStorage.setItem('accessToken', data.accessToken);
          this._routerService.routeToHomePage();
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error;
        },
      });
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
