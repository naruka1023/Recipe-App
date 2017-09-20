import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  Alert,
  LayoutAnimation,
  Animated,
  TouchableNativeFeedback,
  View,
  Button
} from 'react-native';

import { Picker } from 'react-native-picker-dropdown';

export default class IngredientEntity extends Component {
    constructor(props){
      super(props);
      // this.callWebService = this.callWebService.bind(this);
      this.state = {
        text: String,
      }
    }
    
    
    componentDidMount(){
      
      this.ingredientsBank = this.props.newScreen.state.ingredients;
      this.ingredientsBank.push({
        key: this.props.index,
        ingredientName: '',
        amount: 0,
        unitOfMeasurement: 'kg'
      });
      this.props.newScreen.setState({
        ingredients : this.ingredientsBank
      })
      this.ingredientIndex = this.ingredientsBank.findIndex((element) => {
        return element.key == this.props.index
     });
    }
  
    removeEntity(){
      var index = this.props.newScreen.state.iterator.findIndex((element) => {
        return element == this.props.index
      });
      var tmpArr = this.props.newScreen.state.iterator;
      tmpArr.splice(index, 1);
      this.ingredientsBank.splice(index,1);
      this.props.newScreen.setState({
        iterator: tmpArr,
        ingredients: this.ingredientsBank
      });
    }
    updateValue(text, label){
     switch(label){
       case 'ingredient':
       {
         this.ingredientsBank[this.ingredientIndex].ingredientName = text;
         this.setState({text : text});
       }
       break;
       case 'amount':
       {
        this.ingredientsBank[this.ingredientIndex].amount = text;
        this.setState({text2 : text});
       }
       break;
       case 'unitOfMeasurement':
       {
        this.ingredientsBank[this.ingredientIndex].unitOfMeasurement = text;
        this.setState({text3 : text});
       }
       break;
      };
     this.props.newScreen.setState({
       ingredients : this.props.newScreen.state.ingredients
      });
    }
    render() {
      return (
      <View key = {this.props.index} style={styles.ingredientContainer}>
        <View style={styles.firstRow}>
              <Text style={{fontSize:15}}>Ingredient: </Text>
              <TextInput 
                  style={{
                      height: 40, 
                      width:100, 
                      borderColor: 'gray', 
                      borderWidth: 1
                  }}
                  autoCapitalize= "words"
                  onChangeText={(text) => this.updateValue(text, 'ingredient')}
                  value={this.state.text}/>
              <Text style={{fontSize:15}}>  Amount: </Text>
              <TextInput 
                  style={{
                      height: 40, 
                      width:50, 
                      borderColor: 'gray', 
                      borderWidth: 1
                  }}
                  keyboardType='numeric'
                  autoCapitalize= "words"
                  onChangeText={(text2) => this.updateValue(text2, 'amount')}
                  value={this.state.text2}/>
      </View>
      <View 
        style={styles.secondRow}>
          <View style ={{flex:3, flexDirection: 'row'}}>
          <Text style={{fontSize:15}}>Unit of {"\n"}Measurement: </Text>
              <Picker
                selectedValue={this.state.text3}
                onValueChange={(text3) => this.updateValue(text3, 'unitOfMeasurement')}
                mode="dropdown"
                style={{
                alignSelf: 'stretch',
                color: 'black',
                width:120
              }}
            >
              <Picker.Item label="Kilogram" value="ks" />
              <Picker.Item label="Teaspoon" value="tsp" />
              <Picker.Item label="Ounces" value="oz" />
              <Picker.Item label="Gram" value="g" />
            </Picker>
          </View>
           
          <View style={{flex:1, flexDirection: "column", marginTop: 5}}>
          <Button style={{width: 30 }}
                      title="Delete"
                      color='#FF0000'
                      onPress={() => this.removeEntity()}/>
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