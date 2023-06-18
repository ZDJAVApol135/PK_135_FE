import { Doctor } from './../model/doctor';
import { Subscription } from 'rxjs';
import { DoctorsService } from './../service/doctors.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent implements OnInit, OnDestroy {
  $sub1: Subscription | undefined;
  $sub2: Subscription | undefined;
  doctors: Doctor[] = [];

  editForm = new FormGroup({
    id: new FormControl(0, Validators.required),
    title: new FormControl(''),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    specialization: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    dateOfBirth: new FormControl(new Date(), Validators.required),
  });

  constructor(private doctorsService: DoctorsService) {}

  ngOnInit(): void {
    this.getList();
  }

  ngOnDestroy(): void {
    this.$sub1?.unsubscribe();
    this.$sub2?.unsubscribe();
  }

  getList() {
    this.$sub2 = this.doctorsService.list().subscribe({
      next: (list) => (this.doctors = list),
      error: (err) => console.log(err),
    });
  }

  delete(id: number) {
    this.$sub1 = this.doctorsService.delete(id).subscribe({
      error: (err) => console.log(err),
      complete: () => {
        this.doctors = this.doctors?.filter((d) => d.id !== id);
        console.log('Removeal completed.');
      },
    });
  }

  initForm(doctor: Doctor) {
    console.log(doctor);
    this.getId()?.setValue(doctor.id ? doctor.id : 0);
    this.getTitle()?.setValue(doctor.title ? doctor.title : '');
    this.getName()?.setValue(doctor.name ? doctor.name : '');
    this.getSurname()?.setValue(doctor.surname ? doctor.surname : '');
    this.getSpecialization()?.setValue(
      doctor.specialization ? doctor.specialization : ''
    );
    this.getPhoneNumber()?.setValue(
      doctor.phoneNumber ? doctor.phoneNumber : ''
    );
    this.getDateOfBirth()?.setValue(
      doctor.dateOfBirth ? doctor.dateOfBirth : new Date()
    );
  }

  update() {
    const updatedDoctor = {
      id: this.getId()?.value,
      title: this.getTitle()?.value,
      specialization: this.getSpecialization()?.value,
      name: this.getName()?.value,
      surname: this.getSurname()?.value,
      dateOfBirth: this.getDateOfBirth()?.value,
      phoneNumber: this.getPhoneNumber()?.value,
    } as Doctor;

    this.doctorsService.update(updatedDoctor.id, updatedDoctor).subscribe({
      error: (err) => console.log(err),
      complete: () => {
        console.log(this.doctors);

        this.doctors = this.doctors.map(element => element.id === updatedDoctor.id ? updatedDoctor : element);

        document.getElementById('closeModalButton')?.click();
        console.log('Update completed.');
      },
    });
  }

  private getId() {
    return this.editForm.get('id');
  }

  private getDateOfBirth() {
    return this.editForm.get('dateOfBirth');
  }

  private getPhoneNumber() {
    return this.editForm.get('phoneNumber');
  }

  private getSpecialization() {
    return this.editForm.get('specialization');
  }

  private getSurname() {
    return this.editForm.get('surname');
  }

  private getName() {
    return this.editForm.get('name');
  }

  private getTitle() {
    return this.editForm.get('title');
  }
}
