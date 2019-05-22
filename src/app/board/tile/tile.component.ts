import { Component, OnInit, Input } from '@angular/core';
import { BoardService } from "../../board.service";
import { ColorsService } from "../../colors.service";

@Component({
	selector: 'app-tile',
	templateUrl: './tile.component.html',
	styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {
	backColour = "#ff0000"
	frontColour = "#00ff00"
	foundColour = "#0000ff"

	@Input()
	letter: string

	@Input()
	x: number

	@Input()
	y: number

	show = false
	found = false

	// TODO: Make this dynamic
	placeholder = "#"

	constructor(private boardService: BoardService, private colorsService: ColorsService) { }

	ngOnInit() {
		this.boardService.getHideCardsSubject().subscribe(
			val => {
				if (!this.found) {
					this.show = false
				}
			}
		)

		this.boardService.getFoundSubject().subscribe(
			foundLetter => {
				if (this.letter == foundLetter) {
					this.found = true
					this.show = true
					this.frontColour = this.foundColour
				}
			}
		)

		this.colorsService.getBackColourSubject().subscribe(
			newColour => {
				this.backColour = newColour
			}
		)
		this.colorsService.getFrontColourSubject().subscribe(
			newColour => {
				if (!this.found) {
					this.frontColour = newColour
				}
			}
		)
		this.colorsService.getFoundColourSubject().subscribe(
			newColour => {
				this.foundColour = newColour
				if (this.found) {
					this.frontColour = this.foundColour
				}
			}
		)
	}

	cardClicked() {
		this.boardService.cardClicked(this.x, this.y, this.letter)

		this.show = true
	}
}
