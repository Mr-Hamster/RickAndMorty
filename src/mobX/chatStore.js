import { observable, action, decorate, computed } from "mobx";
import socket from '../services/socket';
import { GiftedChat } from 'react-native-gifted-chat';
import userStore from './userStore';

class Chat {
  receiver = '';
  receiverPhoto = '';
  messages = [];
  uploadImage = '';
  cameraRollPhotos = [];
  uploadFile = {};

  addReceiver(name, photo) {
    this.cameraRollPhotos = [];
    this.uploadImage = '';
    this.uploadFile = {};
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

  getAllPhotos(photos) {
    this.cameraRollPhotos = photos;
  }

  setUploadImage(path) {
    console.log(path)
    this.uploadImage = path;
  }

  setUploadFile(file) {
    console.log(file)
    this.uploadFile = file;
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

    if (this.uploadFile) {
      message.text = message.text + ' ' + this.uploadFile.name;
    }

    socket.emit('message', { message, sender, receiver });
    this.uploadImage = '';
    this.cameraRollPhotos = [];
    this.uploadFile = {};
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
  cameraRollPhotos: observable,
  uploadFile: observable,

  addReceiver: action,
  sendMessage: action,
  returnMessages: action,
  setUploadImage: action,
  showModal: action,
  getAllPhotos: action,
  setUploadFile: action,

  getMessagesArray: computed
})

const chatStore = new Chat();
export default chatStore;

