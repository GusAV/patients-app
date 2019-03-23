import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'patients-app';

  public user = 'Alex';

  constructor(
    private router: Router
  ) {
  this.router.navigate(['patients']);
  }

}
