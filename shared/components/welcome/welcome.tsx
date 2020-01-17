import React from "react";
import { View, Image, Text } from "react-native";
import { styles } from "./styles";
import { Icon } from 'native-base';
import { widthPercentageToDP } from "react-native-responsive-screen";

interface Props {
  onClose: any;
}

export default class WelcomeNotificationComponent extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image}
          source={require("../../assets/shop.png")}
        ></Image>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Discover and create suggestions</Text>
          <Text style={styles.subtitle}>Move the map or search a location</Text>
        </View>
        <Icon style={styles.icon} name="close" onPress={() => this.props.onClose()} />
      </View>
    );
  }
}
