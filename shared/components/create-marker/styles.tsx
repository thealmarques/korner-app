import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: wp('70%'),
        height: hp('36%'),
        alignSelf: "center",
        borderRadius: wp('2%'),
        top: hp('32%'),
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    topContainer: {
        flexDirection: 'row',
        width: wp('70%'),
        height: hp('15%'),
        backgroundColor: '#5A646B',
        borderTopLeftRadius: wp('2%'),
        borderTopRightRadius: wp('2%'),
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('2%'),
        alignItems: 'flex-start',
        alignContent: 'flex-start'
    },
    image: {
        width: wp('62%'),
        height: hp('12%'),
        resizeMode: 'cover',
        marginLeft: 0,
    },
    iconContainer: {
        width: wp('7%'),
        height: hp('7%'),
    },
    icon: {
        fontSize: wp('4.2%'),
        color: 'white',
    },
    item: {
        paddingHorizontal: wp('4.4%'),
        paddingVertical: hp('2.3%')
    },
    title: {
        color: "#3A4750",
        fontSize: wp('3.7%'),
        fontFamily: "quicksand-bold"
    },
    subtitle: {
        color: "#000000",
        fontSize: wp('2.3%'),
        marginTop: hp('0.4%'),
        fontFamily: "quicksand-bold"
    },
});