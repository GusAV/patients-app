import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'patients-app';

  //TODO get user name, hard coded for now
  public user = 'Alex';

  constructor(
    private router: Router
  ) {

    //redirect to main list page
    this.router.navigate(['patients']);
  }
}
