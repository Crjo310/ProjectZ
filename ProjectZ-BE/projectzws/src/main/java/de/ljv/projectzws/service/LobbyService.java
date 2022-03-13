package de.ljv.projectzws.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.ljv.projectzws.model.Lobby;
import de.ljv.projectzws.model.Player;
import de.ljv.projectzws.storage.LobbyStorage;
import de.ljv.projectzws.storage.PlayerStorage;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LobbyService {

    @Autowired
    PlayerService playerService;
    
    public Lobby createLobby(String lobbyName, Integer maxPlayer, String adminId) {
        Lobby lobby = new Lobby();
        String id = UUID.randomUUID().toString();
        lobby.setId(id);
        lobby.setName(lobbyName);
        lobby.setAdmin(PlayerStorage.getInstance().getPlayers().get(adminId));
        lobby.setMaxPlayer(maxPlayer);
        lobby.setPlayers(new ArrayList<Player>());
        LobbyStorage.getInstance().addLobby(lobby);
        return lobby;
    }

    public Lobby[] getLobbies() {
        Map<String, Lobby> sourceMap = LobbyStorage.getInstance().getLobbies();
        Collection<Lobby> values = sourceMap.values();
        return values.toArray(new Lobby[0]);
    }

    public Lobby getLobby(String id) {
        return LobbyStorage.getInstance().getLobbies().get(id);
    }

    public Lobby addPlayer(String lobbyId, String playerId) throws Exception {
        Lobby lobby = this.getLobby(lobbyId);
        Player player = playerService.getPlayer(playerId);
        if (lobby.getPlayers().size() >= lobby.getMaxPlayer()){
            throw new Exception("Lobby is full");
        }
        lobby.getPlayers().add(player);
        return lobby;
    }
}
