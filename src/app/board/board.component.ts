import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TileComponent } from "./tile/tile.component";
import { BoardService } from "../board.service";

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
	constructor(private boardService: BoardService) { }

	size = 6
	letterArray = "AABBCCDDEEFFGGHHIIJJKKLLMMNNOOPPQQRRSSTTUUVVWWXXYYZZ".substring(0, this.size * this.size).split('')

	rows = []

	foundAmount = 0

	elapsedTime = "nog niet begonnen"

	ngOnInit() {
		let idx = 0
		  //this.letterArray = this.shuffle(this.letterArray)
		for (let x = 0; x < this.size; x++) {
			let cols = []
			for (let y = 0; y < this.size; y++) {
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

		this.boardService.getFoundSubject().subscribe(() => {
			this.foundAmount++
		})

		this.boardService.getElapsedSecondsSubject().subscribe((secs) => {
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
