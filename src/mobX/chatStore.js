import { observable, action, decorate, computed } from "mobx";
import socket from '../services/socket';
import { GiftedChat } from 'react-native-gifted-chat';
import userStore from './userStore';

class Chat {
  isModalVisible = false;
  receiver = '';
  receiverPhoto = '';
  messages = [];
  uploadImage = '';

  addReceiver(name, photo) {
    this.receiver = name;
    this.receiverPhoto = photo;
    this.messages = [
      {
        _id: 1,
        text: `Hello ${userStore.user.email}`,
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

  setUploadImage(path) {
    console.log(path)
    this.uploadImage = path;
    this.isModalVisible = false;
  }

  showModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  returnMessages() {
    socket.on('messageReturn', (messageSocket) => {
      this.messages = GiftedChat.append(this.messages, {
        _id: messageSocket.message._id,
        text: messageSocket.message.text,
        image: messageSocket.message.image,
        createdAt: messageSocket.message.createdAt,
        user: {
          _id: 'sender',
          name: 'sender',
          avatar: userStore.user.photo
        }
      })
    })
  }

  sendMessage(message) {
    const receiver = this.receiver;
    const sender = this.name;
    
    if (this.uploadImage) {
      message.image = this.uploadImage;
    }

    socket.emit('message', { message, sender, receiver });
    this.uploadImage = '';
  }

  get getMessagesArray() {
    return this.messages;
  }
  
}

decorate(Chat, {
  messages: observable,
  receiver: observable,
  isModalVisible: observable,
  uploadImage: observable,
  addReceiver: action,
  sendMessage: action,
  getMessagesArray: computed,
  returnMessages: action,
  setUploadImage: action,
  showModal: action
})

const chatStore = new Chat();
export default chatStore;

