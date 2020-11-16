import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Game } from './components/Game';
import { Host } from './components/Host';
import { Register } from './components/Register';
import { TestHand } from './components/TestHand';
import { TestBoard } from './components/TestBoard';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/Home' component={Home} />
        <Route exact path='/game' component={Game} />
        <Route path='/game/:id' component={Game} />
        <Route path='/host' component={Host} />
        <Route path='/register' component={Register} />
        <Route path='/testhand' component={TestHand} />
        <Route path='/testboard' component={TestBoard} />
      </Layout>
    );
  }
}
