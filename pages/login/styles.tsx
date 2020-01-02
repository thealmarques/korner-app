import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: hp('12%'),
    paddingBottom: 0,
    paddingHorizontal: wp('7%'),
    flex: 1
  },
  header: {
    flex: 1,
    alignItems: "flex-start",
  },
  forms: {
    flex: 2,
    width: "100%"
  },
  labelEmail: {
    color: "#7C766E",
    fontSize: wp('4%'),
    fontFamily: "quicksand-bold"
  },
  labelPassword: {
    marginTop: hp('2%'),
    color: "#7C766E",
    fontSize: wp('4%'),
    fontFamily: "quicksand-bold"
  },
  forgot: {
    marginTop: hp('2%'),
    color: "#7C766E",
    fontSize: wp('3%'),
    fontFamily: "quicksand-bold",
    textAlign: "right"
  },
  input: {
    marginTop: hp('2.5%'),
    paddingBottom: hp('0.5%'),
    borderBottomWidth: hp('0.1%'),
    borderBottomColor: "#C5C5C5",
    width: "100%"
  },
  signInButton: {
    backgroundColor: "#F98514",
    width: "100%",
    marginTop: hp('3%'),
    paddingTop: hp('1.5%'),
    paddingBottom: hp('1.5%'),
    borderRadius: wp('4%')
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: wp('5%'),
    fontFamily: "quicksand-bold"
  }
});
