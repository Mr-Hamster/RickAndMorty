import React from 'react';
import { Navigation } from './src/scenes/Router.js';
import { Provider } from 'mobx-react';
import charactersStores from './src/mobX/charactersStores.js';

const stores = {charactersStores};
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
