import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterService } from '../core/services/router.service';

import { LoginComponent } from './login.component';
import { LoginService } from './services/login.service';
import { of, Observable } from 'rxjs';

class MockRouterService {
  public routeToHomePage() {}
}

describe('LoginComponent', () => {
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
      ],
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
