import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface Props {
  back: any;
}

export default class BackComponent extends React.Component<Props> {
  render() {
    return (
      <View style={{width: '100%'}}>
        <TouchableOpacity onPress={() => this.props.back()}>
          <Image style={styles.arrow} source={require("../../assets/left-arrow.png")}></Image>
        </TouchableOpacity>
      </View>
    );
  }
}
