import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Game, Message, Question } from "../model/models";

@Injectable({
    providedIn: 'root'
  })
export class GameService {
  private _gameSubject = new Subject<Game>();
  private _pointSubject = new Subject<PointObject>();
  private _sendMessageSubject = new Subject<Message>();
  private _switchBuzzerSubject = new Subject();
  private _switchShowAnswerSubject = new Subject();
  private _hitBuzzerSubject = new Subject<string>();
  private _questionSubject = new Subject<Question>();


  refreshGame(game: Game) {
    this._gameSubject.next(game);
  }

  get game$ () {
    return this._gameSubject.asObservable();
  }

  sendMessage(message: Message) {
    this._sendMessageSubject.next(message);
  }

  get messageSent$ () {
    return this._sendMessageSubject.asObservable();
  }

  sendRefreshPoints(object: PointObject) {
    this._pointSubject.next(object);
  }

  get points$ () {
    return this._pointSubject.asObservable();
  }

  sendSwitchBuzzer() {
    this._switchBuzzerSubject.next({});
  }

  get switchBuzzer$ () {
    return this._switchBuzzerSubject.asObservable();
  }

  sendShowAnswerSwitch() {
    this._switchShowAnswerSubject.next({});
  }

  get switchShowAnswer$ () {
    return this._switchShowAnswerSubject.asObservable();
  }

  sendBuzzerHit(playerId: string){
    this._hitBuzzerSubject.next(playerId);
  }

  get hitBuzzer$ () {
    return this._hitBuzzerSubject.asObservable();
  }

  sendActiveQuestion(question: Question){
    this._questionSubject.next(question);
  }

  get activeQuestion$ () {
    return this._questionSubject.asObservable();
  }

}

export interface PointObject {
  points: number;
  player: string;
}