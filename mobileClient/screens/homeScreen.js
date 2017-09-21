import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Animated,
  ListView,
  ActivityIndicator,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  Button
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import { Picker } from 'react-native-picker-dropdown';

var Accordion = require('react-native-accordion');

var tweenFunctions = require('tween-functions');

export default class HomeScreen extends React.Component {
    constructor(props){
      super(props);
      this.callWebService = this.callWebService.bind(this);
      this.state = {
        isLoading : true,
        amount: String
      };
    }
    componentDidMount(){
      this.setState({
        dataSource : new ListView.DataSource({
          rowHasChanged : (row1, row2) => row1 !== row2,
        })
      });
      this.callWebService('http://192.168.0.49:3000/api/recipe');
    }
    callWebService(givenUrl){
      return fetch(givenUrl,{
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
      })
        .then((response) =>  response.json()
        ).then((responseJson) => {
          var dataBlob = [];
          responseJson.forEach(function(recipe){
            dataBlob.push({
              createdBy : recipe.createdBy,
              createdOn : recipe.createdOn,
              ingredient :recipe.ingredient,
              recipeName : recipe.recipeName
            });
          });
          this.setState({
            dataSource : this.state.dataSource.cloneWithRows(dataBlob),
            isLoading : false
           });
        })
      }
      
      renderRow(section) {
        
        var header = (
          <View style={{
            flex:1,
            flexDirection: 'row', 
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'rgb(211,211,211)',
            padding: 10}}>
            <Text>{section.recipeName}</Text>
            <Text>Created by: {section.createdBy}</Text>
          </View>);

      var dataBlob = [];

      section.ingredient.forEach(function(ing){
        dataBlob.push({
          name:  ing.ingredientName,
          amount: ing.amount,
          unitOfMeasurement: ing.unitOfMeasurement
        });
      })
      
      var dataSourceIngredient = new ListView.DataSource({
        rowHasChanged : (row1, row2) => row1 !== row2,
      })

      dataSourceIngredient = dataSourceIngredient.cloneWithRows(dataBlob);


      var content = (
        <View style={{
          flex:1}}>
          <ListView
          dataSource={dataSourceIngredient}
          renderRow={(entities)=> 
        <View style={{
          flex:1,
          flexDirection: 'row', 
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'rgb(192,192,192)',
          padding: 10}}>
          <Text>{entities.name}</Text>
          <Text> x {entities.amount}</Text>
        </View>
      }
        />
        </View>);

      return (
        <Accordion 
          header={header}
          content={content}
          underlayColor='rgba(0,0,0,0.1)'
          easing= 'linear'
        />);
    }

    render() {
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, marginTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }
      const { navigate } = this.props.navigation;
      return ( 
        <View style={{
            flex:1,
            flexDirection: 'column'}}>
          <View style={{flex:10}}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
            />
          </View>
          <View style={{
            flex:1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            margin: 10
          }}>
            <TouchableNativeFeedback 
                background={TouchableNativeFeedback.SelectableBackground()} 
                onPress={() => {navigate('CreateNewScreen')}}>
          <Image
            style={styles.button}
            source={require('../pictures/add.png')}
          />
            </TouchableNativeFeedback>
          </View>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    button: {
      width: 50,
      height: 50
    },
    separator: {
      flex:1,
      height: StyleSheet.hairlineWidth,
      backgroundColor: '#8E8E8E'
    }
  });