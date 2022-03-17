package de.ljv.projectzws.storage;

import java.util.HashMap;
import java.util.Map;

import de.ljv.projectzws.model.User;

public class UserStorage {

    private static Map<String, User> users;
    private static UserStorage instance;

    private UserStorage() {
        users = new HashMap<>();
    }
    
    public static synchronized UserStorage getInstance() {
        if (instance == null){
            instance = new UserStorage();
        }
        return instance;
    }

    public Map<String, User> getUsers() {
        return users;
    }

    public void addUser(User user) {
        users.put(user.getId(), user);
    }
}
