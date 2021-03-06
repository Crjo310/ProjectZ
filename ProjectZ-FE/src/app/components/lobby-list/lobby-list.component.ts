import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lobby } from 'src/app/model/models';
import { SelectOptionService } from 'src/app/util/SelectOptionService';
import { HttpService } from '../../service/http-service';

@Component({
  selector: 'app-lobby-list',
  templateUrl: './lobby-list.component.html',
  styleUrls: ['./lobby-list.component.css'],
  providers: [HttpService]
})
export class LobbyListComponent implements OnInit {

  
  displayedColumns: string[] = ['name', 'gameMode', 'playerNumber', 'join'];
  dataSource: Lobby[] = [];

  
  constructor( private httpService: HttpService, private cdr: ChangeDetectorRef, private router: Router, public selectOptions: SelectOptionService) { }

  ngOnInit(): void {
    this.reloadLobbyList();
  }

  reloadLobbyList() {
    this.httpService.getRequest('lobby/getAll').subscribe(
      (result) => {
        this.dataSource = <Lobby[]>result;
        this.cdr.detectChanges();
      }
    );
  }

  joinLobby(lobbyId: string) {
    this.httpService.postRequest('lobby/addPlayer',{lobbyId: lobbyId, playerId: localStorage.getItem('userId')}).subscribe({
      next: (r) => this.router.navigate(['/lobby/'+ (<Lobby>r).id]),
      error: (e) => window.alert(e.error.message),
      complete: () => {}
    })
  }

  getGameType(value: number) {
    return this.selectOptions.listOfGameModes.find(element => element.value == value)?.label;
  }

}

