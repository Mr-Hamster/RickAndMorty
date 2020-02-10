import React from 'react';
import { Platform } from 'react-native';
import { Provider } from 'mobx-react';
import { Navigation } from './src/scenes/Router';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import charactersStore from './src/mobX/charactersStore';
import searchStore from './src/mobX/searchStore';
import userStore from './src/mobX/userStore';
import createStore from './src/mobX/createAccountStore';
import chatStore from './src/mobX/chatStore';

const stores = {
  charactersStore, searchStore, userStore, createStore, chatStore
};

class App extends React.PureComponent {
  constructor() {
		super();
			PushNotificationIOS.addEventListener('register', this.onPushRegistered.bind(this));
			PushNotificationIOS.addEventListener('registrationError', this.onPushRegistrationFailed.bind(this));
			if (Platform.OS === 'ios') {
				PushNotificationIOS.checkPermissions((res, error) => {
					res ? console.log(res) ? error : console.log(error) : PushNotificationIOS.requestPermissions()
				})
			}
  }
	
	onPushRegistered(deviceToken) {
		console.log("Device Token Received", deviceToken);
	}

	onPushRegistrationFailed(error) {
		console.error(error);
	}
	
	componentWillUnmount() {
		PushNotificationIOS.removeEventListener('register', this.onPushRegistered.bind(this));
		PushNotificationIOS.removeEventListener('registrationError', this.onPushRegistrationFailed.bind(this));
	}

  render() {
    return (
      <Provider {...stores}>
        <Navigation />
      </Provider>
    );
  }
}

export default App;
