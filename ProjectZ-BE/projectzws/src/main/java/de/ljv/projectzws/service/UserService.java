package de.ljv.projectzws.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import de.ljv.projectzws.model.User;
import de.ljv.projectzws.storage.UserStorage;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
    
    public User createUser(String name, String avatarId) {
        User user = new User();
        String id = UUID.randomUUID().toString();
        user.setId(id);
        user.setName(name);
        user.setAvatarId(avatarId);
        UserStorage.getInstance().addUser(user);
        return user;
    }

    public User getUser(String id) {
        return UserStorage.getInstance().getUsers().get(id);
    }
}