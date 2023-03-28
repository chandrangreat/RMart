import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterService } from '../core/services/router.service';

import { LoginComponent } from './login.component';
import { LoginService } from './services/login.service';
import { of, Observable } from 'rxjs';
import { HeaderComponent } from '../shared/components/header/header.component';
import { CartService } from '../core/services/cart.service';
import { RouterModule } from '@angular/router';

class MockRouterService {
  public routeToHomePage() {}
}

class MockCartService {}

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);
  loginServiceSpy.login.and.returnValue(of());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: RouterService, useClass: MockRouterService },
        // { provide: CartService, useClass: MockCartService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not login if email field is empty', () => {
    const sampleCredentials = { email: '', password: 'somepassword' };

    component.loginForm.setValue(sampleCredentials);
    component.submitLogin();
    expect(loginServiceSpy.login).not.toHaveBeenCalledWith(sampleCredentials);
  });

  it('should not login if email field is having invalid values', () => {
    const sampleCredentials = { email: 'rmail', password: 'somepassword' };

    component.loginForm.setValue(sampleCredentials);
    component.submitLogin();
    expect(loginServiceSpy.login).not.toHaveBeenCalledWith(sampleCredentials);
  });

  it('should not login if password field is empty', () => {
    const sampleCredentials = { email: 'r@gmail.com', password: '' };

    component.loginForm.setValue(sampleCredentials);
    component.submitLogin();
    expect(loginServiceSpy.login).not.toHaveBeenCalledWith(sampleCredentials);
  });

  it('should allow user to be able to login', () => {
    const sampleCredentials = {
      email: 'sample@example.com',
      password: 'somepassword',
    };

    component.loginForm.setValue(sampleCredentials);
    component.submitLogin();

    expect(loginServiceSpy.login).toHaveBeenCalledWith(sampleCredentials);
  });
});
