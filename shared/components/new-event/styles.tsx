import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: wp('85%'),
        height: hp('40%'),
        alignSelf: "center",
        borderRadius: wp('3%'),
        top: hp('35%'),
        backgroundColor: 'white',
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('2%')
    },
    icon: {
        fontSize: wp('4.5%'),
        color: '#908E8E',
        alignSelf: "flex-end"
    },
    item: {
        marginTop: hp('1%'),
        flexDirection: "row",
        paddingHorizontal: wp('3%'),
        alignItems: "center"
    },
    image: {
        width: wp('9%'),
        height: hp('9%'),
        resizeMode: "contain"
    },
    textWrapper: {
        marginLeft: wp('3%'),
        paddingRight: wp('7%'),
        flexDirection: "column",
        alignItems: "flex-start"
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
    notSelected: {
        backgroundColor: '#F9F9F9',
        borderRadius: wp('3%'),
    },
    selected: {
        backgroundColor: '#DBDBDB',
        borderRadius: wp('3%')
    }
});