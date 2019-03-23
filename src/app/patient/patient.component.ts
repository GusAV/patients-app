import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsService } from '../patients/patients.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  public patient: any;
  public patientForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthdate: ['', Validators.required],
  })

  constructor(
    private patientService: PatientsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    //get patient id from url params and update declared patient and form with proper data
    this.route.params.subscribe(params => {
      this.patientService.getPatient(params.id).subscribe(_patient => {
        this.patient = _patient;
        this.patientForm.patchValue({
          firstName: this.patient.firstName,
          lastName: this.patient.lastName,
          birthdate: this.patient.birthdate,
        })
      })
    })
  }

  updatePatient() {
    let id = this.patient.id;
    let firstName = this.patientForm.controls['firstName'].value;
    let lastName = this.patientForm.controls['lastName'].value;
    let birthdate = this.patientForm.controls['birthdate'].value;
  
    let patient = { id, firstName, lastName, birthdate };
    this.patientService.updatePatient(patient).subscribe(response => {
    })
  }
  
  deletePatient() {
    this.patientService.deletePatient(this.patient.id).subscribe(response => {
      this.router.navigate(['patients'])
    })
  }
}
