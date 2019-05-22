import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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

	startTimeInterval = null

	started = false

	public cardClicked(x, y, letter) {
		if (!this.started) {
			this.started = true

			setInterval(() => {
				this.elapsedSeconds++
				this.elapsedSecondsSubject.next(this.elapsedSeconds)
			}, 1000)
		}
		if (this.startTimeInterval) {
			clearInterval(this.startTimeInterval)
			this.progressBarSubject.next(0)
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
		} else if (this.shownCards.length > 2) {
			this.hideCards()
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
		alert("Je hebt het spel gewonnen in " + this.elapsedSeconds + " seconden!")
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
}
