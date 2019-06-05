import { Injectable } from '@angular/core';
import {  Subject } from 'rxjs';
import { AuthenticationService } from './login/authentication.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class HighscoreService {

	highscoreSubject = new Subject()

	constructor(
        private auth: AuthenticationService,
        private http: HttpClient
    ) {
        this.getHighscores()
    }

	async addItem(score: number) {
        
        await this.http.post("http://localhost:5000/api/myscores/01", { score }).toPromise()

        this.getHighscores()
		
	}

	async getHighscores() {
        
        const scores = await this.http.get("http://localhost:5000/api/topscores/01").toPromise()
        
        this.highscoreSubject.next(scores)
	}
}
