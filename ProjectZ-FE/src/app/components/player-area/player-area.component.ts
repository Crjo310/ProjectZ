import { Component, Input, OnInit } from '@angular/core';
import { Game, Message, Player } from 'src/app/model/models';
import { GameService, PointObject } from 'src/app/service/game-service';
import { urls } from 'src/app/util/util';

@Component({
  selector: 'app-player-area',
  templateUrl: './player-area.component.html',
  styleUrls: ['./player-area.component.css']
})
export class PlayerAreaComponent implements OnInit {

  @Input() player!: Player;
  @Input() game!: Game;
  avatarBaseUrl: string = urls.baseAvatarUrl;
  message!: string;
 
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.game$.subscribe((game) => {
      this.game = game;
    });
  }

  isCorrectPlayer(){
    return this.player.user.id == localStorage.getItem('userId');
  }

  isAdmin(): boolean{
    return this.game?.admin?.id == localStorage.getItem('userId');
  }

  pressBuzzer(){
    if (this.isCorrectPlayer() && this.game.buzzerEnabled){
      this.gameService.sendBuzzerHit(<string>localStorage.getItem('userId'));
    }
  }
  
  plus(){
    let pointObject: PointObject = {player: this.player.user.id, points: this.player.points + 100};
    this.gameService.sendRefreshPoints(pointObject);
  }

  minus(){
    let pointObject: PointObject = {player: this.player.user.id, points: this.player.points - 100};
    this.gameService.sendRefreshPoints(pointObject);
  }

  onEnter(event:any){
    let newMessage: Message = {
      text: event.target.value,
      playerId: <string>localStorage.getItem('userId')
    };
    this.gameService.sendMessage(newMessage);
  }

  isBuzzerActive(): boolean{ 
    return this.game.activeBuzzer === this.player.user.id;
  }
}
