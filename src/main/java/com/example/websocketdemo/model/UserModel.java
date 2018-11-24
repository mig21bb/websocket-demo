/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.websocketdemo.model;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Miguel Ángel
 */
public class UserModel {
    
    private String login;
    private String password;
    private List<String> topics = new ArrayList<>();

    public UserModel(String login, String password) {
        this.login = login;
        this.password = password;
    }   
    

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<String> getTopics() {
        return topics;
    }

    public void setTopics(List<String> topics) {
        this.topics = topics;
    }
    
    
    
}
