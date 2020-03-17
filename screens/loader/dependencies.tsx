import React from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import * as Font from "expo-font";
import AuthenticationLoader from "./authentication-loader";
import Navigation from "../../shared/interfaces/Navigation";
import { Asset } from "expo-asset";

export default class DependenciesLoader extends React.Component<Navigation> {
  state = {
    resourcesLoaded: false
  };

  async componentWillMount() {
    await Asset.loadAsync([
      require("../../shared/assets/edit.png"),
      require("../../shared/assets/city.png"),
      require("../../shared/assets/marker_red.png"),
      require('../../shared/assets/fork.png'),
      require('../../shared/assets/video.png'),
      require('../../shared/assets/barbershop.png'),
      require('../../shared/assets/clinic.png'),
      require('../../shared/assets/coffee-cup.png'),
      require('../../shared/assets/beer.png'),
      require('../../shared/assets/upload.png')
    ])
    await Font.loadAsync({
      "quicksand-regular": require("../../shared/assets/fonts/Quicksand-Regular.ttf"),
      "quicksand-bold": require("../../shared/assets/fonts/Quicksand-Bold.ttf")
    });
    this.setState({ resourcesLoaded: true });
  }

  render() {
    if (!this.state.resourcesLoaded) {
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
