import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import { RouterService } from '../services/router.service';

@Injectable({
  providedIn: 'root',
})
export class CartQuantityGuard implements CanActivate, CanLoad {
  constructor(private _router: Router, private _cartService: CartService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this._cartService.getCartFromLocalStorage().totalCartItems === 0) {
      return this._router.parseUrl('/home-page');
    }
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this._cartService.getCartFromLocalStorage().totalCartItems === 0) {
      return this._router.parseUrl('/home-page');
    }
    return true;
  }
}
