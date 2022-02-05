import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Game } from './components/Game/Game';
import { Host } from './components/Forms/Host';
import { TestHand } from './components/Test/TestHand';
import { TestBoard } from './components/Test/TestBoard';

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
        <Route path='/testhand' component={TestHand} />
        <Route exact path='/testboard' component={TestBoard} />
        <Route path='/testboard/:size' component={TestBoard} />
      </Layout>
    );
  }
}
