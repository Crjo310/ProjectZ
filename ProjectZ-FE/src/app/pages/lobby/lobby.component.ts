import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lobby, Player } from 'src/app/model/models';
import { LobbyService } from 'src/app/service/lobby-service';
import { WebSocketAPI } from 'src/app/service/WebSockerAPI';
import { urls } from 'src/app/util/util';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  displayedColumns: string[] = ['avatar', 'name', 'kick'];
  dataSource: Player[] = [];
  lobby!: Lobby;
  webSocketAPI!: WebSocketAPI;
  routeSub: any;

  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute, private lobbyService: LobbyService) { }

  ngOnInit(): void {
    this.lobbyService.lobby$.subscribe((lobby) => this.lobby = lobby);
    this.route.params.subscribe( params => {
      this.webSocketAPI = new WebSocketAPI(this.lobbyService);
      this.webSocketAPI._connectLobbySocket(params['lobbyid']);
      this.webSocketAPI._sendJoinMessage(params['lobbyid']);
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

  ngOnDestroy() {
    this.webSocketAPI._disconnect();
  }

}
