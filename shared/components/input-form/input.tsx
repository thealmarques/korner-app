import React from "react";
import * as Font from "expo-font";
import { styles } from "./styles";

import {
    Text,
    TextInput,
    View
  } from "react-native";

interface Props {
  label: string;
  placeholder: string;
  password: boolean;
  marginTop: number;
  callback: any;
}

export default class InputComponent extends React.Component<Props> {
  state = {
    fontsLoaded: false
  };
  
  async componentWillMount() {
    await Font.loadAsync({
      "quicksand-regular": require("../../assets/fonts/Quicksand-Regular.ttf"),
      "quicksand-bold": require("../../assets/fonts/Quicksand-Bold.ttf")
    });
    this.setState({ fontsLoaded: true });
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={{marginTop: this.props.marginTop}}>
          <Text style={styles.label}>
            {this.props.label}
          </Text>
          <TextInput style={styles.input} secureTextEntry={this.props.password} 
                     placeholder={this.props.placeholder} 
                     onChangeText={text => this.props.callback(text)}></TextInput>
        </View>
      );
    } else {
      return <Text>Loading... (change to a loading page)</Text>;
    }
  }

  onChangeText(text) {
    alert(text);
  }
}
