import React from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import * as Font from "expo-font";
import AuthenticationLoader from "./authentication-loader";
import Navigation from "../../shared/interfaces/Navigation";

export default class DependenciesLoader extends React.Component<Navigation> {
  state = {
    fontsLoaded: false
  };

  async componentWillMount() {
    await Font.loadAsync({
      "quicksand-regular": require("../../shared/assets/fonts/Quicksand-Regular.ttf"),
      "quicksand-bold": require("../../shared/assets/fonts/Quicksand-Bold.ttf")
    });
    this.setState({ fontsLoaded: true });
  }

  render() {
    if (!this.state.fontsLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    } else {
      return (
        <AuthenticationLoader
          navigation={this.props.navigation}
        ></AuthenticationLoader>
      );
    }
  }
}
