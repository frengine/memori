import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { TileComponent } from './board/tile/tile.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { ColorsComponent } from './colors/colors.component';
import { HighscoreComponent } from './highscore/highscore.component';
import { HeaderComponent } from './components/header/header.component';
import { GameComponent } from './components/game/game.component';


import { routing } from './app.routing';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { UserComponent } from './user/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TileComponent,
    ProgressbarComponent,
    ColorsComponent,
    HighscoreComponent,
    HeaderComponent,
    GameComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
