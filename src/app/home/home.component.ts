import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../login/user';
import { UserService } from '../login/user.service';


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    users: User[] = [];

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
}