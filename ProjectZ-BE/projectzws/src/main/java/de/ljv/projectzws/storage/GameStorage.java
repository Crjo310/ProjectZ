package de.ljv.projectzws.storage;

import java.util.HashMap;
import java.util.Map;

import de.ljv.projectzws.model.Game;

public class GameStorage {

    private static Map<String, Game> games;
    private static GameStorage instance;

    private GameStorage() {
        games = new HashMap<>();
    }
    
    public static synchronized GameStorage getInstance() {
        if (instance == null){
            instance = new GameStorage();
        }
        return instance;
    }

    public Map<String, Game> getGames() {
        return games;
    }

    public void addGame(Game game) {
        games.put(game.getLobbyId(), game);
    }
    
}
