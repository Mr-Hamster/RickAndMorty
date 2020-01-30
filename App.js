import React from 'react';
import { Navigation } from './src/scenes/Router.js';
import { Provider } from 'mobx-react';
import charactersStore from './src/mobX/charactersStore.js';
import searchStore from './src/mobX/searchStore.js';
import userStore from './src/mobX/userStore.js';
import createStore from './src/mobX/createAccountStore.js';

const stores = {charactersStore, searchStore, userStore, createStore};
class App extends React.Component{
  render() {
    return(
      <Provider {...stores}>
        <Navigation/>
      </Provider>
    );
  }
}

export default App;
