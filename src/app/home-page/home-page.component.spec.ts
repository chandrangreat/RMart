import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Observable } from 'rxjs';

import { HomePageComponent } from './home-page.component';
import { ProductService } from '../core/services/product.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { By } from '@angular/platform-browser';

fdescribe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  let products = [
    {
      id: 1,
      name: 'Cricket Shoes',
      description: 'Cricket shoes with lace up closure',
      quantity: 5,
      price: 2500,
      categoryId: 'shoes',
      cartProductPrice: 0,
      cartProductQuantity: 0,
      img: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2679&q=80',
      userId: 1,
    },
    {
      id: 2,
      name: 'Formal Shirt',
      description: 'Formal shirt with lace up closure',
      quantity: 5,
      price: 500,
      categoryId: 'shirts',
      cartProductPrice: 0,
      cartProductQuantity: 0,
      img: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80',
      userId: 1,
    },
  ];

  let productServiceSpy = jasmine.createSpyObj('ProductService', [
    'getAllProducts',
    'getProductsByCategory',
  ]);
  productServiceSpy.getAllProducts.and.returnValue(of(products));
  productServiceSpy.getProductsByCategory.withArgs('shoes').and.returnValue(
    of([
      {
        id: 1,
        name: 'Cricket Shoes',
        description: 'Cricket shoes with lace up closure',
        quantity: 5,
        price: 2500,
        categoryId: 'shoes',
        cartProductPrice: 0,
        cartProductQuantity: 0,
        img: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2679&q=80',
        userId: 1,
      },
    ])
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      providers: [{ provide: ProductService, useValue: productServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ModalModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get all the products', () => {
    expect(productServiceSpy.getAllProducts).toHaveBeenCalled();
  });

  it('renders product card component', () => {
    const { debugElement } = fixture;
    const productCard = debugElement.query(By.css('app-product-card'));
    expect(productCard).toBeTruthy();
  });

  it('renders all 7 category list elements', () => {
    const { debugElement } = fixture;
    const categoryList = debugElement.queryAll(By.css('.categories > ul > li'));
    expect(categoryList.length).toBe(7);
  });

  it('should be able to get products of a specific category', () => {
    component.loadProductsOfCategory({ name: 'Shoes', id: 'shoes' });
    expect(productServiceSpy.getProductsByCategory).toHaveBeenCalledWith(
      'shoes'
    );
    component.products$.subscribe((data) => {
      console.log('My data', data);
      data.forEach((product) => {
        expect(product).toEqual(products[0]);
      });
    });
  });

  it('renders the products of a specific category', () => {
    component.loadProductsOfCategory({ name: 'Shoes', id: 'shoes' });
    fixture.detectChanges();
    const { debugElement } = fixture;

    const productCards = debugElement.queryAll(By.css('app-product-card'));

    expect(productCards.length).toBe(1);
  });
});
