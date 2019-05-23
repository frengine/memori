import { Component } from '@angular/core';
import { BoardService } from "./board.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Memori';

	boardFlag = true
	cardBackChar = "*"

	boardSize = 6

	constructor(private boardService: BoardService) { }

	newGame(backChar, boardSize) {
		this.boardSize = boardSize

		this.boardService.newGame(boardSize)

		this.cardBackChar = backChar

		this.boardFlag = false
		setTimeout(() => {
			this.boardFlag = true
		}, 50)
	}
}
