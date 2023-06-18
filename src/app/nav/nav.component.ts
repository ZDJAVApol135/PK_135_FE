import { Component, OnDestroy } from '@angular/core';
import { NavigationService } from '../service/navigation.service';
import { LocalStorageService } from '../service/local-storage.service';
import { AuthenticationService } from '../service/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnDestroy {
  
  $sub1: Subscription | undefined;
  
  constructor(
    private navigationService: NavigationService,
    private localStorageService: LocalStorageService,
    private authenticationService: AuthenticationService
  ) {}


  ngOnDestroy(): void {
    this.$sub1?.unsubscribe();
  }


  onLogout() {
    this.$sub1 = this.authenticationService.logout().subscribe({
      error: (err) => console.log(err),
      complete: () => {
        this.localStorageService.clearCreds();
        this.navigationService.navigateToLoginPage()
      }
    });
  }
}
