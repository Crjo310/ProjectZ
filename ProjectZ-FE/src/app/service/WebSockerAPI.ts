import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Lobby } from '../model/models';
import { Client } from 'stompjs';
import { LobbyService } from './lobby-service';
import { environment } from 'src/environments/environment';

export class WebSocketAPI {
    webSocketEndPointLobby: string = environment.wsURL +'ws';
    topic: string = "/lobbyTopic/";
    stompClient: any;

    constructor(private lobbyService: LobbyService) {}

    _connectLobbySocket(lobbyId : string) {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPointLobby);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function () {
            _this.stompClient.subscribe(_this.topic + lobbyId, function (sdkEvent: any) {
                _this.onLobbyReceived(JSON.parse(sdkEvent.body));
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

    _sendJoinMessage(lobbyId: string) {
        this.waitForSocketConnection((<Client>this.stompClient).ws, () => {
            console.log("calling join api via web socket");
            this.stompClient.send("/app/joinLobby/" + lobbyId);
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

    onLobbyReceived(lobby: Lobby): void {
        this.lobbyService.newLobby(lobby);
    }
}