import { PatientSignup } from './../model/patient-signup';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DoctorSignup } from '../model/doctor-signup';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  
  readonly baseUrl: string = 'http://localhost:9090/api/signup';

  constructor(private http: HttpClient) {}

  patientSignup(patientSignup: PatientSignup) {
    return this.http.post(`${this.baseUrl}/patient`, patientSignup);
  }

  doctorSignup(doctorSignup: DoctorSignup) {
    return this.http.post(`${this.baseUrl}/doctor`, doctorSignup);
  }
}
