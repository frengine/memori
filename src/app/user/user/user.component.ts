import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/login/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
      public auth: AuthenticationService
  ) { }

  ngOnInit() {
  }

}
