import { TestBed } from '@angular/core/testing';

import { CartQuantityGuard } from './cart-quantity.guard';

describe('CartQuantityGuard', () => {
  let guard: CartQuantityGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CartQuantityGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
