import React from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { styles } from "./styles";
import InputComponent from "../../shared/components/input-form/input";
import ButtonComponent from "../../shared/components/submit-button/button";
import { ScrollView } from "react-native-gesture-handler";
import * as firebase from "firebase";

interface Props {
  navigation: any;
}

export default class IntroPage extends React.Component<Props> {
  state = {
    email: "",
    password: "",
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.top}>
            <Image
              style={styles.logo}
              source={require("../../shared/assets/logo.png")}
            />
            <Text style={styles.subtext}>
              Missing a new shop around the korner ?
            </Text>
            <Text style={styles.mainText}>
              Let the community know and keep track of what’s new.
            </Text>
          </View>
          <KeyboardAvoidingView
            style={styles.forms}
            behavior="padding"
            keyboardVerticalOffset={-80}
          >
            <InputComponent
              callback={(text) => this.setState({ email: text })}
              label="Email"
              placeholder="Enter your email"
              password={false}
              marginTop={"0rem"}
            ></InputComponent>
            <InputComponent
              callback={(text) => this.setState({ password: text })}
              label="Password"
              placeholder="Enter your password"
              password={true}
              marginTop={"16rem"}
            ></InputComponent>
            <Text style={styles.forgot} onPress={() => alert("Coming soon")}>
              Forgot password ?
            </Text>
          </KeyboardAvoidingView>
          <View style={styles.bottom}>
            <ButtonComponent
              label="Log in"
              callback={() => this.signIn()}
              marginTop={0}
            ></ButtonComponent>
            <Text style={styles.smallText} onPress={() => navigate("Register")}>
              Not a member ? Join now
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  signIn() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(async (user) => {
        this.props.navigation.navigate("App");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  }
}
