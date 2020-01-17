import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    container: {
        marginRight: hp('4%'),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: wp('50%')
    },
    text: {
        color: "#FFFFFF",
        fontSize: wp('3.8%'),
        fontFamily: "quicksand-bold",
        marginLeft: wp('2%')
    },
    stretch: {
        width: wp('3%'),
        height: hp('3%'),
        resizeMode: "contain"
    }
});