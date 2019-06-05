import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent {
    constructor(
        public auth: AuthenticationService
    ) { }

}
