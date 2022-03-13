package de.ljv.projectzws.storage;

import java.util.HashMap;
import java.util.Map;

import de.ljv.projectzws.model.Player;

public class PlayerStorage {

    private static Map<String, Player> players;
    private static PlayerStorage instance;

    private PlayerStorage() {
        players = new HashMap<>();
    }
    
    public static synchronized PlayerStorage getInstance() {
        if (instance == null){
            instance = new PlayerStorage();
        }
        return instance;
    }

    public Map<String, Player> getPlayers() {
        return players;
    }

    public void addPlayer(Player player) {
        players.put(player.getId(), player);
    }
}
