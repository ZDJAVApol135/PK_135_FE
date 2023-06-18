import { NavigationService } from './../service/navigation.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from './../service/registration.service';
import { Component, OnDestroy } from '@angular/core';
import { PatientSignup } from '../model/patient-signup';
import { Router } from '@angular/router';
import { DoctorSignup } from '../model/doctor-signup';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnDestroy {
  $sub1: Subscription | undefined;
  $sub2: Subscription | undefined;

  isPatient: boolean = true;

  patientForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    pesel: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    dateOfBirth: new FormControl(new Date(''), Validators.required)
  });

  doctorForm = new FormGroup({
    title: new FormControl(''),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    specialization: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    dateOfBirth: new FormControl(new Date(''), Validators.required)
  });

  constructor(
    private navigationService: NavigationService,
    private registrationService: RegistrationService
  ) {}

  toggleIsPatient() {
    this.isPatient = !this.isPatient;
  }

  onSubmit() {
    if (this.isPatient) {
      const patientSignup = {
        username: this.patientForm.controls.username.value,
        password: this.patientForm.controls.password.value,
        email: this.patientForm.controls.email.value,
        name: this.patientForm.controls.name.value,
        surname: this.patientForm.controls.surname.value,
        pesel: this.patientForm.controls.pesel.value,
        phoneNumber: this.patientForm.controls.phoneNumber.value,
        dateOfBirth: this.patientForm.controls.dateOfBirth.value,
      } as PatientSignup;

      this.$sub1 = this.registrationService
        .patientSignup(patientSignup)
        .subscribe({
          error: (err) => console.log(err),
          complete: () => this.navigationService.navigateToLoginPage()
        });
    } else {
      const doctorSignup = {
        username: this.doctorForm.controls.username.value,
        password: this.doctorForm.controls.password.value,
        email: this.doctorForm.controls.email.value,
        name: this.doctorForm.controls.name.value,
        surname: this.doctorForm.controls.surname.value,
        phoneNumber: this.doctorForm.controls.phoneNumber.value,
        dateOfBirth: this.doctorForm.controls.dateOfBirth.value,
        specialization: this.doctorForm.controls.specialization.value,
        title: this.doctorForm.controls.title.value,
      } as DoctorSignup;

      this.$sub2 = this.registrationService
        .doctorSignup(doctorSignup)
        .subscribe({
          error: (err) => console.log(err),
          complete: () => this.navigationService.navigateToLoginPage()
        });
    }
  }

  ngOnDestroy(): void {
    this.$sub1?.unsubscribe();
    this.$sub2?.unsubscribe();
  }

}
