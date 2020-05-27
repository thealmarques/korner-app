import React from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import * as firebase from "firebase";
import { firebaseConfig } from "../../shared/constants/server";
import { bindNotificationToken } from "../../shared/api/api";

interface Props {
  navigation: any;
  token: string;
}

export default class AuthenticationLoader extends React.Component<Props> {
  constructor(props) {
    super(props);
  
    // Initialize firebase flow...
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  onAuthStateChanged(user: firebase.User) {
    if (user) {
      bindNotificationToken(this.props.token, user.uid);
    }
    this.props.navigation.navigate(user ? "App" : "Auth");
  }
}
