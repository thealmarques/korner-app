import React from "react";
import {Alert} from 'react-native';
import {
  Text,
  View
} from "react-native";
import * as Font from "expo-font";
import { styles } from "./styles";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import InputComponent from "../../shared/components/input-form/input";
import ButtonComponent from "../../shared/components/submit-button/button";
import BackComponent from "../../shared/components/back-arrow/back";
import * as firebase from 'firebase';

interface Props {
  navigation: any
}

export default class LoginPage extends React.Component<Props> {
  // ecra de loading para quando os resources não estão carregados
  state = {
    fontsLoaded: false,
    email: '',
    password: ''
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
              Login into {'\n'}your account
            </Text>
          </View>
          <View style={styles.forms}>
            <InputComponent callback={(text) => this.setState({email: text})} label="Email" placeholder="Enter your email" password={false} marginTop={hp('0%')}></InputComponent>
            <InputComponent callback={(text) => this.setState({password: text})} label="Password" placeholder="Enter your password" password={true} marginTop={hp('2%')}></InputComponent>
            <Text style={styles.forgot} onPress={() => alert('Coming soon')}>Forgot password ?</Text>
            <ButtonComponent label='Sign In!' callback={() => this.signIn()} marginTop={hp('0%')}></ButtonComponent>
          </View>
        </View>
      );
    } else {
      return <Text>Loading... (change to a loading page)</Text>;
    }
  }

  signIn() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(async (user) => {
      this.props.navigation.navigate('App');
    }).catch((error) => {
      Alert.alert('Error', error.message);
    });
  }
}
