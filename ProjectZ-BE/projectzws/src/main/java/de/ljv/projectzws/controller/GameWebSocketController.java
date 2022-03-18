package de.ljv.projectzws.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import de.ljv.projectzws.model.Game;
import de.ljv.projectzws.model.Player;
import de.ljv.projectzws.service.GameService;

@Controller
public class GameWebSocketController {

  @Autowired
  GameService gameService;

  @MessageMapping("/setpoints/{gameId}/{playerId}/{points}")
  @SendTo("/gameTopic/{gameId}")
  @CrossOrigin()
  public Game changePoints(@DestinationVariable String gameId, @DestinationVariable String playerId, @DestinationVariable Integer points) throws Exception {
    Game game = gameService.getGame(gameId);
    Player player = game.getPlayers().stream().filter(p -> p.getUser().getId().equals(playerId)).findFirst().orElse(null);
    player.setPoints(points);
    return game;
  }

  @MessageMapping("/sendMessage/{gameId}/{playerId}/{text}")
  @SendTo("/gameTopic/{gameId}")
  @CrossOrigin()
  public Game sendMessage(@DestinationVariable String gameId, @DestinationVariable String playerId, @DestinationVariable String text) throws Exception {
    Game game = gameService.getGame(gameId);
    Player player = game.getPlayers().stream().filter(p -> p.getUser().getId().equals(playerId)).findFirst().orElse(null);
    player.setAnswer(text);
    return game;
  }

  @MessageMapping("/switchBuzzer/{gameId}")
  @SendTo("/gameTopic/{gameId}")
  @CrossOrigin()
  public Game buzzerSwitch(@DestinationVariable String gameId) throws Exception {
    Game game = gameService.getGame(gameId);
    game.setBuzzerEnabled(!game.isBuzzerEnabled());
    if (game.isBuzzerEnabled()){
      game.setActiveBuzzer("");
    }
    return game;
  }

  @MessageMapping("/hitBuzzer/{gameId}/{playerId}")
  @SendTo("/gameTopic/{gameId}")
  @CrossOrigin()
  public Game buzzerSwitch(@DestinationVariable String gameId, @DestinationVariable String playerId) throws Exception {
    Game game = gameService.getGame(gameId);
    if (game.isBuzzerEnabled()){
      game.setActiveBuzzer(playerId);
      game.setBuzzerEnabled(false);
    }
    return game;
  }

  @MessageMapping("/activeQuestion/{gameId}/{number}/{question}/{answer}")
  @SendTo("/gameTopic/{gameId}")
  @CrossOrigin()
  public Game activeQuestion(@DestinationVariable String gameId, @DestinationVariable Integer number, @DestinationVariable String question, @DestinationVariable String answer) throws Exception {
    Game game = gameService.getGame(gameId);
    game.getDoneQuestions().add(number);
    game.setCurrentQuestion(question);
    game.setCurrentAnswer(answer);
    game.setShowAnswer(false);
    return game;
  }

  @MessageMapping("/switchShowAnswer/{gameId}")
  @SendTo("/gameTopic/{gameId}")
  @CrossOrigin()
  public Game showAnswer(@DestinationVariable String gameId) throws Exception {
    Game game = gameService.getGame(gameId);
    game.setShowAnswer(!game.isShowAnswer());
    return game;
  }
}

