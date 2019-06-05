import { Component, OnInit } from '@angular/core';
import { HighscoreService } from "../highscore.service";

@Component({
	selector: 'app-highscore',
	templateUrl: './highscore.component.html',
	styleUrls: ['./highscore.component.css']
})
export class HighscoreComponent {

	constructor(public highscoreService: HighscoreService) { }

}
