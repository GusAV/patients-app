import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private header: HttpHeaders;
  private apiEndpoint:string = 'http://localhost:5000/api/patients/';

  constructor(private http: HttpClient) 
  { 
    this.header = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  public getPatients() {
    return this.http.get(this.apiEndpoint, {headers: this.header});
  }

  public getPatient(id: number) {
    return this.http.get(this.apiEndpoint.concat(id.toString().concat('/')), {headers: this.header});
  }

  public addPatient(patient) {
    return this.http.post(this.apiEndpoint, patient, {headers: this.header});
  }

  public updatePatient(id: number, patient) {    
    return this.http.put(this.apiEndpoint.concat(id.toString().concat('/')), patient, {headers:this.header});
  }

  public deletePatient(id: number) {
    return this.http.delete(this.apiEndpoint.concat(id.toString().concat('/')), {headers:this.header});
  }
}
