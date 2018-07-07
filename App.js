

import React, { Component } from 'react';
import MainPage from './js/page/MainPage';

export default class ecfoApp extends Component {
  render() {
      return (
          <MainPage navigator={this.props.navigator}/>
      );
  }
}
