import { Component, OnInit } from '@angular/core';
import { HighscoreService } from "../highscore.service";

@Component({
	selector: 'app-highscore',
	templateUrl: './highscore.component.html',
	styleUrls: ['./highscore.component.css']
})
export class HighscoreComponent implements OnInit {
	highscore = []

	constructor(private highscoreService: HighscoreService) { }

	ngOnInit() {
		this.highscore = this.highscoreService.getHighscore()
	}
}
