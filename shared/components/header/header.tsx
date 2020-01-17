import React from "react";
import { View, StyleSheet } from "react-native";
import DrawerTrigger from "../drawer/drawerTrigger";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import LocationComponent from "../location/location";

interface Props {
  navigation: any;
  locationName: string;
}

class Header extends React.Component<Props> {
  render() {
    return (
      <View style={styles.header}>
        <DrawerTrigger navigation={this.props.navigation}></DrawerTrigger>
        <LocationComponent locationName={this.props.locationName} 
          navigation={this.props.navigation}></LocationComponent>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: hp("4%"),
    backgroundColor: "#f98514",
    height: hp("11%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default Header;
