package de.ljv.projectzws.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import de.ljv.projectzws.model.Player;
import de.ljv.projectzws.storage.PlayerStorage;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PlayerService {
    
    public Player createPlayer(String name, String avatarId) {
        Player player = new Player();
        String id = UUID.randomUUID().toString();
        player.setId(id);
        player.setName(name);
        player.setAvatarId(avatarId);
        PlayerStorage.getInstance().addPlayer(player);
        return player;
    }

    public Player getPlayer(String id) {
        return PlayerStorage.getInstance().getPlayers().get(id);
    }
}