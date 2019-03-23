import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PatientsComponent } from './patients/patients.component';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  { path: 'patients', component: PatientsComponent },
  { path: 'patients/:id', component: PatientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
