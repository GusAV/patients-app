import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private header: HttpHeaders;
  
  //endpoint address
  private apiEndpoint:string = 'http://localhost:5000/api/patients/';

  constructor(private http: HttpClient) 
  { 
    this.header = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  //get list of all patients, non-paginated
  public getPatients() {
    return this.http.get(this.apiEndpoint, {headers: this.header});
  }

  //get list of a single pacient, per id given
  public getPatient(id: number) {
    return this.http.get(this.apiEndpoint.concat(id.toString().concat('/')), {headers: this.header});
  }

  //add new patient to DB
  public addPatient(patient) {
    return this.http.post(this.apiEndpoint, patient, {headers: this.header});
  }

  //update existing patient, per id and patient object given
  public updatePatient(patient) {    
    return this.http.put(this.apiEndpoint.concat(patient.id.toString().concat('/')), patient, {headers:this.header});
  }

  //delete existing patient, per id given;
  public deletePatient(id: number) {
    return this.http.delete(this.apiEndpoint.concat(id.toString().concat('/')), {headers:this.header});
  }

  //TODO add response to all endpoints
}
