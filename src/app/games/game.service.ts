import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Game {
    id: string
    name: string
    url: string
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }


  async getGames(): Promise<Game[]> {
      return await this.http.get<Game[]>("http://localhost:5000/api/games").toPromise()
  }

}
