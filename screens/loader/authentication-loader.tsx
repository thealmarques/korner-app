import React from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import * as firebase from "firebase";
import { firebaseConfig } from "../../shared/constants/server";
import { bindNotificationToken, getUserBasicData } from "../../shared/api/api";
import { connect } from "react-redux";
import { setUserName, setPhotoUrl } from "../../shared/store/actions/user.actions";
import { User } from "../../shared/interfaces/user";

interface Props {
  navigation: any;
  token: string;
  setUserProperties?: any;
}

class AuthenticationLoader extends React.Component<Props> {
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
      getUserBasicData().then((user: User) => {
        this.props.setUserProperties(user.name, user.photoUrl);
      });
      bindNotificationToken(this.props.token, user.uid);
    }
    this.props.navigation.navigate(user ? "App" : "Auth");
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUserProperties: (name: string, photoUrl: string) => {
    dispatch(setUserName(name));
    dispatch(setPhotoUrl(photoUrl));
  }
});

export default connect(null, mapDispatchToProps)(AuthenticationLoader);