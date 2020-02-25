import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        paddingVertical: hp('3%'),
    },
    text: {
        paddingHorizontal: wp('4%'),
        fontFamily: 'quicksand-bold',
        color: '#3A4750',
        fontSize: wp('4%')
    },
    scrollCategories: {
        marginTop: hp('1%'),
        flexDirection: 'row',
        height: hp('16%')
    },
    scrollSubCategories: {
        flexDirection: 'column',
        height: hp('20%'),
    },
    categoriesContainer: {
        backgroundColor : "white",
        width: wp('23%'),
        height: wp('21%'),
        marginRight: wp('2%'),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    categoriesContainerSelected: {
        backgroundColor : "#EDEDED",
        width: wp('23%'),
        height: wp('21%'),
        marginRight: wp('2%'),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    subCategoriesContainer: {
        backgroundColor : "white",
        marginRight: wp('2%'),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    subCategoriesContainerSelected: {
        backgroundColor : "#EDEDED",
        marginRight: wp('2%'),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    miniSubCategoriesContainer: {
        backgroundColor : "white",
        width: wp('34%'),
        height: wp('11%'),
        marginRight: wp('2%'),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    miniSubCategoriesContainerSelected: {
        backgroundColor : "#EDEDED",
        marginRight: wp('2%'),
        width: wp('34%'),
        height: wp('11%'),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: wp('8.5%'),
        height: hp('8.5%'),
        resizeMode: 'contain'
    },
    smallImage: {
        width: wp('4.5%'),
        height: hp('4.5%'),
        resizeMode: 'contain'
    },
    subText: {
        fontFamily: 'quicksand-bold',
        color: '#3A4750',
        fontSize: wp('2%')
    }
});