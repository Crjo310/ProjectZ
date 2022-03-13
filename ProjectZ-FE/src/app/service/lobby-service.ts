import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Lobby } from "../model/models";

@Injectable({
    providedIn: 'root'
  })
export class LobbyService {
  private _subject = new Subject<Lobby>();

  newLobby(lobby: Lobby) {
    this._subject.next(lobby);
  }

  get lobby$ () {
    return this._subject.asObservable();
  }
}