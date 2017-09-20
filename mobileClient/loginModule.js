/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  ActivityIndicator,
  Text,
  View
} from 'react-native';

export default class loginModule extends Component {
  constructor(props){
    super(props);
    this.callWebService = this.callWebService.bind(this);
    this.state = {
      validUsername : false,
      validPassword : false,
      
    };
    
  }
  render(){

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  separator: {
    flex:1,

    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

modules.export = loginModule;