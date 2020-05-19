import React from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import * as Font from "expo-font";
import AuthenticationLoader from "./authentication-loader";
import { Asset } from "expo-asset";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { connect } from "react-redux";
import { userLocation } from "../../shared/store/actions";
import { getLocation } from "../../shared/Helper";

interface Props {
  userLocation: any;
  navigation: any;
}

class DependenciesLoader extends React.Component<Props> {
  state = {
    imagesLoaded: false,
    locationLoaded: false
  };

  async componentWillMount() {
    await Asset.loadAsync([
      require("../../shared/assets/edit.png"),
      require("../../shared/assets/city.png"),
      require("../../shared/assets/marker_red.png"),
      require("../../shared/assets/fork.png"),
      require("../../shared/assets/video.png"),
      require("../../shared/assets/barbershop.png"),
      require("../../shared/assets/clinic.png"),
      require("../../shared/assets/coffee-cup.png"),
      require("../../shared/assets/beer.png"),
      require("../../shared/assets/upload.png"),
      require("../../shared/assets/close.png"),
      require("../../shared/assets/search.png"),
      require("../../shared/assets/compass.png"),
      require("../../shared/assets/left-arrow-grey.png"),
      require("../../shared/assets/approve.png"),
      require("../../shared/assets/google.png"),
      require("../../shared/assets/facebook.png"),
      require("../../shared/assets/upvote-green.png"),
      require("../../shared/assets/downvote-red.png"),
      require("../../shared/assets/upvote-grey.png"),
      require("../../shared/assets/upvote-green.png")
    ]);
    await Font.loadAsync({
      "quicksand-regular": require("../../shared/assets/fonts/Quicksand-Regular.ttf"),
      "quicksand-bold": require("../../shared/assets/fonts/Quicksand-Bold.ttf")
    });
    this.setState({ imagesLoaded: true });
  }

  async componentDidMount() {
    const location:any = await getLocation();
    this.props.userLocation(location.coordinates, location.name);
    this.setState({
      locationLoaded: true
    });
  }

  render() {
    if (!this.state.imagesLoaded || !this.state.locationLoaded) {
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

const mapStateToProps = store => ({
  location: store.userLocation.coordinates,
  name: store.userLocation.name
});

const mapDispatchToProps = dispatch => ({
  userLocation: (coordinates, name) => dispatch(userLocation(coordinates, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(DependenciesLoader);
