import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[addToCart]',
})
export class AddToCartDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
