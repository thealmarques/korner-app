import React from "react";
import { Text, View, TextInput } from "react-native";
import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const entireScreenWidth = Dimensions.get("window").width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

interface Props {
  label: string;
  placeholder: string;
  password: boolean;
  marginTop: string;
  callback: any;
}

export default class InputComponent extends React.Component<Props> {
  state = {
    behavior: "position",
  };
  render() {
    return (
      <View style={this.styles.marginTop}>
        <Text style={this.styles.label}>{this.props.label}</Text>
        <TextInput
          style={this.styles.input}
          secureTextEntry={this.props.password}
          placeholder={this.props.placeholder}
          placeholderTextColor={"#ADABAB"}
          onChangeText={(text) => this.props.callback(text)}
        ></TextInput>
      </View>
    );
  }
  
  styles = EStyleSheet.create({
    label: {
      color: "#6E6B6B",
      fontSize: "14rem",
      fontFamily: "quicksand-bold",
    },
    input: {
      marginTop: "5rem",
      paddingBottom: "2.5rem",
      borderBottomWidth: "1rem",
      borderBottomColor: "#ADABAB",
      width: "100%",
    },
    marginTop: {
      marginTop: this.props.marginTop
    }
  });
  
}