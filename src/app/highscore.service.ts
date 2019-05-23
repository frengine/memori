import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class HighscoreService {
	highscore = [{
		"name": "Wubbe",
		"score": 6,
	}, {
		"name": "De Wuko's",
		"score": 532,
	}]

	highscoreSubject = new Subject()

	constructor() { }

	addItem(name: string, score: number) {
		this.highscore.push(
			{"name": name, "score": score})
		this.highscore.sort(
			(a, b) => {
				return a.score - b.score
			})
		// TODO: Cut at five.
		this.highscoreSubject.next(this.highscore)
	}

	getHighscore() {
		return this.highscore
	}
}
