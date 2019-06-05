import { Component } from '@angular/core';
import { GameService, Game } from '../games/game.service';


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {

    games: Game[]

    constructor(
        public gameService: GameService
    ) {
        gameService.getGames().then(games => this.games = games)
    }

}