import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { observer, inject } from 'mobx-react';

class ChatScreen extends React.Component {
  componentDidMount = () => {
    this.props.chatStore.returnMessages()
  }

  send = (message) => {
    this.props.chatStore.sendMessage(message, this.props.userStore.user.email, this.props.navigation.state.params.receiver);
  }

render() {
    return (
        <GiftedChat
          messages={this.props.chatStore.getMessagesArray}
          user={this.props.userStore.user.email}
          onSend={(message) => this.send(message[0])}
        />
    );
  }
}


export default inject('chatStore', 'userStore')(observer(ChatScreen));
