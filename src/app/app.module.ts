import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { TileComponent } from './board/tile/tile.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { ColorsComponent } from './colors/colors.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TileComponent,
    ProgressbarComponent,
    ColorsComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
