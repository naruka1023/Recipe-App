/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import { Picker } from 'react-native-picker-dropdown';

import HomeScreen from './screens/homeScreen'

import CreateNewScreen from './screens/createNewScreen'


const mobileClient = StackNavigator({
  HomeScreen: { 
    screen: HomeScreen ,
    navigationOptions: {
        title: 'Recipes',
    }
  },
  CreateNewScreen: { 
    screen: CreateNewScreen,
    navigationOptions: {
        title: 'Create new recipes',
    }
  },
});

AppRegistry.registerComponent('mobileClient', () => mobileClient);
