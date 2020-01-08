import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: hp('8%'),
    marginBottom: hp('5%'),
    paddingBottom: 0,
    paddingHorizontal: wp('7%'),
    flex: 1
  },
  header: {
    flex: 1,
    alignItems: "flex-start",
  },
  forms: {
    flex: 3,
    width: "100%"
  },
  forgot: {
    marginTop: hp('2%'),
    color: "#7C766E",
    fontSize: wp('3%'),
    fontFamily: "quicksand-bold",
    textAlign: "right"
  },
  picture: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  attachement: {
    width: wp('8.5%'),
    height: hp('8.5%'),
    resizeMode: 'contain',
    marginTop: hp('2%'),
    marginRight: wp('4%')
  },
  text: {
    color: "#7C766E",
    marginTop: hp('1.5%'),
    fontSize: wp('3.6%'),
    fontFamily: "quicksand-bold"
  }
});
