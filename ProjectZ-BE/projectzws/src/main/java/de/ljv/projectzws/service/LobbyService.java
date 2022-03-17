package de.ljv.projectzws.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.ljv.projectzws.model.Game;
import de.ljv.projectzws.model.Lobby;
import de.ljv.projectzws.model.Player;
import de.ljv.projectzws.model.User;
import de.ljv.projectzws.storage.GameStorage;
import de.ljv.projectzws.storage.LobbyStorage;
import de.ljv.projectzws.storage.UserStorage;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LobbyService {

    @Autowired
    UserService userService;
    
    public Lobby createLobby(String lobbyName, Integer maxPlayer, String adminId, Integer gameType) {
        Lobby lobby = new Lobby();
        String id = UUID.randomUUID().toString();
        lobby.setId(id);
        lobby.setName(lobbyName);
        lobby.setAdmin(UserStorage.getInstance().getUsers().get(adminId));
        lobby.setMaxPlayer(maxPlayer);
        lobby.setPlayers(new ArrayList<User>());
        lobby.setGameType(gameType);
        lobby.setStarted(false);
        LobbyStorage.getInstance().addLobby(lobby);
        return lobby;
    }

    public Lobby[] getOpenLobbies() {
        Map<String, Lobby> sourceMap = LobbyStorage.getInstance().getLobbies();
        Collection<Lobby> values = sourceMap.values().stream().filter(lobby -> lobby.getStarted() == false).collect(Collectors.toList());
        return values.toArray(new Lobby[0]);
    }

    public Lobby getLobby(String id) {
        return LobbyStorage.getInstance().getLobbies().get(id);
    }

    public Lobby addPlayer(String lobbyId, String playerId) throws Exception {
        Lobby lobby = this.getLobby(lobbyId);
        User user = userService.getUser(playerId);
        if (lobby.getPlayers().size() >= lobby.getMaxPlayer()){
            throw new Exception("Lobby is full");
        }
        lobby.getPlayers().add(user);
        return lobby;
    }

    public Lobby startGame(String lobbyId) {
        Lobby lobby = this.getLobby(lobbyId);
        lobby.setStarted(true);
        this.createGame(lobbyId);
        return lobby;
    }

    public Game createGame(String lobbyId) {
        Game game = new Game();
        Lobby lobby = this.getLobby(lobbyId);
        game.setLobbyId(lobbyId);
        game.setAdmin(UserStorage.getInstance().getUsers().get(lobby.getAdmin().getId()));
        game.setPlayers(new ArrayList<Player>());
        game.setGameType(lobby.getGameType());
        lobby.getPlayers().forEach((user) -> {
            Player player = new Player();
            player.setUser(user);
            player.setPoints(0);
            player.setAnswer("");
            game.getPlayers().add(player);
        });
        game.setBuzzerEnabled(false);
        game.setActiveBuzzer("");
        game.setCurrentQuestion("");
        game.setCurrentAnswer("");
        game.setShowAnswer(false);
        GameStorage.getInstance().addGame(game);
        return game;
    }
}
