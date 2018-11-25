/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.websocketdemo.controller;

import com.example.websocketdemo.model.ChatMessage;
import com.example.websocketdemo.model.ChatMessage.MessageType;
import com.example.websocketdemo.model.UserModel;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author Miguel Ángel
 */
@Controller
public class LoginController {

    static UserModel user1 = new UserModel("mig", "x");
    static UserModel user2 = new UserModel("ang", "y");
    static UserModel user3 = new UserModel("third", "z");
    static UserModel user4 = new UserModel("forth", "w");
    static List<UserModel> usersList = new ArrayList<>();

    static void fillUsersList() {
        if (LoginController.usersList.size() < 1) {
            usersList.add(user1);
            usersList.add(user2);
            usersList.add(user3);
            usersList.add(user4);
        }
    }

    @Autowired
    ChatController chatController;

    @RequestMapping(value = "/login.htm", method = RequestMethod.POST)
    public String login(
            @RequestParam(value = "login", required = true) String login,
            @RequestParam(value = "pass", required = false) String pass,
            HttpSession session, Model model
    ) {
        String response = "index";
        fillUsersList();
        for (UserModel u : usersList) {
            if (u.getLogin().equals(login) && u.getPassword().equals(pass)) {
                ChatMessage joinMessage = new ChatMessage(MessageType.JOIN, login, login);
                session.setAttribute("user", login);
                model.addAttribute("user", login);
                model.addAttribute("users", usersList);
                //chatController.addUserInConversation(joinMessage, login, new HeaderAccessor);
                response = "usersList";
            }
        }

        return response;
    }

}
