import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Animated,
  Text,
  TextInput,
  Alert,
  View,
  ScrollView,
  Button
} from 'react-native';

import { Picker } from 'react-native-picker-dropdown';

import IngredientEntity from '../entities/ingredientEntity'

import {
    StackNavigator,
  } from 'react-navigation';  

  var index = 0;

  export default class CreateNewScreen extends React.Component {
    constructor(props){
      super(props);
      // this.callWebService = this.callWebService.bind(this);
      this.state = {
        iterator: [],
        recipeName: '',
        price: '0',
        ingredients: []
      };
    }
    
    isNumber(num){
        return /^\d+$/.test(num);
    };
    
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    };
    
    validateInput(){
        if(this.state.recipeName != '' && this.state.price != 0){
            if(this.state.ingredients.length != 0){
                if(this.isNumber(this.state.price)){
                    this.state.ingredients.forEach((ingredient) =>{
                        if(ingredient.name != '' && ingredient.amount != 0){
                            if(this.isNumber(ingredient.amount)){
                                this.postRecipe();
                            }else{
                                Alert.alert("Error","Amount is not a number");
                            }
                        }else{
                            Alert.alert("Error","Please fill in everything");
                        }
                    });
                }else{
                    Alert.alert("Error","Price is not a number");
                }
            }else{
                Alert.alert("Error","At least 1 ingredient is required");
            }
        }else{
            
            Alert.alert("Error","Please include the recipe \nname and/or price");
        }
    }
    
    addIngredientButton(){
        this.state.iterator.push(index++);
        this.setState({
            iterator: this.state.iterator
        })
    }
    componentDidMount(){
        this.addIngredientButton();
    }
    
    postRecipe(){
        fetch('http://192.168.0.49:3000/api/recipe', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipeName: this.state.recipeName,
                price: this.state.price,
                createdBy: "anonymous",
                ingredient: this.state.ingredients
            })
        }).then(() =>{
            Alert.alert("Success", "Your recipe has been posted!");
        }).catch((error) => {
            Alert.alert("Error", "Oops, there seems to be \nproblems within the server." + error);
        });
    }
    
    render() {
        let entities = this.state.iterator.map((r,i) => {
            return <IngredientEntity key={r} index={r} newScreen={this}/>
        })
        
        return (
            <View style = {styles.container}>
          <View style = {styles.headerContainer}>
            <Text style={{fontSize:15}}>Recipe name: </Text>
              <TextInput 
                  style={{
                      height: 40, 
                      width:100, 
                      borderColor: 'gray', 
                      borderWidth: 1
                  }}
                  autoCapitalize= "words"
                  onChangeText={(text) => this.setState({recipeName : text})}
                  value={this.state.recipeName}/>
              <Text style={{fontSize:15}}>  Price: </Text>
              <TextInput 
                  style={{
                      height: 40, 
                      width:50, 
                      borderColor: 'gray', 
                      borderWidth: 1
                  }}
                  keyboardType='numeric'
                  autoCapitalize= "words"
                  onChangeText={(text2) => this.setState({price : text2})}
                  value={this.state.price}/>
          </View>
          
          <View style = {styles.scrollViewContainer}>
            <ScrollView>
           { entities }
            </ScrollView>
          </View>
          <View style={styles.footerContainer}>
            <View style={{
                  flex:1,
                  flexDirection: "column",
                  paddingRight:5,
                  justifyContent:"flex-end"}}>
            <Button 
              title="Add new ingredient"
              onPress={() => this.addIngredientButton()}/>
            </View>
            <View style={{
                  flex:1,
                  flexDirection: "column",
                  paddingLeft:5, 
                  justifyContent:"flex-end"}}>
            <Button 
              title="Post new recipe"
              onPress={() => this.validateInput()}/>
            </View>
          </View>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection: 'column',
      marginHorizontal: 10
    },
    scrollViewContainer: {
      flex:10,
      flexDirection: 'column'
    },
    ingredientContainer: {
      height:130,
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginVertical:10,
      padding:15,
      borderRadius: 10,
      backgroundColor: 'rgba(128,128,128, 0.2)'
    },
    headerContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: 'space-around',
      alignItems: 'center',
      padding:15,
      borderBottomColor: 'grey',
      borderBottomWidth:3
    },
    footerContainer: {
      flex:1,
      flexDirection: "row",
      paddingBottom:10,
      alignItems:"flex-end"
    },
    firstRow: {
      flexDirection: 'row', 
      alignItems: 'center',
      marginBottom: 20
    },
    secondRow:{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'space-around'
    }
  });