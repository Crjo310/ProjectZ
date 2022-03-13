package de.ljv.projectzws.storage;

import java.util.HashMap;
import java.util.Map;

import de.ljv.projectzws.model.Lobby;

public class LobbyStorage {

    private static Map<String, Lobby> lobbies;
    private static LobbyStorage instance;

    private LobbyStorage() {
        lobbies = new HashMap<>();
    }
    
    public static synchronized LobbyStorage getInstance() {
        if (instance == null){
            instance = new LobbyStorage();
        }
        return instance;
    }

    public Map<String, Lobby> getLobbies() {
        return lobbies;
    }

    public void addLobby(Lobby lobby) {
        lobbies.put(lobby.getId(), lobby);
    }
}
