import React from "react";
import { SafeAreaView } from "react-navigation";
import Header from "../../shared/components/header/header";
import { AsyncStorage, Image } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView, { MapEvent, Marker } from "react-native-maps";
import WelcomeNotificationComponent from "../../shared/components/welcome/welcome";
interface Props {
  navigation: any;
}

export default class HomePage extends React.Component<Props> {
  state = {
    region: null,
    locationName: null,
    showWelcome: true,
    latitudeDelta: 0,
    longitudeDelta: 0,
    markers: []
  };

  private async getLocation() {
    const response: any = await Permissions.askAsync(Permissions.LOCATION);
    if (response.granted !== "granted" && response.granted) {
      return false;
    }

    var provider = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High
    });

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

    if (name.length > 0) {
      this.setState({
        locationName: name[0].city + "," + name[0].country
      });
    } else {
      this.setState({
        locationName: 'Define location'
      });
    }
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
        <Header
          locationName={this.state.locationName}
          navigation={this.props.navigation}
        ></Header>
        {this.showMap()}
        {this.showWelcomeMessage()}
      </SafeAreaView>
    );
  }

  showWelcomeMessage() {
    if (this.state.showWelcome) {
      return (
        <WelcomeNotificationComponent
          onClose={() => this.setState({ showWelcome: false })}
        ></WelcomeNotificationComponent>
      );
    }
  }

  showMap() {
    if (this.state.region !== null) {
      return (
        <MapView
          initialRegion={{
            latitude: this.state.region.coords.latitude,
            longitude: this.state.region.coords.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta
          }}
          rotateEnabled={false}
          style={{ flex: 1 }}
          onPress={(location: MapEvent) => this.onMapPress(location)}
        >
          {this.showMarkers()}
        </MapView>
      );
    } else {
      <MapView
        initialRegion={{
          latitude: 37.421998333333335,
          longitude: -122.08400000000002,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        rotateEnabled={false}
        style={{ flex: 1 }}
      ></MapView>;
    }
  }

  showMarkers() {
    return this.state.markers.map((marker, index) => {
      return (
        <Marker key={index} coordinate={marker.coordinate} onPress={() => this.onMarkerPress(marker.coordinate)}>
          <Image source={require('../../shared/assets/marker.png')} />
        </Marker>
      );
    });
  }

  onMapPress(location: MapEvent) {
    this.setState({
      markers: this.state.markers.concat({
        coordinate: {
          latitude: Number(location.nativeEvent.coordinate.latitude),
          longitude: Number(location.nativeEvent.coordinate.longitude)
        }
      })
    });
  }

  onMarkerPress(location) {
    console.log(location.latitude);
  }
}
