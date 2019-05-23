import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TileComponent } from "./tile/tile.component";
import { BoardService } from "../board.service";

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
	constructor(private boardService: BoardService) { }

	@Input()
	boardSize = 6

	letterArray = []

	rows = []

	foundAmount = 0

	defaultElapsedTime = "nog niet begonnen"

	elapsedTime = this.defaultElapsedTime

	@Input()
	cardBackChar = "-"

	ngOnInit() {
		this.letterArray = "AABBCCDDEEFFGGHHIIJJKKLLMMNNOOPPQQRRSSTTUUVVWWXXYYZZ".substring(0, this.boardSize * this.boardSize).split('')
		this.letterArray = this.shuffle(this.letterArray)

		let idx = 0
		for (let x = 0; x < this.boardSize; x++) {
			let cols = []
			for (let y = 0; y < this.boardSize; y++) {
				cols.push({
					"num": y,
					"val": this.letterArray[idx++],
				})
			}
			this.rows.push({
				"num": x,
				"columns": cols,
			})
		}

		this.boardService.getFoundSubject().subscribe((letter) => {
			if (letter == "-1") {
				// Reset
				this.foundAmount = 0
			}
			this.foundAmount++
		})

		this.boardService.getElapsedSecondsSubject().subscribe((secs) => {
			if (secs == -1) {
				// Reset
				this.defaultElapsedTime
			}
			this.elapsedTime = secs + " seconden"
		})
	}

	@Output()
	cardClickedEvent = new EventEmitter()
	
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
