import React from 'react';
import { Navigation } from './src/scenes/Router.js';
import { Provider } from 'mobx-react';
import charactersStores from './src/mobX/charactersStores.js';
import search from './src/mobX/searchStores.js';
import users from './src/mobX/usersStores.js';

const stores = {charactersStores, search, users};
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
