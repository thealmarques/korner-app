import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import * as Font from "expo-font";

interface Props {
  label: string;
  marginTop: number;
  callback: any;
}

export default class ButtonComponent extends React.Component<Props> {
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
        <View style={{ marginTop: this.props.marginTop }}>
          <TouchableOpacity
            style={styles.signInButton}
            activeOpacity={0.9}
            onPress={() => this.props.callback()}
          >
            <Text style={styles.buttonText}>{this.props.label}</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return <Text>Loading... (change to a loading page)</Text>;
    }
  }
}
