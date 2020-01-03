import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
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