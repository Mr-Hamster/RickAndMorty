import React from 'react';
import { Provider } from 'mobx-react';
import { Navigation } from './src/scenes/Router';
import charactersStore from './src/mobX/charactersStore';
import searchStore from './src/mobX/searchStore';
import userStore from './src/mobX/userStore';
import createStore from './src/mobX/createAccountStore';

const stores = {
  charactersStore, searchStore, userStore, createStore
};

class App extends React.PureComponent {
  render() {
    return (
      <Provider {...stores}>
        <Navigation />
      </Provider>
    );
  }
}

export default App;
