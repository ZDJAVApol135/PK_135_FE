import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  
  constructor(private router: Router,) {}

  navigateToDoctorsPage(): void {    
    this.router.navigateByUrl('/doctors');
  }

  navigateToLoginPage(): void {
    this.router.navigateByUrl('/login');
  }
}

