import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface Props {
  label: string;
  marginTop: number;
  callback: any;
}

export default class ButtonComponent extends React.Component<Props> {
  render() {
    return (
      <TouchableOpacity
        style={styles.signInButton}
        activeOpacity={0.9}
        onPress={() => this.props.callback()}
      >
        <Text style={styles.buttonText}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}
