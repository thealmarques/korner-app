import React from "react";

import { Image, TouchableOpacity, View, Text } from "react-native";
import { styles } from "./styles";

interface Props {
  navigation: any;
  locationName: string;
}

export default class LocationComponent extends React.Component<Props> {
  render() {
    if (this.props.locationName !== null && this.props.locationName !== "") {
      return (
        <View>
          <TouchableOpacity
            style={styles.container}
            onPress={() => alert("To navigate in the future")}
          >
            <Image
              style={styles.stretch}
              source={require("../../assets/edit.png")}
            ></Image>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.text}>
              {this.props.locationName}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }
}
