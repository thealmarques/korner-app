import React from "react";
import { Alert, KeyboardAvoidingView } from "react-native";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { styles } from "./styles";
import InputComponent from "../../shared/components/input-form/input";
import ButtonComponent from "../../shared/components/submit-button/button";
import BackComponent from "../../shared/components/back-arrow/back";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import { Validator } from "../../shared/Validator";
import { convertUriToBlob } from "../../shared/Helper";

interface Props {
  navigation: any;
}

export default class RegisterPage extends React.Component<Props> {
  // ecra de loading para quando os resources não estão carregados
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    base64Image: undefined,
  };

  render() {
    const { goBack } = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <BackComponent back={() => goBack()}></BackComponent>
            <Text style={styles.createText}>Create new {"\n"}account</Text>
          </View>
          <KeyboardAvoidingView style={styles.forms} behavior="padding" keyboardVerticalOffset={-80}>
            <InputComponent
              callback={(text) => this.setState({ name: text })}
              label="Name"
              placeholder="Enter your name"
              password={false}
              marginTop={'0rem'}
            ></InputComponent>
            <InputComponent
              callback={(text) => this.setState({ email: text })}
              label="Email"
              placeholder="Enter your email"
              password={false}
              marginTop={'16rem'}
            ></InputComponent>
            <InputComponent
              callback={(text) => this.setState({ password: text })}
              label="Password"
              placeholder="Enter your password"
              password={true}
              marginTop={'16rem'}
            ></InputComponent>
            <InputComponent
              callback={(text) => this.setState({ confirmPassword: text })}
              label="Confirm password"
              placeholder="Confirm your password"
              password={true}
              marginTop={'16rem'}
            ></InputComponent>
            <View style={styles.picture}>
              <TouchableOpacity
                onPress={() => {
                  ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  }).then(async (result: any) => {
                    if (!result.cancelled) {
                      const { height, width, type, uri } = result;
                      const blob = await convertUriToBlob(uri);
                      this.setState({ base64Image: blob ? blob : undefined });
                    }
                  });
                }}
              >
                <Image
                  style={styles.attachement}
                  source={require("../../shared/assets/attach.png")}
                ></Image>
              </TouchableOpacity>
              <Text style={styles.text}>
                {this.state.base64Image
                  ? "Wow. Awesome picture"
                  : "Upload your profile picture \n(optioal)"}
              </Text>
            </View>
          </KeyboardAvoidingView>
          <View style={styles.bottom}>
            <ButtonComponent
              label="Sign Up!"
              callback={() => this.signUp()}
              marginTop={0}
            ></ButtonComponent>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  signUp() {
    if (!Validator.validateName(this.state.name)) {
      Alert.alert("Error", "Name is invalid!");
      return;
    }

    if (!Validator.validateEmail(this.state.email)) {
      Alert.alert("Error", "Email is incorrect!");
      return;
    }

    if (!Validator.validatePassword(this.state.password)) {
      Alert.alert("Error", "Password should be longer than 6 characters");
      return;
    }

    if (
      !Validator.validateConfirmation(
        this.state.password,
        this.state.confirmPassword
      )
    ) {
      Alert.alert("Error", "Passwords doesn't match!");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(async (user) => {
        firebase.auth().currentUser.updateProfile({
          displayName: this.state.name
        });
        
        if (this.state.base64Image) {
          await firebase
            .storage()
            .ref("/profile-pictures")
            .child(user.user.uid)
            .put(this.state.base64Image, {
              contentType: "image/jpeg",
            });
        }
        this.props.navigation.navigate("App");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  }
}
