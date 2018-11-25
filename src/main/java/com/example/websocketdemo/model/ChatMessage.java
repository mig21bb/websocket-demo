/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.websocketdemo.model;

/**
 *
 * @author miguelangel.bunuales
 */
public class ChatMessage {
    private MessageType type;
    private String content;
    private String sender;

    public ChatMessage(MessageType type, String content, String sender) {
        this.type = type;
        this.content = content;
        this.sender = sender;
    }   

    public ChatMessage() {
        
    }
    

    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE,
        INVITATION
    }

    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }
}
