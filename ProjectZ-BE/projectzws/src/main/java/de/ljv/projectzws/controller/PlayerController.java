package de.ljv.projectzws.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.ljv.projectzws.model.Player;
import de.ljv.projectzws.service.PlayerService;


@RestController
@RequestMapping("/player")
public class PlayerController {

    @Autowired
    PlayerService playerService;

    @PostMapping("create")
    @CrossOrigin(origins = "http://localhost:4200")
    public Player createLobby(@RequestBody PlayerRequestBody body) {
        System.out.println("Player created");
        return playerService.createPlayer(body.getName(),body.getAvatarId());
    }
    
}

class PlayerRequestBody {
    private String name;
    private String avatarId;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getAvatarId() {
        return avatarId;
    }
    public void setAvatarId(String avatarId) {
        this.avatarId = avatarId;
    }  

    
}