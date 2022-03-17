package de.ljv.projectzws.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.ljv.projectzws.model.User;
import de.ljv.projectzws.service.UserService;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("create")
    @CrossOrigin
    public User createLobby(@RequestBody UserRequestBody body) {
        System.out.println("User created");
        return userService.createUser(body.getName(),body.getAvatarId());
    }
    
}

class UserRequestBody {
    private String name;
    private String avatarId;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getAvatarId() {
        return avatarId;
    }
    public void setAvatarId(String avatarId) {
        this.avatarId = avatarId;
    }  

    
}