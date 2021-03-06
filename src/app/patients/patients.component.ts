import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { PatientsService } from './patients.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  //viewchild to get dom element to return focus after new patient is added
  @ViewChild('focusedInput') focusedInput: ElementRef;

  //patient object should be 
  //patient: { id:number, firstName:string, lastName:string, birthDate:string };
  
  //form to add new patient
  public newPatientForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthdate: ['', Validators.required],
  })

  // list of forms, generated by the list of all patients collected
  public patientForms = this.fb.array([]) as FormArray;

  constructor(
    private patientService: PatientsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getPatients();
  }

  //get the list of patients from API and generate forms
  getPatients() {
    this.patientService.getPatients().subscribe(patients => {
      let _patients: any = patients;
      this.patientForms = this.fb.array([]) as FormArray;

      //iterate through patients list recieved from API to create forms for each one of them
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
  
  //send new patient data to DB
  addPatient() {
    if (this.newPatientForm.valid) {
      let firstName = this.newPatientForm.controls['firstName'].value;
      let lastName = this.newPatientForm.controls['lastName'].value;
      let birthdate = this.newPatientForm.controls['birthdate'].value;
  
      let patient = {firstName, lastName, birthdate };
      this.patientService.addPatient(patient).subscribe(response => {
        //reset forms and focus back on first input for proper usability
        this.getPatients();
        this.newPatientForm.reset();
        this.focusedInput.nativeElement.focus();
      })
    } else {
      //iterate through form to show invalid input
      for (let control in this.newPatientForm.controls) {
        this.newPatientForm.get(control).markAsTouched();
        this.newPatientForm.get(control).markAsDirty();
      }
    }
  }

  //update existing patient, send new data to DB
  updatePatient(id: number, firstName:string, lastName:string, birthdate:string) {
    let patient = {id, firstName, lastName, birthdate };
    this.patientService.updatePatient(patient).subscribe(response => {
      this.getPatients();
    })
  }
  
  //send patient id to delete on DB
  deletePatient(id: number) {
    this.patientService.deletePatient(id).subscribe(response => {
      this.getPatients();
    })
  }

  //TODO get response for each function and add loading to show user confirmation of action executed and improve user usability 
}

