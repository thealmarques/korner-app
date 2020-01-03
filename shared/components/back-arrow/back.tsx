import React from "react";

import { Image, TouchableOpacity, View } from "react-native";

interface Props {
  back: any;
}

export default class BackComponent extends React.Component<Props> {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.back()}>
          <Image source={require("../../assets/left-arrow.png")}></Image>
        </TouchableOpacity>
      </View>
    );
  }
}
