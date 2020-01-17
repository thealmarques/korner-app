import React from "react";
import { SafeAreaView } from "react-navigation";
import Header from "../../shared/components/header/header";
import {
  AsyncStorage
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView from 'react-native-maps';

interface Props {
  navigation: any;
}

export default class HomePage extends React.Component<Props> {  
  state = {
    region: null,
    locationName: null
  }
  
  private async getLocation() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      return false;
    }

    var provider = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High});
    
    this.setMap(provider);

    await this.storeLocation(provider);
    return true;
  }

  private async storeLocation(location) {
    await AsyncStorage.setItem("LOCATION", JSON.stringify(location));
  }

  private async readLocation() {
    return JSON.parse(await AsyncStorage.getItem("LOCATION"));
  }

  private async setMap(region: Location.LocationData) {
    this.setState({
      region: region
    });

    const name = await Location.reverseGeocodeAsync({
      latitude: region.coords.latitude,
      longitude: region.coords.longitude
    });
    this.setState({
      locationName: name[0].city + ',' + name[0].country
    })
  }

  async componentWillMount() {
    AsyncStorage.removeItem("LOCATION");
    const location = await this.readLocation();
    if (location !== null) {
      this.setMap(location);
    } else {
      await this.getLocation();
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <Header locationName={this.state.locationName} navigation={this.props.navigation}></Header>
        {this.showMap()}
      </SafeAreaView>
    );
  }

  showMap() {
    if (this.state.region !== null) {
    return (
        <MapView
          region={{
            latitude: this.state.region.coords.latitude,
            longitude: this.state.region.coords.longitude,
            latitudeDelta: 0.194,
            longitudeDelta: 0.095,
          }}
          rotateEnabled={false}
          style={{flex: 1}}
        ></MapView>
    );
    } else {
      <MapView
          region={{
            latitude: 37.421998333333335,
            longitude: -122.08400000000002,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          rotateEnabled={false}
          style={{flex: 1}}
        ></MapView>
    }
  }
}
