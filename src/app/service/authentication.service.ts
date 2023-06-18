import { LoginReq } from './../model/login-req';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  
  readonly baseUrl: string = 'http://localhost:9090/auth';

  constructor(private http: HttpClient) {}

  login(loginReq: LoginReq) {
    return this.http.post(`${this.baseUrl}/login`, loginReq);
  }

  logout() {
    return this.http.post(`${this.baseUrl}/logout`, {});
  }
}
