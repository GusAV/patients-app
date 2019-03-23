import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { PatientsService } from './patients.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  title = 'patients-app';
  @ViewChild('focusedInput') focusedInput: ElementRef;

  public patient: { id:number, firstName:string, lastName:string, birthDate:string };
  public patients: any;
  public user = 'Alex';
  public dateType = 'string'; 

  public newPatientForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthdate: ['', Validators.required],
  })

  public patientForms = this.fb.array([]) as FormArray;

  constructor(
    private patientService: PatientsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getPatients();
  }

  getPatients() {
    this.patientService.getPatients().subscribe(patients => {
      let _patients: any = patients;
      this.patientForms = this.fb.array([]) as FormArray;

      for (let patient of _patients) {
        this.patientForms.push(
          this.fb.group({
            id: [patient.id],
            firstName: [patient.firstName, Validators.required],
            lastName: [patient.lastName, Validators.required],
            birthdate: [patient.birthdate, Validators.required],
        }));
      }
    })
  }
  
  addPatient() {
    if (this.newPatientForm.valid) {
      let firstName = this.newPatientForm.controls['firstName'].value;
      let lastName = this.newPatientForm.controls['lastName'].value;
      let birthdate = this.newPatientForm.controls['birthdate'].value;
  
      let patient = {firstName, lastName, birthdate };
      this.patientService.addPatient(patient).subscribe(response => {
        this.getPatients();
        this.newPatientForm.reset();
        this.focusedInput.nativeElement.focus();
      })
    } else {
      for (let control in this.newPatientForm.controls) {
        this.newPatientForm.get(control).markAsTouched();
        this.newPatientForm.get(control).markAsDirty();
      }
    }
  }

  updatePatient(id: number, firstName:string, lastName:string, birthdate:string) {
    let patient = {id, firstName, lastName, birthdate };
    this.patientService.updatePatient(id, patient).subscribe(response => {
      this.getPatients();
    })
  }
  
  deletePatient(id: number) {
    this.patientService.deletePatient(id).subscribe(response => {
      this.getPatients();
    })
  }
}

