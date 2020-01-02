import React from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import * as Font from "expo-font";
import { styles } from "./styles";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import InputComponent from "../../shared/components/input-form/input";

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
            <TouchableOpacity onPress={() => goBack()}>
              <Image source={require("../../shared/assets/left-arrow.png")}></Image>
            </TouchableOpacity>
            <Text style={{ marginTop: hp('3%'), fontFamily: "quicksand-bold", fontSize: wp('6%') }}>
              Login into {'\n'}your account
            </Text>
          </View>
          <View style={styles.forms}>
            <InputComponent callback={(text) => this.state.email=text} label="Email" placeholder="Enter your email" password={false} marginTop={hp('0%')} ref='email'></InputComponent>
            <InputComponent callback={(text) => this.state.password=text} label="Password" placeholder="Enter your password" password={true} marginTop={hp('2%')} ref='password'></InputComponent>
            <Text style={styles.forgot} onPress={() => alert('Forgot password')}>Forgot password ?</Text>
            <TouchableOpacity style={styles.signInButton} activeOpacity={0.9} onPress={() => alert(this.state.password)}>
              <Text style={styles.buttonText}>Sign In!</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return <Text>Loading... (change to a loading page)</Text>;
    }
  }
}
