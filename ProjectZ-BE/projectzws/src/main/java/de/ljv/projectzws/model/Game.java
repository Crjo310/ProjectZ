package de.ljv.projectzws.model;

import java.util.List;

public class Game {

    private String lobbyId;
    private User admin;
    private List<Player> players;
    private Integer gameType; 
    private boolean buzzerEnabled;
    private String activeBuzzer;
    private String currentQuestion;
    private String currentAnswer;
    private boolean showAnswer;

    public String getLobbyId() {
        return lobbyId;
    }
    public void setLobbyId(String lobbyId) {
        this.lobbyId = lobbyId;
    }
    public User getAdmin() {
        return admin;
    }
    public void setAdmin(User admin) {
        this.admin = admin;
    }
    public List<Player> getPlayers() {
        return players;
    }
    public void setPlayers(List<Player> players) {
        this.players = players;
    }
    public Integer getGameType() {
        return gameType;
    }
    public void setGameType(Integer gameType) {
        this.gameType = gameType;
    }
    public boolean isBuzzerEnabled() {
        return buzzerEnabled;
    }
    public void setBuzzerEnabled(boolean buzzerEnabled) {
        this.buzzerEnabled = buzzerEnabled;
    }
    public String getActiveBuzzer() {
        return activeBuzzer;
    }
    public void setActiveBuzzer(String activeBuzzer) {
        this.activeBuzzer = activeBuzzer;
    }
    public String getCurrentQuestion() {
        return currentQuestion;
    }
    public void setCurrentQuestion(String currentQuestion) {
        this.currentQuestion = currentQuestion;
    }
    public String getCurrentAnswer() {
        return currentAnswer;
    }
    public void setCurrentAnswer(String currentAnswer) {
        this.currentAnswer = currentAnswer;
    }

    public boolean isShowAnswer() {
        return showAnswer;
    }
    public void setShowAnswer(boolean showAnswer) {
        this.showAnswer = showAnswer;
    }  
}
