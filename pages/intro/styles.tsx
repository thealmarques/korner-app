import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingBottom: 0,
    paddingHorizontal: wp('7%'),
    flex: 1,
    alignItems: "center"
  },
  header: {
    flex: .6,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 0
  },
  middle: {
    flex: 1,
    alignItems: "center",
    width: "100%"
  },
  signInButton: {
    marginTop: hp('4%'),
    backgroundColor: "#F98514",
    width: "100%",
    paddingTop: hp('1.5%'),
    paddingBottom: hp('1.5%'),
    borderRadius: wp('4%')
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: wp('5%'),
    fontFamily: "quicksand-bold"
  },
  bottom: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: hp('2%'),
    width: '100%'
  }
});