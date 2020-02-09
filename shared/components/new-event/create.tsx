import React from "react";
import { styles } from "./styles";
import { View, Text, Image } from "react-native";
import { Icon } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import ButtonComponent from "../submit-button/button";
import { TouchableHighlight } from "react-native-gesture-handler";

interface Props {
  onPress: any;
  onClose: any;
}

export default class CreateEventComponent extends React.Component<Props> {
  state = {
    loaded: true,
    selected: 1
  };

  getSelectedStyle(option: number) {
      if (option === this.state.selected) {
          return styles.selected;
      }
      return styles.notSelected;
  }

  render() {
    return (
      this.state.loaded && (
        <View style={styles.container}>
          <Icon
            style={styles.icon}
            name="close"
            onPress={() => this.props.onClose()}
          />
          <TouchableHighlight
            onPress={() =>
              this.setState({
                selected: 1
              })
            }
            underlayColor='white'
            activeOpacity={1}
          >
            <View style={[styles.item, this.getSelectedStyle(1)]}>
              <Image
                style={styles.image}
                source={require("../../assets/idea.png")}
              ></Image>
              {
                <View style={styles.textWrapper}>
                  <Text style={styles.title}>Suggest</Text>
                  <Text style={styles.subtitle}>
                    If you feel the need for a new local business test test
                  </Text>
                </View>
              }
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() =>
              this.setState({
                selected: 2
              })
            }
            underlayColor='white'
            activeOpacity={1}
          >
            <View style={[styles.item, this.getSelectedStyle(2)]}>
              <Image
                style={styles.image}
                source={require("../../assets/open.png")}
              ></Image>
              {
                <View style={styles.textWrapper}>
                  <Text style={styles.title}>Open</Text>
                  <Text style={styles.subtitle}>
                    If you want to open a new business around
                  </Text>
                </View>
              }
            </View>
          </TouchableHighlight>
          <ButtonComponent
            label="Continue"
            callback={() => console.log("Oi")}
            marginTop={hp("0%")}
          ></ButtonComponent>
        </View>
      )
    );
  }
}
