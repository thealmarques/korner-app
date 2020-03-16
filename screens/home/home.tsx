import React from "react";
import { SafeAreaView } from "react-navigation";
import Header from "../../shared/components/header/header";
import { AsyncStorage, Image } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView, { MapEvent, Marker, Region } from "react-native-maps";
import * as firebase from "firebase";
import "firebase/firestore";
import CreateEventComponent from "../../shared/components/new-event/create";
import { connect } from 'react-redux';
import { saveLocation } from '../../shared/store/actions'

interface Props {
  navigation: any;
  saveLocation: any;
  location: any;
}

class HomePage extends React.Component<Props> {
  state = {
    region: null,
    locationName: null,
    latitudeDelta: 0,
    longitudeDelta: 0,
    markers: [],
    showCreateEvent: false,
    clickedLocation: null
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.navigation.state.params 
          && nextProps.navigation.state.params.event === "create") {
      this.setState({
        showCreateEvent: false,
        clickedLocation: null
      });
      this.fetchMarkers();
    }
  }

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
    const location = JSON.parse(await AsyncStorage.getItem("LOCATION"));
    return location;
  }

  private async setMap(region: Location.LocationData) {
    this.setState({
      region: region
    });

    const name = await Location.reverseGeocodeAsync({
      latitude: region.coords.latitude,
      longitude: region.coords.longitude
    });
    this.props.saveLocation(name);
    if (name.length > 0) {
      if (name[0].city === null) {
        this.setState({
          locationName: name[0].street + "," + name[0].country
        });
      } else {
        this.setState({
          locationName: name[0].city + "," + name[0].country
        });
      }
    } else {
      this.setState({
        locationName: "Define location"
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
    this.fetchMarkers();
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <Header
          locationName={this.state.locationName}
          navigation={this.props.navigation}
          command={undefined}
        ></Header>
        {this.showMap()}
        {this.showCreateEvent()}
      </SafeAreaView>
    );
  }

  showCreateEvent() {
    if (this.state.showCreateEvent) {
      return (
        <CreateEventComponent
          onPress={() => console.log("Pressed")}
          onClose={() => this.setState({ showCreateEvent: false })}
          navigation={this.props.navigation}
          location={this.state.clickedLocation}
        ></CreateEventComponent>
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
          onRegionChangeComplete={(region: Region) =>
            this.onRegionChange(region)
          }
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
        <Marker
          key={index}
          coordinate={marker.coordinate}
          onPress={() => this.onMarkerPress(marker.coordinate)}
        >
          <Image source={require("../../shared/assets/marker_red.png")} />
        </Marker>
      );
    });
  }

  onMapPress(location: MapEvent) {
    this.setState({
      showCreateEvent: true,
      clickedLocation: location.nativeEvent.coordinate
    });
  }

  onMarkerPress(location) {}

  onRegionChange(region: Region) {}

  async fetchMarkers() {
    var database = await firebase.firestore();
    const markers = [];
    const ref = database
      .collection("suggestions")
      .get()
      .then(data => {
        data.docs.map(doc => {
          markers.push({
            coordinate: {
              latitude: Number(doc.get("latitude")),
              longitude: Number(doc.get("longitude"))
            }
          });
        });
        this.setState({
          markers: this.state.markers.concat(markers)
        });
      });
  }
}

const mapStateToProps = store => ({
  location: store.saveLocation.location
});
const mapDispatchToProps = dispatch => ({
  saveLocation: (location) => dispatch(saveLocation(location))
});

export default connect(mapStateToProps, mapDispatchToProps) (HomePage);