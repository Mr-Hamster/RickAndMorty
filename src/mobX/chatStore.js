import { observable, action, decorate, computed } from "mobx";
import socket from '../services/socket';
import { GiftedChat } from 'react-native-gifted-chat';
import userStore from './userStore'

class Chat {
  receiver = '';
  receiverPhoto = '';
  messages = [];
  name = userStore.user.email;
  photo =userStore.user.photo;

  addReceiver(name, photo) {
    this.receiver = name;
    this.receiverPhoto = photo;
    this.messages = [
      {
        _id: 1,
        text: `Hello ${this.name}`,
        createdAt: new Date(),
        user: {
          _id: this.receiver,
          name: this.receiver,
          avatar: this.receiverPhoto
        }
      }
    ];
    socket.off('messageReturn');
  }

  returnMessages() {
    socket.on('messageReturn', (messageSocket) => {
      console.log(messageSocket)
      this.messages = GiftedChat.append(this.messages, {
        _id: messageSocket.message._id,
        text: messageSocket.message.text,
        createdAt: messageSocket.message.createdAt,
        user: {
          _id: this.name,
          name: this.name,
          avatar: this.photo
        }
      })
    })
  }

  sendMessage(message) {
    const receiver = this.receiver;
    const sender = this.name;
    socket.emit('message', { message, sender, receiver });
  }

  get getMessagesArray() {
    return this.messages;
  }
  
}

decorate(Chat, {
  messages: observable,
  receiver: observable,
  addReceiver: action,
  sendMessage: action,
  getMessagesArray: computed,
  returnMessages: action
})

const chatStore = new Chat();
export default chatStore;

