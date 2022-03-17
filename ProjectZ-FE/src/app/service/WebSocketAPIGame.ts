import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Game, Question } from '../model/models';
import { Client } from 'stompjs';
import { environment } from 'src/environments/environment';
import { GameService } from './game-service';

export class WebSocketAPIGame {
    webSocketEndPointGame: string = environment.wsURL +'ws';
    topicGame: string = "/gameTopic/";
    stompClient: any;

    constructor(private gameService: GameService) {}

    _connectGameSocket(gameId : string, isAdmin: boolean) {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPointGame);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function () {
            _this.stompClient.subscribe(_this.topicGame + gameId, function (sdkEvent: any) {
                _this.onGameReceived(JSON.parse(sdkEvent.body));
            });
        }, this.errorCallBack);
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    errorCallBack(error: any) {
        console.log("errorCallBack -> " + error)
    }

    _sendUpdatePoints(gameId: string, playerId: string, points: number) {
        this.waitForSocketConnection((<Client>this.stompClient).ws, () => {
            this.stompClient.send("/app/setpoints/" + gameId + "/" + playerId + "/" + points);
        });
    }

    _sendSwitchBuzzer(gameId: string) {
        this.waitForSocketConnection((<Client>this.stompClient).ws, () => {
            this.stompClient.send("/app/switchBuzzer/" + gameId);
        });
    }

    switchShowAnswer(gameId: string) {
        this.waitForSocketConnection((<Client>this.stompClient).ws, () => {
            this.stompClient.send("/app/switchShowAnswer/" + gameId);
        });
    }

    _sendHitBuzzer(gameId: string, playerId: string) {
        this.waitForSocketConnection((<Client>this.stompClient).ws, () => {
            this.stompClient.send("/app/hitBuzzer/" + gameId + "/" + playerId);
        });
    }

    _sendActiveQuestion(gameId: string, question: Question) {
        this.waitForSocketConnection((<Client>this.stompClient).ws, () => {
            this.stompClient.send("/app/activeQuestion/" + gameId + "/" + question.question + "/" + question.answer);
        });
    }

    _sendMessage(gameId: string, playerId: string, text: string){
        this.waitForSocketConnection((<Client>this.stompClient).ws, () => {
            this.stompClient.send("/app/sendMessage/" + gameId + "/" + playerId + "/" + text);
        });
    }

    public waitForSocketConnection(socket: WebSocket, callback: any){
    setTimeout(
         () => {
            if (socket.readyState === 1) {
                console.log("Connection is made")
                if (callback != null){
                    callback();
                }
            } else {
                console.log("wait for connection...")
                this.waitForSocketConnection(socket, callback);
            }
        }, 20);
    }

    onGameReceived(game: Game): void {
        this.gameService.refreshGame(game);
    }

}