import React from "react";
import { Text, View, Image, Alert, TouchableOpacity } from "react-native";
import * as Font from "expo-font";
import { styles } from "./styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

interface Props {
  navigation: any;
}

export default class IntroPage extends React.Component<Props> {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require("../../shared/assets/logo.png")} />
          <Text
            style={{
              marginTop: hp("2%"),
              fontFamily: "quicksand-bold",
              fontSize: wp("5%")
            }}
          >
            Open for Business
          </Text>
          <Text
            style={{
              marginTop: hp("2%"),
              fontFamily: "quicksand-regular",
              fontSize: wp("3.5%"),
              color: "#707070",
              textAlign: "center"
            }}
          >
            Missing an ice cream shop around the corner?{"\n"}
            Wishing a new supermarket on a 1 mile radius?
          </Text>
        </View>
        <View style={styles.middle}>
          <Text
            style={{
              fontFamily: "quicksand-bold",
              fontSize: wp("4%"),
              color: "#707070"
            }}
          >
            You are not alone...
          </Text>
          <Image
            style={{ marginTop: hp("5%") }}
            source={require("../../shared/assets/shops.png")}
          />
          <Text
            style={{
              marginTop: hp("2%"),
              fontFamily: "quicksand-bold",
              fontSize: wp("3%"),
              color: "#707070",
              textAlign: "center"
            }}
          >
            Let the community know and keep track of what's new.
          </Text>
          <TouchableOpacity
            style={styles.signInButton}
            activeOpacity={0.9}
            onPress={() => navigate("Register")}
          >
            <Text style={styles.buttonText}>Sign Up!</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <Text
            onPress={() => navigate("Login")}
            style={{
              color: "#7C766E",
              textAlign: "center",
              fontFamily: "quicksand-bold",
              fontSize: wp("3.8%")
            }}
          >
            Already have an account? Login
          </Text>
        </View>
      </View>
    );
  }
}
