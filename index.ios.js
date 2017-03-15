import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, TextInput, Button, ScrollView, Switch, Alert, Image } from 'react-native';
import Text from 'react-native-text';

const styles = StyleSheet.create({
  app: {
    flex: 1,
    flexDirection: 'column'
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: '#BEB5C6',
    flex: 1
  },
  baner: {
    color: 'deepskyblue',
    fontWeight: 'bold',
    fontFamily: 'Arial Rounded MT Bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  switchContainer: {
    flex: 1,
    // marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  switchText: {
    fontFamily: 'Arial Rounded MT Bold',
    padding: 10,
  },
  switch: {
  },
  inputContainer: {
    flex: 1
  },
  input: {
    marginTop: 15,
    height: 100,
    fontFamily: 'Arial Rounded MT Bold',
    borderWidth: 1,
    padding: 5,
    fontSize: 20,
    backgroundColor: '#E8D7F4',
    borderWidth: 2,
    borderColor: '#756B7C',
    borderRadius: 8,
  },
  buttons: {
    flex: 1,
    // marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonsButton: {
    color: 'green',
    fontFamily: 'Arial Rounded MT Bold',
  },
  scrollView: {
    flex: 1
  },
  scrollViewText: {
    fontFamily: 'Arial Rounded MT Bold',
  },
});

class Body extends React.Component {
  constructor(props) {
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
  clearInput() {
    this.setState({ text: '' });
    this.setState({ binary: '' });
  }
  binaryToText() {
    const output = [];
    const formattedInput = this.state.text.split('');
    formattedInput.forEach((item) => output.push(item.charCodeAt(0).toString(2)));
    this.setState({ binary: output.join(' ') });
  }
  textToBinary() {
    const output = [];
    const validateRegex = /^[0-1\s]+$/;
    let formattedInput;
    if (!this.state.binary.match(validateRegex)) {
      Alert.alert(
        'Unsupoorted chars',
        'Please use only 0 1 and space', [
          { text: 'Ok', onPress: () => this.clearInput() },
        ]
      )
    } else {
      if (this.state.binary.match(/^[\S]+$/)) {
        const addedSpaces = this.state.binary.replace(/(.{7})/g, '$1 ');
        formattedInput = addedSpaces.split(' ');
      } else {
        formattedInput = this.state.binary.split(' ');
      }
      formattedInput.forEach((item) => output.push(String.fromCharCode(parseInt(item, 2))));
      console.log(output.join(''));
      this.setState({ text: output.join('') });
    }
  }
  handleTextChange(text) {
    if (this.state.textToBinary) {
      this.setState({ text: text });
    } else {
      this.setState({ binary: text });
    }
  }
  render() {
    const { textToBinary, text, binary } = this.state;
    return (
      <View style={styles.app}>
        <View style={styles.header}>
          <Image
            source={require('./assets/img/baner.png')}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: 'contain'              
            }}
          />
          {/*<Text style={styles.baner}>Convert Binary2Text</Text>*/}
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Binary to Text</Text>
          <Switch
            style={styles.switch}
            thumbTintColor= 'gray'
            tintColor= 'black'
            onValueChange={(value) => this.setState({ textToBinary: value })}
            value={textToBinary}
          />
          <Text style={styles.switchText}>Text to Binary</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            {...this.props}
            style={styles.input}
            placeholder='Write here!'
            onChangeText={text => this.handleTextChange(text)}
            value={textToBinary ? text : binary}
          />
        </View>
        {/* @see: https://facebook.github.io/react-native/docs/touchableopacity.html*/}
        <View style={styles.buttons}>
          <Button
            style={styles.buttonsButton}
            color= 'green'
            title='Clear'
            onPress={this.clearInput}
          />
          <Button
            style={styles.buttonsButton}
            title='Convert'
            onPress={textToBinary ? this.binaryToText : this.textToBinary}
          />
        </View>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.scrollViewText}>
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
      <View style={{flex: 1}}>
        <Body multiline={true} autoCorrect={false} />
      </View>
    );
  }
}

AppRegistry.registerComponent('TestApp', () => TestApp);