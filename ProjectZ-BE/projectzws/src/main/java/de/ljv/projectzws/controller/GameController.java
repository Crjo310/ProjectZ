package de.ljv.projectzws.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.ljv.projectzws.model.Game;
import de.ljv.projectzws.service.GameService;

@RestController
@RequestMapping("/game")
public class GameController {

    @Autowired
    GameService gameService;

    @GetMapping("get/{id}")
    @CrossOrigin
    public Game getGame(@PathVariable(value="id") String id) {
        System.out.println("Lobby taken");
        return gameService.getGame(id);
    }

    
}
