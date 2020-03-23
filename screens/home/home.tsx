import React from "react";
import { SafeAreaView } from "react-navigation";
import Header from "../../shared/components/header/header";
import { Image } from "react-native";
import MapView, { MapEvent, Marker, Region } from "react-native-maps";
import * as firebase from "firebase";
import "firebase/firestore";
import CreateEventComponent from "../../shared/components/new-event/create";
import { connect } from "react-redux";

interface Props {
  navigation: any;
  coordinates: any;
  locationName: any;
}

class HomePage extends React.Component<Props> {
  state = {
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

  componentWillMount() {
    this.fetchMarkers();
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <Header
          locationName={this.props.locationName}
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
    if (this.props.coordinates !== null) {
      return (
        <MapView
          initialRegion={{
            latitude: this.props.coordinates.latitude,
            longitude: this.props.coordinates.longitude,
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
  coordinates: store.userLocation.coordinates,
  locationName: store.userLocation.name
});

export default connect(mapStateToProps)(HomePage);