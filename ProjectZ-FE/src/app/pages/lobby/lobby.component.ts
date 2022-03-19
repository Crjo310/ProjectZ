import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { JoinGameComponent } from 'src/app/components/join-game/join-game.component';
import { Lobby, User } from 'src/app/model/models';
import { HttpService } from 'src/app/service/http-service';
import { LobbyService } from 'src/app/service/lobby-service';
import { WebSocketAPILobby } from 'src/app/service/WebSocketAPILobby';
import { urls } from 'src/app/util/util';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  displayedColumns: string[] = ['avatar', 'name', 'kick'];
  dataSource: User[] = [];
  lobby!: Lobby;
  webSocketAPI!: WebSocketAPILobby;
  routeSub: any;
  lobbyId!: string;
  mobile: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute, private lobbyService: LobbyService, private httpService: HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (window.screen.width < 769) {
      this.mobile = true;
    }
    this.lobbyService.lobby$.subscribe((lobby) => {
      this.lobby = lobby;
      if (this.lobby.started == true) {
        this.openJoinGame();
      }
    });
    this.route.params.subscribe( params => {
      this.lobbyId = params['lobbyid'];
      this.webSocketAPI = new WebSocketAPILobby(this.lobbyService);
      this.webSocketAPI._connectLobbySocket(this.lobbyId);
      this.webSocketAPI._sendRefreshMessage(this.lobbyId);
      this.httpService.getRequest("lobby/get/"+this.lobbyId).subscribe(
        (result) => {
          this.lobby = <Lobby>result;
          this.cdr.detectChanges();
        }
      );
    })
  }

  getAvatar(id: number): string {
    return urls.baseAvatarUrl+id+'.png';
  }

  isAdmin(): boolean {
    return this.lobby?.admin?.id == localStorage.getItem('userId');
  }

  isLobbyFull(): boolean {
    if (this.lobby)
      return this.lobby.maxPlayer ==  this.lobby.players.length;
    else 
      return false;
  }

  counter(i: number) {
    return new Array(i);
  }

  startGame() {
    this.httpService.getRequest('lobby/start/'+this.lobbyId).subscribe(
      () => {this.webSocketAPI._sendRefreshMessage(this.lobbyId);}
    );
  }

  openJoinGame(): void{
    const dialogRef = this.dialog.open(JoinGameComponent, {
      disableClose: true,
      width: '300px',
      height: '300px'
    });
    let audio = new Audio();
    audio.src = "../../../assets/audio/game-start.mp3";
    audio.volume = 0.1;
    audio.load();
    audio.play();
    dialogRef.componentInstance.id = this.lobbyId;
  }

  ngOnDestroy() {
    this.webSocketAPI._disconnect();
  }

}
