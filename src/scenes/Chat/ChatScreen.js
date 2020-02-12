import React from 'react';
import { GiftedChat, Composer } from 'react-native-gifted-chat';
import { observer, inject } from 'mobx-react';
import { View, YellowBox, Image } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import DocumentPicker from 'react-native-document-picker';
import { Icon, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../../config/styles.js';
import ChatFooter from '../../components/ChatFooter';

class ChatScreen extends React.Component {

  componentDidMount = () => {
    YellowBox.ignoreWarnings([
      '[mobx.array] Attempt'
      ]);
    this.props.chatStore.returnMessages()
  }

  choosePhotoFromCamera = () => {
      ImagePicker.openCamera({
          width: 300,
          height: 300,
          cropping: true
      }).then(image => {
          this.props.chatStore.setUploadImage(image.path);
      })
  }

  async chooseFile() {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      this.props.chatStore.setUploadFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('You cancelled file selection')
      } else {
        throw err;
      }
    }
  }

  showAllPhotos = () => {
    CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
      })
      .then(r => {
        this.props.chatStore.getAllPhotos(r.edges);
      })
      .catch((err) => {
         console.log(err)
      }
    );
  };

  send = (message) => {
    this.props.chatStore.sendMessage(message);
  }

  renderComposer = (props) => (
    <View style={props.text.length > 0 ? {flexDirection: 'row', width: '85%'} : {flexDirection: 'row'}}>
      <Composer {...props} />
      {this.props.chatStore.uploadImage ?
        <Image 
          source={{uri: this.props.chatStore.uploadImage}} 
          style={styles.chatImage} 
        /> : null }
      { props.text.length > 0 ? null :
      <View style={{flexDirection: 'row'}}>
        <Button
          icon={
            <Icon name='camera' color='#000' width={30}/>
          }
          type='clear'
          onPress={() => this.choosePhotoFromCamera()}
        /> 
        <Button 
          icon={
            <Icon name='photo' color='#000' width={30}/>
          } 
          type='clear'
          onPress={this.showAllPhotos}
        /> 
        <Button
          icon={ Object.entries(this.props.chatStore.uploadFile).length === 0 ? 
            <Icon name='add' color='#000' width={30}/> :
            <Icon name='check' color='#000' width={30}/>
          }
          type='clear'
          onPress={() => this.chooseFile()}
        /> 
      </View>
    }
    </View>
  )

  renderFooter = () => (
    <ChatFooter {...this.props} />
  )


render() {
  console.log('Photo: ', this.props.chatStore.uploadImage);
  const { getMessagesArray } = this.props.chatStore;
    return (
      <GiftedChat
        messages={getMessagesArray}
        user={{
          _id: 'sender',
          name: 'sender',
          avatar: this.props.userStore.user.photo
        }}
        onSend={(message) => this.send(message[0])}
        renderUsernameOnMessage={true}
        renderComposer={this.renderComposer}
        renderFooter={this.renderFooter}
        showUserAvatar={true}
      />
    );
  }
}


export default inject('chatStore', 'userStore')(observer(ChatScreen));
