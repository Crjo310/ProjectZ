package de.ljv.projectzws.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import de.ljv.projectzws.model.Lobby;
import de.ljv.projectzws.service.LobbyService;

@Controller
public class LobbyWebSocketController {

  @Autowired
  LobbyService lobbyService;

  @MessageMapping("/refreshLobby/{id}")
  @SendTo("/lobbyTopic/{id}")
  @CrossOrigin()
  public Lobby join(@DestinationVariable String id) throws Exception {
    return lobbyService.getLobby(id);
  }

}

