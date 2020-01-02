import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    label: {
        color: "#7C766E",
        fontSize: wp('4%'),
        fontFamily: "quicksand-bold"
    },
    input: {
        marginTop: hp('2.5%'),
        paddingBottom: hp('0.5%'),
        borderBottomWidth: hp('0.1%'),
        borderBottomColor: "#C5C5C5",
        width: "100%"
      },
});