import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewGameComponent } from './pages/new-game/new-game.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { GameSettingsComponent } from './components/game-settings/game-settings.component';
import { StartComponent } from './pages/start/start.component';
import { LobbyListComponent } from './components/lobby-list/lobby-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { AvatarPickerComponent } from './components/avatar-picker/avatar-picker.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { JoinGameComponent } from './components/join-game/join-game.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GameComponent } from './pages/game/game.component';
import { GameFreestyleComponent } from './components/game-freestyle/game-freestyle.component';
import { GameNerdquizComponent } from './components/game-nerdquiz/game-nerdquiz.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PlayerAreaComponent } from './components/player-area/player-area.component';
import { FormsModule } from '@angular/forms';






@NgModule({
  declarations: [
    AppComponent,
    NewGameComponent,
    GameSettingsComponent,
    StartComponent,
    LobbyListComponent,
    HeaderComponent,
    LobbyComponent,
    AvatarPickerComponent,
    JoinGameComponent,
    GameComponent,
    GameFreestyleComponent,
    GameNerdquizComponent,
    PlayerAreaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    HttpClientModule,
    MatDialogModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTooltipModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
