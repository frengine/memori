import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './login/user';
import { AuthenticationService } from './login/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Memori';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
