import React from 'react';
import { client } from './src/services/client.js';
import { ApolloProvider } from 'react-apollo';
import { Navigation } from './src/scenes/Router.js';

class App extends React.Component{
  render() {
    return(
      <ApolloProvider client={client}>
        <Navigation/>
      </ApolloProvider>
    );
  }
}

export default App;
