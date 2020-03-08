import React from "react";
import { View } from "react-native";
import DrawerTrigger from "../drawer/drawerTrigger";
import LocationComponent from "../location/location";
import { Text } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "./styles";

interface Props {
  navigation: any;
  locationName: string;
  command: any;
}

class Header extends React.Component<Props> {
  render() {
    return (
      <View style={styles.header}>
        <DrawerTrigger navigation={this.props.navigation}></DrawerTrigger>
        {this.getLocationName()}
        {this.getCommands()}
      </View>
    );
  }

  getLocationName() {
    if (this.props.locationName !== "") {
      return (
        <LocationComponent
          locationName={this.props.locationName}
          navigation={this.props.navigation}
        ></LocationComponent>
      );
    }
  }

  getCommands() {
    if (this.props.command) {
      return (
        <TouchableOpacity
          onPress={() => this.props.command.callback()}
        >
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.text}>
            {this.props.command.title}
          </Text>
        </TouchableOpacity>
      );
    }
  }
}

export default Header;
