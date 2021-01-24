import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import PageFooter from './PageFooter'

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu />
        {this.props.children}
        <PageFooter />
      </div>
    );
  }
}
