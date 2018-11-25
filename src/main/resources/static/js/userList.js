/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

var stompClient = null;
var username = null;



window.onload = function () {
    connectUser()
};

function connectUser() {

    username = document.querySelector('#name').value.trim();
    if (username) {


        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnectedSelfConversation, onError);
        
    }
}

function onConnectedSelfConversation() {
    // Subscribe to the self conversation and public conversation

    stompClient.subscribe('/topic/public', onMessageReceived);
    stompClient.subscribe('/topic/' + username, onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat.addUser/public",
            {},
            JSON.stringify({sender: username, type: 'JOIN'})
            )

}

function openChat(conversationId, user) {
    
    onConnectedConversation(conversationId);
    stompClient.send("/app/chat.addUser/"+user,
            {},
            JSON.stringify({sender: username, type: 'INVITATION',content:username+'quiere hablar contigo'})
            )

}

function connect(event) {
    //username// = document.querySelector('#name').value.trim();

    if (username) {
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}

function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat.addUser",
            {},
            JSON.stringify({sender: username, type: 'JOIN'})
            )

    connectingElement.classList.add('hidden');
}


function onError(error) {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}


function sendMessage(event) {
    var messageContent = messageInput.value.trim();

    if (messageContent && stompClient) {
        var chatMessage = {
            sender: username,
            content: messageInput.value,
            type: 'CHAT'
        };
        stompClient.send("/app/chat.sendMessage/", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    event.preventDefault();
}

function sendMessageOnConversation() {
    var messageContent = messageInputConv.value.trim();
    conversation = document.getElementById('conversationId').value.trim();
    if (messageContent && stompClient) {
        var chatMessage = {
            sender: username,
            content: messageInputConv.value,
            type: 'CHAT'
        };
        stompClient.send("/app/chat.sendMessage/" + conversation, {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    event.preventDefault();
}


function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);



    if (message.type === 'INVITATION') {
        var conversationsArea = document.getElementById("conversations");

        var chatElement = document.createElement('article');

        var textElement = document.createElement('p');
        var messageText = document.createTextNode(message.content);
        textElement.appendChild(messageText);
        chatElement.appendChild(textElement);

        conversationsArea.appendChild(chatElement);
        conversationsArea.scrollTop = conversationsArea.scrollHeight;

    } else if(message.type==='JOIN'){
        console.log(message.sender+"status");
        console.log(document.getElementById(message.sender+"status"));
        var connectionSignal = document.getElementById(message.sender+"status");
        connectionSignal.style.display="block";
    }


}


function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    var index = Math.abs(hash % colors.length);
    return colors[index];
}

function connectConversation(event) {
    username = document.querySelector('#name').value.trim();


    if (username) {
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnectedConversation, onError);
    }
    //event.preventDefault();
}

function onConnectedConversation(conversationId) {
    // Subscribe to the Public Topic
    
    stompClient.subscribe('/topic/' + conversationId, onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat.addUser/" + conversationId,
            {},
            JSON.stringify({sender: username, type: 'JOIN'})
            )

   
}



usernameForm.addEventListener('submit', connect, true)
messageForm.addEventListener('submit', sendMessage, true)
messageFormConversation.addEventListener('submit', sendMessageOnConversation, true);
