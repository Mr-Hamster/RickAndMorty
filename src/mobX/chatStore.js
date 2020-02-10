import { observable, action, decorate, computed } from "mobx";
import socket from '../services/socket';
import { GiftedChat } from 'react-native-gifted-chat';

class Chat {
  messages = [];

  returnMessages() {
    socket.on('messageReturn', (messageSocket) => {
      this.messages = GiftedChat.append(this.messages, messageSocket.message)
    })
  }

  sendMessage(message, sender, receiver) {
    socket.emit('message', { message, sender, receiver });
  }

  get getMessagesArray() {
    return this.messages;
  }
  
}

decorate(Chat, {
  messages: observable,
  sendMessage: action,
  getMessagesArray: computed,
  returnMessages: action
})

const chatStore = new Chat();
export default chatStore;

