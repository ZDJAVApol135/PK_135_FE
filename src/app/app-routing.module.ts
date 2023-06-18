import { PatientsComponent } from './patients/patients.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guard/auth.guard';
import { DoctorsComponent } from './doctors/doctors.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: '/doctors', pathMatch: 'full' },
      {
        path: 'doctors',
        component: DoctorsComponent,
      },
      {
        path: 'patients',
        component: PatientsComponent,
      },
    ],
  },

  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
