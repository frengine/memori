import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HighscoreService} from "./highscore.service";

@Injectable({
  providedIn: 'root'
})

export class BoardService {
	size = 6

	hideCardsSubject = new Subject<boolean>()
	foundSubject = new Subject<string>()
	progressBarSubject = new Subject<number>()
	elapsedSecondsSubject = new Subject<number>()

	shownCards = []
	foundCards = []

	timeLeftPerc = 0

	elapsedSeconds = 0
	elapsedSecondsInterval = null

	startTimeInterval = null

	started = false

	public cardClicked(x, y, letter) {
		if (!this.started) {
			this.started = true

			this.elapsedSecondsInterval = setInterval(() => {
				this.elapsedSeconds++
				this.elapsedSecondsSubject.next(this.elapsedSeconds)
			}, 1000)
		}
		if (this.startTimeInterval) {
			clearInterval(this.startTimeInterval)
			this.progressBarSubject.next(0)
		}

		if (this.shownCards.length >= 2) {
			this.hideCards()
		}

		this.shownCards.push([x, y, letter])
		if (this.shownCards.length == 2) {
			let a = this.shownCards[0][2]
			let b = this.shownCards[1][2]
			if (a == b) {
				this.foundCards.push(a)
				this.foundSubject.next(a)

				this.hideCards()

				if (this.foundCards.length == this.size*this.size/2) {
					this.win()
				}
			} else {
				this.startTime()
			}
		}
	}

	startTime() {
		console.log("starttime")
		if (this.startTimeInterval != null) {
			clearInterval(this.startTimeInterval)
		}

		this.timeLeftPerc = 100
		this.startTimeInterval = setInterval(() => {
			this.timeLeftPerc -= 2
			this.progressBarSubject.next(this.timeLeftPerc)
			if (this.timeLeftPerc <= 0) {
				this.hideCards()
				clearInterval(this.startTimeInterval)
			}
		}, 60)
	}

	hideCards() {
		this.shownCards = []

		console.log("hide cards")
		this.hideCardsSubject.next(true)

		clearInterval(this.startTimeInterval)
	}

	getHideCardsSubject() {
		return this.hideCardsSubject
	}

	getFoundSubject() {
		return this.foundSubject
	}

	getProgressBarSubject() {
		return this.progressBarSubject
	}

	getElapsedSecondsSubject() {
		return this.elapsedSecondsSubject
	}

	win() {
		clearInterval(this.elapsedSecondsInterval)

		alert("Je hebt het spel gewonnen in " + this.elapsedSeconds + " seconden!")
		let name = prompt("Wat is je naam?")
		this.highscoreService.addItem(name, this.elapsedSeconds)
	}

	newGame(boardSize) {
		this.shownCards = []
		this.foundCards = []

		this.size = boardSize

		clearInterval(this.startTimeInterval)
		clearInterval(this.elapsedSecondsInterval)

		this.elapsedSeconds = 0
		this.timeLeftPerc = -1
		this.progressBarSubject.next(0)

		this.started = false

		this.elapsedSecondsSubject.next(-1)
		this.foundSubject.next("-1")

		this.hideCards()
	}

	// knuth array shuffle
	// from https://bost.ocks.org/mike/shuffle/
	shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}

	constructor(private highscoreService: HighscoreService) { }
}
