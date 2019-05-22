import { Component, OnInit } from '@angular/core';
import { ColorsService } from "../colors.service";

@Component({
	selector: 'app-colors',
	templateUrl: './colors.component.html',
	styleUrls: ['./colors.component.css']
})
export class ColorsComponent implements OnInit {
	constructor(private colorsService: ColorsService) { }

	ngOnInit() {
	}

	changeColour(name, value) {
		this.colorsService.changeColour(name, value)
		console.log(name, value)
	}

}
