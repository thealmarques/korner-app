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
  forgot: {
    marginTop: hp('2%'),
    color: "#7C766E",
    fontSize: wp('3%'),
    fontFamily: "quicksand-bold",
    textAlign: "right"
  }
});
