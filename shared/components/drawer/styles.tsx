import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";
import responsiveFactor from "../../constants/responsive";

EStyleSheet.build({ $rem: Dimensions.get("window").width / responsiveFactor });

export const styles = EStyleSheet.create({
    drawerContainer: {
        flex: 1
    },
    topContainer: {
        backgroundColor: "#5A646B",
        height: '56%',
        width: '100%',
        borderBottomRightRadius: '5rem',
        borderBottomLeftRadius: '5rem',
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        paddingVertical: '30rem',
        zIndex: 100
    },
    scrollContainer: {
        flex: 1,
        paddingLeft: '30rem'
    },
    text: {
        fontFamily: 'quicksand-bold',
        fontSize: 16,
        letterSpacing: 2,
        color: 'white',
    },
    marginTop: {
        marginTop: '30rem'
    },
    profileContainer: {
        flex: 0.7,
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center'
    },
    closeContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    roundClose: {
        height: '60rem',
        width: '60rem',
        backgroundColor: '#5A646B',
        borderRadius: '60rem',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeIcon: {
        width: 15,
        height: 15
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 50
    },
    emptyImage: {
        width: 55,
        height: 55
    }
});
