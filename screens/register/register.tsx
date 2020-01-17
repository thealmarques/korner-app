import React from "react";
import {Alert} from 'react-native';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import * as Font from "expo-font";
import { styles } from "./styles";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import InputComponent from "../../shared/components/input-form/input";
import ButtonComponent from "../../shared/components/submit-button/button";
import BackComponent from "../../shared/components/back-arrow/back";
import * as firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import { Validator } from "../../shared/Validator";

interface Props {
  navigation: any
}

export default class RegisterPage extends React.Component<Props> {
  // ecra de loading para quando os resources não estão carregados
  state = {
    fontsLoaded: false,
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    base64Image: undefined
  };
  async componentWillMount() {
    await Font.loadAsync({
      "quicksand-regular": require("../../shared/assets/fonts/Quicksand-Regular.ttf"),
      "quicksand-bold": require("../../shared/assets/fonts/Quicksand-Bold.ttf")
    });
    this.setState({ fontsLoaded: true });
  }

  render() {
    const { goBack } = this.props.navigation;
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <BackComponent back={() => goBack()}></BackComponent>
            <Text style={{ marginTop: hp('2%'), fontFamily: "quicksand-bold", fontSize: wp('6%') }}>
              Create new {'\n'}account
            </Text>
          </View>
          <SafeAreaView style={styles.forms}>
            <ScrollView>
                <InputComponent callback={(text) => this.setState({name: text})} label="Name" placeholder="Enter your name" password={false} marginTop={hp('0%')}></InputComponent>
                <InputComponent callback={(text) => this.setState({email: text})} label="Email" placeholder="Enter your email" password={false} marginTop={hp('2%')}></InputComponent>
                <InputComponent callback={(text) => this.setState({password: text})} label="Password" placeholder="Enter your password" password={true} marginTop={hp('2%')}></InputComponent>
                <InputComponent callback={(text) => this.setState({confirmPassword: text})} label="Confirm password" placeholder="Confirm your password" password={true} marginTop={hp('2%')}></InputComponent>
                <View style={styles.picture}>
                <TouchableOpacity onPress={() => {
                    ImagePicker.launchImageLibraryAsync({mediaTypes: ImagePicker.MediaTypeOptions.Images}).then(async (result: any) => {
                      if (!result.cancelled) {
                        const {height, width, type, uri} = result;
                        const blob = await this.convertUriToBlob(uri);
                        this.setState({base64Image: blob ? blob : undefined});
                      }
                    });
                }}>
                    <Image style={styles.attachement} source={require("../../shared/assets/attach.png")}></Image>
                </TouchableOpacity>
                <Text style={styles.text}>
                    {this.state.base64Image ? 'Wow. Awesome picture' : 'Upload your profile picture \n(optioal)'}</Text>
                </View>
            </ScrollView>
            <ButtonComponent label='Sign Up!' callback={() => this.signUp()} marginTop={hp('0%')}></ButtonComponent>
          </SafeAreaView>
        </View>
      );
    } else {
      return <Text>Loading... (change to a loading page)</Text>;
    }
  }

  signUp() {
    if (!Validator.validateName(this.state.name)) {
        Alert.alert('Error', 'Name is invalid!');
        return;
    }

    if (!Validator.validateEmail(this.state.email)) {
        Alert.alert('Error', 'Email is incorrect!');
        return;
    }

    if (!Validator.validatePassword(this.state.password)) {
        Alert.alert('Error', 'Password should be longer than 6 characters');
        return;
    }

    if (!Validator.validateConfirmation(this.state.password, this.state.confirmPassword)) {
        Alert.alert('Error', 'Passwords doesn\'t match!');
        return;
    }
    
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(async (user) => {
      if (this.state.base64Image) {
        await firebase.storage().ref('/profile-pictures').child(user.user.uid).put(this.state.base64Image, {
          contentType: 'image/jpeg'
        });
      }
      this.props.navigation.navigate('App');
    }).catch((error) => {
        Alert.alert('Error', error.message);
    });
  }

  convertUriToBlob(uri: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      
      xhr.onerror = function() {
        reject(new Error('Blob generator failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      
      xhr.send(null);
    });
  }
}
