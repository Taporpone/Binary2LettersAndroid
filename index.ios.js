import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, TextInput, Button, ScrollView, Switch, Alert } from 'react-native';
import Text from 'react-native-text';

const styles = StyleSheet.create({
  welcome: {
    color: 'deepskyblue',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30
  },
  default: {
    padding: 10,
  },
  input: {
    marginTop: 30,
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    fontSize: 20
  },
  buttons: {
    marginTop:30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    color: 'green',
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

class Welcome extends React.Component {
  render(){
    return(
      <View>
        <Text style={styles.welcome}>Convert Binary2Text</Text>
      </View>
    );
  }
}

class Body extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      binary: '',
      textToBinary: true,
    };
    this.clearInput = this.clearInput.bind(this);
    this.binaryToText = this.binaryToText.bind(this);
    this.textToBinary = this.textToBinary.bind(this);
  }
  clearInput(){
    this.setState({text:''});
    this.setState({binary:''});
  }
  binaryToText(){
    const output = [];
    const formattedInput = this.state.text.split('');
    formattedInput.forEach((item) => output.push(item.charCodeAt(0).toString(2)));
    this.setState({binary: output.join(' ')});
  }
  textToBinary(){
    const output = [];
    const validateRegex = /^[0-1\s]+$/;
    let formattedInput;
    if (!this.state.binary.match(validateRegex)){
      Alert.alert(
        'Unsupoorted chars',
        'Please use only 0 1 and space',[
          {text: 'Ok', onPress: () => this.clearInput()},
        ]
      )
    }else{
      if (this.state.binary.match(/^[\S]+$/)){
        const addedSpaces = this.state.binary.replace(/(.{7})/g,'$1 ');
        formattedInput = addedSpaces.split(' ');
      }else{
        formattedInput = this.state.binary.split(' ');
      }
      formattedInput.forEach((item) => output.push(String.fromCharCode(parseInt(item,2))));
      console.log(output.join(''));
      this.setState({text: output.join('')});
    }
  }

  handleTextChange(text) {
    const trimmedText = text.trim();
    if (this.state.textToBinary){
      this.setState({text: trimmedText});
    }else{
      this.setState({binary: trimmedText});
    }
  }

  render(){
    const { textToBinary, text, binary} = this.state;
    return (
      <View style={styles.default}>
        <View style={styles.switch}>
          <Text>Binary to Text</Text>
          <Switch
            onValueChange={(value) => this.setState({textToBinary:value})}
            value={textToBinary}
          />
          <Text>Text to Binary</Text>
        </View>
        <TextInput
          {...this.props}
          style={styles.input}
          placeholder = 'Write here!'
          onChangeText = { text => this.handleTextChange(text) }
          value = {textToBinary ? text : binary}
        />
        <View style={styles.buttons}>
          <Button
            style = {{color:'green'}}
            title = 'Clear'
            onPress = {this.clearInput} 
          />
          <Button
            title = 'Convert'
            onPress = {textToBinary ? this.binaryToText : this.textToBinary }
          />
        </View>
        <ScrollView>
          <Text style={styles.default}>
            {textToBinary ? binary : text}
          </Text>
        </ScrollView>
      </View>
    );
  }
}

export default class TestApp extends Component {
  render() {
    return (
      <View>
        <Welcome />
        <Body multiline = {true} autoCorrect = {false}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('TestApp', () => TestApp);