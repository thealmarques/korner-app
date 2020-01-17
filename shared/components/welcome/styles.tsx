import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    container: {
        borderRadius: wp('2%'),
        backgroundColor: '#ffffff',
        flexDirection: "row",
        alignItems: "center",
        width: wp('95%'),
        justifyContent: 'space-between',
        position: 'absolute',
        top: hp('85%'),
        paddingHorizontal: wp('5%'),
        alignSelf: 'center'
    },
    title: {
        color: "#f98514",
        fontSize: wp('4%'),
        fontFamily: "quicksand-bold"
    },
    subtitle: {
        color: "#000000",
        fontSize: wp('3%'),
        fontFamily: "quicksand-bold"
    },
    image: {
        width: wp('9%'),
        height: hp('10%'),
        resizeMode: "contain"
    },
    icon: {
        fontSize: wp('4.5%'),
        color: '#908E8E',
        alignSelf: "flex-start",
        marginTop: hp('2.5%')
    },
    textWrapper: {
        flexDirection: "column",
        alignItems: "flex-start"
    }
});