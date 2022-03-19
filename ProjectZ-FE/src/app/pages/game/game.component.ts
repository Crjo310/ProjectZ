import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/model/models';
import { GameService } from 'src/app/service/game-service';
import { HttpService } from 'src/app/service/http-service';
import { WebSocketAPIGame } from 'src/app/service/WebSocketAPIGame';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game!: Game
  webSocketAPI!: WebSocketAPIGame;
  messages: string[] = [];

  constructor(private httpService: HttpService, private route: ActivatedRoute, private gameService: GameService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.route.params.subscribe( params => {
      let gameId = params['gameid'];
      this.httpService.getRequest("game/get/"+gameId).subscribe(
        (result) => {
          this.game = <Game>result;
          this.cdr.detectChanges();
          this.webSocketAPI = new WebSocketAPIGame(this.gameService);
          this.webSocketAPI._connectGameSocket(gameId, this.isAdmin());
          this.gameService.points$.subscribe((pointObject) => {
            this.webSocketAPI._sendUpdatePoints(gameId,pointObject.player,pointObject.points);
          });
          this.gameService.switchBuzzer$.subscribe(() => {
            this.webSocketAPI._sendSwitchBuzzer(gameId);
          });
          this.gameService.switchShowAnswer$.subscribe(() => {
            this.webSocketAPI.switchShowAnswer(gameId);
          });
          this.gameService.messageSent$.subscribe((message) => {
            this.webSocketAPI._sendMessage(gameId,message.playerId,message.text);
          });
          this.gameService.hitBuzzer$.subscribe((playerId) => {
            this.webSocketAPI._sendHitBuzzer(gameId,playerId);
          });
          this.gameService.activeQuestion$.subscribe((question) => {
            this.webSocketAPI._sendActiveQuestion(gameId,question);
          });
        }
      )
    });
    this.gameService.game$.subscribe((game) => {
      if (game.activeBuzzer != "" && game.activeBuzzer != this.game.activeBuzzer){
        let audio = new Audio();
        audio.volume = 0.1;
        audio.src = "../../../assets/audio/buzzer.mp3";
        audio.load();
        audio.play();
      }
      this.game = game;
    });
  }

  isAdmin(): boolean{
    return this.game?.admin?.id == localStorage.getItem('userId');
  }

  ngOnDestroy() {
    this.webSocketAPI._disconnect();
  }


}
