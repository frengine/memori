import { Component } from '@angular/core';
import { BoardService } from "../../board.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
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
