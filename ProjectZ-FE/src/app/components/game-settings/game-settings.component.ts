import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lobby } from 'src/app/model/models';
import { HttpService } from '../../service/http-service';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.css'],
  providers: [HttpService]
})
export class GameSettingsComponent implements OnInit {
 
  lobbyname: string = "";
  maxPlayer: number = 0;


  constructor(private httpService: HttpService, private router: Router) { 
  }

  ngOnInit(): void {
  }

  onLobbyNameChange(event: any) {
    this.lobbyname = event.target.value;
  }

  onMaxPlayerChange(event: any) {
    this.maxPlayer = event.value;
}

  createLobby(){
    this.httpService.postRequest('lobby/create', {name: this.lobbyname, maxPlayer: this.maxPlayer, adminId: localStorage.getItem('userId')}).subscribe({
      next: (r) => this.router.navigate(['/lobby/'+ (<Lobby>r).id]),
      error: (e) => window.alert(e.error.message),
      complete: () => {}
      })
  }

}
