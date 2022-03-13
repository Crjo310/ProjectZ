import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { NewGameComponent } from './pages/new-game/new-game.component';
import { StartComponent } from './pages/start/start.component';

const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'newgame', component: NewGameComponent },
  { path: 'lobby/', component: LobbyComponent},
  { path: 'lobby/:lobbyid', component: LobbyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
