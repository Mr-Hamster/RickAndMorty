import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { observer, inject } from 'mobx-react';

class ChatScreen extends React.Component {
  componentDidMount = () => {
    this.props.chatStore.returnMessages()
  }

  send = (message) => {
    this.props.chatStore.sendMessage(message);
  }

render() {
    return (
        <GiftedChat
          messages={this.props.chatStore.getMessagesArray}
          user={{
            _id: this.props.chatStore.name,
            name: this.props.chatStore.name,
            avatar: this.props.chatStore.photo
          }}
          onSend={(message) => this.send(message[0])}
        />
    );
  }
}


export default inject('chatStore', 'userStore')(observer(ChatScreen));
