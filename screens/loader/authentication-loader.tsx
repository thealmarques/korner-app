import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native';
import * as firebase from 'firebase';
import { firebaseConfig } from '../../shared/constants/server';

interface Props {
  navigation: any
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

  // Render any loading content that you like here
  render() {
    return (
      <View style={{flex: 1, justifyContent: "center"}}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  onAuthStateChanged(user: firebase.User) {
    this.props.navigation.navigate(user ? 'App' : 'Auth');
  }
}