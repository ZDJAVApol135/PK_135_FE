import { NavigationService } from './../service/navigation.service';
import { AuthenticationService } from './../service/authentication.service';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginReq } from '../model/login-req';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  $sub1: Subscription | undefined;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private navigationService: NavigationService,
    private localStorageService: LocalStorageService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnDestroy(): void {
    this.$sub1?.unsubscribe();
  }

  onSubmit() {
    const loginReq = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value,
    } as LoginReq;

    this.$sub1 = this.authenticationService.login(loginReq).subscribe({
      error: (err) => console.log(err),
      complete: () => {
        this.localStorageService.setUsername(loginReq.username)
        this.localStorageService.setPassword(loginReq.password)
        this.navigationService.navigateToDoctorsPage()
      }
    });
  }

  
}
