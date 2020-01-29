import React from 'react';
import { Navigation } from './src/scenes/Router.js';
import { Provider } from 'mobx-react';
import charactersStores from './src/mobX/charactersStores.js';
import search from './src/mobX/searchStores.js';
import users from './src/mobX/usersStores.js';
import createStore from './src/mobX/createAccountStores.js';

const stores = {charactersStores, search, users, createStore};
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
