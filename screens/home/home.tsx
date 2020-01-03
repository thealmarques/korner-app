import React from "react";
import {
  Text,
  View
} from "react-native";

interface Props {
  navigation: any
}

export default class HomePage extends React.Component<Props> {
    render() {
        return (
            <View style={{marginTop: 30}}>
              <Text>Logado</Text>
            </View>
          );
    }
}