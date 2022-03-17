package de.ljv.projectzws.service;

import org.springframework.stereotype.Service;

import de.ljv.projectzws.model.Game;
import de.ljv.projectzws.storage.GameStorage;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GameService {

    public Game getGame(String id) {
        return GameStorage.getInstance().getGames().get(id);
    }

}