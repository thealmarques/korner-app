import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";
import responsiveFactor from "../../shared/constants/responsive";

EStyleSheet.build({ $rem: Dimensions.get("window").width / responsiveFactor });

export const styles = EStyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: 'flex-start'
    },
    header: {
        height: '55rem',
        width: '100%',
        backgroundColor: '#C92C41',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '15rem',
    },
    goBackContainer: {
        left: 0,
        top: 0,
        width: '20%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    goBackImage: {
        width: '28rem',
        height: '18rem'
    },
    headerTitle: {
        fontFamily: 'quicksand-bold',
        fontSize: '18rem',
        color: 'white'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '60rem',
        marginHorizontal: '5rem',
        borderBottomWidth: '0.6rem',
        borderColor: '#5A646B'
    },
    type: {
        fontFamily: 'quicksand-bold',
        fontSize: '18rem',
        marginBottom: '3rem'
    },
    category: {
        fontFamily: 'quicksand-regular',
        fontSize: '15rem',
    },
    viewImage: {
        width: '35rem',
        height: '20rem',
        resizeMode: 'contain',
        marginBottom: '3rem'
    },
    date: {
        fontFamily: 'quicksand-regular',
        fontSize: '10rem'
    }
});