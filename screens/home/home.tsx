import React from "react";
import { SafeAreaView } from "react-navigation";
import Header from "../../shared/components/header/header";
import { Image } from "react-native";
import MapView, { MapEvent, Marker, Region } from "react-native-maps";
import "firebase/firestore";
import CreateEventComponent from "../../shared/components/create-marker/create";
import { connect } from "react-redux";
import { styles } from "./styles";
import { View, Text } from "native-base";
import {
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import * as Location from "expo-location";
import { userLocation } from "../../shared/store/actions";
import {
  getLocation
} from "../../shared/Helper";
import OpenModalComponent from "../../shared/components/open-modal/open-modal";
import { getMarkers } from "../../shared/api/api";

interface Props {
  navigation: any;
  coordinates: any;
  locationName: any;
  userLocation: any;
}

class HomePage extends React.Component<Props> {
  searchWaiting = null;
  state = {
    latitudeDelta: 0,
    longitudeDelta: 0,
    markers: [],
    showCreateEvent: false,
    clickedLocation: null,
    searchLocation: "",
    showChangeLocation: false,
    searchResult: [],
    showOpenModalComponent: null
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.navigation.state.params &&
      nextProps.navigation.state.params.event === "create"
    ) {
      this.setState({
        showCreateEvent: false,
        clickedLocation: null,
      });
      this.getMarkers();
    }
  }

  componentWillMount() {
    this.getMarkers();
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <Header
          locationName={this.props.locationName}
          navigation={this.props.navigation}
          command={undefined}
          changeLocation={() =>
            this.setState({
              showChangeLocation: !this.state.showChangeLocation,
            })
          }
        ></Header>
        {this.changeLocation()}
        {this.renderSearchResults()}
        {this.showMap()}
        {this.showCreateEvent()}
        {this.showOpenModalComponent()}
      </SafeAreaView>
    );
  }

  changeLocation() {
    if (this.state.showChangeLocation) {
      return (
        <View style={styles.changeLocationContainer}>
          <Image
            style={styles.searchIcon}
            source={require("../../shared/assets/search.png")}
          ></Image>
          <TextInput
            style={styles.searchBar}
            placeholderTextColor="white"
            onChangeText={(text) => {
              if (this.searchWaiting) clearTimeout(this.searchWaiting);
              this.searchWaiting = setTimeout(() => {
                this.searchWaiting = null;
                this.updateSearchResults(text.toLowerCase());
              }, 1000);
              this.setState({ searchLocation: text });
            }}
            value={this.state.searchLocation}
            placeholder="Search your location..."
          />
          <TouchableWithoutFeedback
            onPress={async () => {
              const location: any = await getLocation();
              this.props.userLocation(location.coordinates, location.name);
              this.setState({
                searchLocation: "",
                showChangeLocation: false,
                searchResult: [],
              });
            }}
          >
            <Image
              style={styles.compassIcon}
              source={require("../../shared/assets/compass.png")}
            ></Image>
          </TouchableWithoutFeedback>
        </View>
      );
    }
  }

  renderSearchResults() {
    if (this.state.searchLocation !== "") {
      return (
        <SafeAreaView style={styles.searchResults}>
          <FlatList
            data={this.state.searchResult}
            renderItem={({ item }) => {
              const name =
                item[0].street +
                " " +
                item[0].name +
                ", " +
                item[0].city +
                ", " +
                item[0].country;
              return (
                <TouchableWithoutFeedback
                  onPress={() => {
                    Location.geocodeAsync(name).then(
                      (value: Location.GeocodedLocation[]) => {
                        this.props.userLocation(
                          {
                            latitude: value[0].latitude,
                            longitude: value[0].longitude,
                          },
                          name
                        );
                        this.setState({
                          searchLocation: "",
                          showChangeLocation: false,
                          searchResult: [],
                        });
                      }
                    );
                  }}
                >
                  <View style={styles.item}>
                    <Text style={styles.title}>{name}</Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
            keyExtractor={(item, index) => {
              return "search-" + index;
            }}
          />
        </SafeAreaView>
      );
    }
  }

  updateSearchResults(text: string) {
    Location.geocodeAsync(text).then(async (result) => {
      const searchResult = [];
      for (let i = 0; i < result.length; i++) {
        const spot = result[i];
        const data = await Location.reverseGeocodeAsync({
          latitude: spot.latitude,
          longitude: spot.longitude,
        });
        searchResult.push(data);
      }
      this.setState({
        searchResult: searchResult,
      });
    });
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
    if (this.state.searchLocation === "") {
      return (
        <MapView
          region={{
            latitude: this.props.coordinates.latitude,
            longitude: this.props.coordinates.longitude,
            latitudeDelta: 0,
            longitudeDelta: 0,
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
    this.props.coordinates.latitude = location.nativeEvent.coordinate.latitude;
    this.props.coordinates.longitude = location.nativeEvent.coordinate.longitude;

    this.setState({
      showCreateEvent: true,
      clickedLocation: location.nativeEvent.coordinate,
    });
  }

  onMarkerPress(location: Coordinates) {
    this.props.coordinates.longitude = location.longitude;
    this.props.coordinates.latitude = location.latitude;
    this.setState({
      showOpenModalComponent: location
    })
  }

  showOpenModalComponent() {
    if (this.state.showOpenModalComponent) {
      return (
        <OpenModalComponent location={this.state.showOpenModalComponent} closeModal={() => this.setState({
          showOpenModalComponent: null
        })}></OpenModalComponent>
      )
    }
  }

  onRegionChange(region: Region) {
  }

  getMarkers() {
    const markers = [];
    getMarkers().then((data) => {
      data.docs.map((doc) => {
        markers.push({
          coordinate: {
            latitude: Number(doc.get("latitude")),
            longitude: Number(doc.get("longitude")),
          },
        });
      });
      this.setState({
        markers: this.state.markers.concat(markers),
      });
    });
  }
}

const mapStateToProps = (store) => ({
  coordinates: store.userLocation.coordinates,
  locationName: store.userLocation.name,
});

const mapDispatchToProps = (dispatch) => ({
  userLocation: (coordinates, name) =>
    dispatch(userLocation(coordinates, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
