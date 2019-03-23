import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientsService } from './patients/patients.service';
import { PatientComponent } from './patient/patient.component';
import { PatientsComponent } from './patients/patients.component';


@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    PatientsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [PatientsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
