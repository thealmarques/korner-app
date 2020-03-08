import React from "react";
import { styles } from "./styles";
import { View, Text, Image } from "react-native";
import { Icon } from "native-base";
import { TouchableHighlight, TouchableWithoutFeedback } from "react-native-gesture-handler";

interface Props {
  onPress: any;
  onClose: any;
  navigation: any;
  location: any;
}

export default class CreateEventComponent extends React.Component<Props> {
  state = {};

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/city.png")}
          ></Image>
          <TouchableWithoutFeedback style={styles.iconContainer}
            onPress={() => this.props.onClose()}
          >
            <Icon style={styles.icon} name="close" />
          </TouchableWithoutFeedback>
        </View>
        <TouchableHighlight
          onPress={() => navigate("Suggest", {location: this.props.location})}
          underlayColor="white"
          activeOpacity={0.3}
        >
          <View style={styles.item}>
            <Text style={styles.title}>Suggest</Text>
            <Text style={styles.subtitle}>
              If you feel the need for a new local business
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => console.log("Open")}
          underlayColor="white"
          activeOpacity={0.3}
        >
          <View style={styles.item}>
            <Text style={styles.title}>Open</Text>
            <Text style={styles.subtitle}>
              If you are to open a new business around.
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
