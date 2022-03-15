package de.ljv.projectzws.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.ljv.projectzws.model.Lobby;
import de.ljv.projectzws.service.LobbyService;


@RestController
@RequestMapping("/lobby")
public class LobbyController {

    @Autowired
    LobbyService lobbyService;

    @PostMapping("create")
    @CrossOrigin
    public Lobby createLobby(@RequestBody CreateLobbyRequestBody body) {
        System.out.println("Lobby created");
        return lobbyService.createLobby(body.name,body.maxPlayer,body.adminId,body.gameType);
    }

    @GetMapping("getAll")
    @CrossOrigin
    public Lobby[] getAllLobbies() {
        System.out.println("Lobbies taken");
        return lobbyService.getLobbies();
    }

    @GetMapping("get/{id}")
    @CrossOrigin
    public Lobby getLobby(@PathVariable(value="id") String id) {
        System.out.println("Lobby taken");
        return lobbyService.getLobby(id);
    }

    @PostMapping("addPlayer")
    @CrossOrigin
    public ResponseEntity<?> addPlayer(@RequestBody AddPlayerRequestBody body) {
        try {
            return ResponseEntity.ok(lobbyService.addPlayer(body.lobbyId,body.playerId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e);
        }
    }
}

class CreateLobbyRequestBody {
    public String name;
    public Integer maxPlayer;
    public String adminId;
    public Integer gameType;
}

class AddPlayerRequestBody {
    public String lobbyId;
    public String playerId; 
}