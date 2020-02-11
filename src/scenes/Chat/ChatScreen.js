import React from 'react';
import { GiftedChat, Composer } from 'react-native-gifted-chat';
import { observer, inject } from 'mobx-react';
import { View, YellowBox, Image } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { Icon, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../../config/styles.js';

class ChatScreen extends React.Component {

  componentDidMount = () => {
    YellowBox.ignoreWarnings([
      '[mobx.array] Attempt'
      ]);
    this.props.chatStore.returnMessages()
  }

  choosePhotoFromGallery = () => {
    ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true
    }).then(image => {
        this.props.chatStore.setUploadImage(image.path);
    })
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
        type: [DocumentPicker.types.images],
      });
      console.log(
        res.uri,
        res.type,
        res.name,
        res.size
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('You cancelled file selection')
      } else {
        throw err;
      }
    }
  }

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
          onPress={() => this.choosePhotoFromGallery()}
        /> 
        <Button
          icon={
            <Icon name='add' color='#000' width={30}/>
          }
          type='clear'
          onPress={() => this.chooseFile()}
        /> 
      </View>
    }
    </View>
    )

render() {
  console.log(this.props.chatStore.uploadImage)
    return (
      <GiftedChat
        messages={this.props.chatStore.getMessagesArray}
        user={{
          _id: 'sender',
          name: 'sender',
          avatar: this.props.userStore.user.photo
        }}
        onSend={(message) => this.send(message[0])}
        renderUsernameOnMessage={true}
        renderComposer={this.renderComposer}
        showUserAvatar={true}
      />
    );
  }
}


export default inject('chatStore', 'userStore')(observer(ChatScreen));
