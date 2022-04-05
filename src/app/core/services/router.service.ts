import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private _router: Router) {}

  public routeToLoginPage(): UrlTree {
    return this._router.parseUrl('/login');
  }

  public routeToHomePage() {
    this._router.navigate(['/home-page']);
  }

  public routeToCart() {
    this._router.navigate(['/cart']);
  }
}
