import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly passwordParam = "password";
  private readonly usernameParam = "username";
  
  constructor() {}

  setUsername(username: string) {
    localStorage.setItem(this.usernameParam, username);    
  }

  setPassword(password: string) {
    localStorage.setItem(this.passwordParam, password);    
  }

  getUsername() {
    return localStorage.getItem(this.usernameParam);    
  }

  getPassword() {
    return localStorage.getItem(this.passwordParam);    
  }

  clearCreds(){
    localStorage.removeItem(this.usernameParam);    
    localStorage.removeItem(this.passwordParam);    
  }
}
