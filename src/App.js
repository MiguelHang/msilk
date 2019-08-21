import React, { Component } from 'react';
import AppContainer from './appContainer/AppContainer';
import Header from './header/header';

class App extends Component {

  render() {
    return (
      <div>
        <Header/>
        <AppContainer/>
      </div>
    )
  }
}

export default App