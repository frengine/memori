import { Component, OnInit } from '@angular/core';
import { BoardService } from "../board.service";

@Component({
	selector: 'app-progressbar',
	templateUrl: './progressbar.component.html',
	styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent implements OnInit {
	perc = 0

	constructor(private boardService: BoardService) { }

	ngOnInit() {
		this.boardService.getProgressBarSubject().subscribe(value => {
			this.perc = value
		})
	}
}
