import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[productInfo]',
})
export class ProductInfoDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
