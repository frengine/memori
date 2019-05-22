import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ColorsService {

	constructor() { }

	frontColourSubject = new Subject<string>()
	backColourSubject = new Subject<string>()
	foundColourSubject = new Subject<string>()

	changeColour(name, value) {
		switch (name) {
		case "front":
			this.frontColourSubject.next(value)
			break;
		case "back":
			this.backColourSubject.next(value)
			break;
		case "found":
			this.foundColourSubject.next(value)
			break;
		}
	}

	getBackColourSubject() {
		return this.backColourSubject
	}

	getFrontColourSubject() {
		return this.frontColourSubject
	}

	getFoundColourSubject() {
		return this.foundColourSubject
	}
}
