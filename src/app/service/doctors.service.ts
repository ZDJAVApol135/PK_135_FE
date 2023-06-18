import { Doctor } from './../model/doctor';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  readonly baseUrl: string = 'http://localhost:9090/api/doctors';

  constructor(private http: HttpClient) {}

  list(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.baseUrl);
  }

  get(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.baseUrl}/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  update(id: number, doctor: Doctor) {
    return this.http.put(`${this.baseUrl}/${id}`, doctor);
  }
}
