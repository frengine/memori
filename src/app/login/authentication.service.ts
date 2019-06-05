import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    public currentUser: User

    constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"))
    }

    async login(name: string, password: string) {
        try {
            const res = await this.http.post<any>(`http://localhost:5000/api/login`, { name, password }).toPromise()  
            console.log(res)

            this.currentUser = res.user
            localStorage.setItem("currentUser", JSON.stringify(this.currentUser))

        } catch (err) {
            console.log(err)
            alert(err.error.message || "Unkown error (server down?)")
        }
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser')
        this.currentUser = null
    }
}