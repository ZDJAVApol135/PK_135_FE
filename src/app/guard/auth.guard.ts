import { LocalStorageService } from './../service/local-storage.service';
import { NavigationService } from './../service/navigation.service';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const navigationService = inject(NavigationService);
  const localStorageService = inject(LocalStorageService);
  const username = localStorageService.getUsername();

  if (!username) {
    navigationService.navigateToLoginPage();
    return false;
  }
  
  return true;
};
