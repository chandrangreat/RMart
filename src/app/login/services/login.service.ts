import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
  constructor(private _http: HttpClient) {}

  public login(credentials: {
    email: string;
    password: string;
  }): Observable<{ accessToken: string }> {
    return this._http.post<{ accessToken: string }>(
      'http://localhost:3000/login',
      credentials
    );
  }
}
