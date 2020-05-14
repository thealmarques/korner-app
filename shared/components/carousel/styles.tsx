import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const entireScreenWidth = Dimensions.get("window").width;
let factor = 380;
if (entireScreenWidth > 500) {
  factor = 440;
}
EStyleSheet.build({ $rem: entireScreenWidth / factor });

export const styles = EStyleSheet.create({
    container: {
        width: '100%',
        height: '125rem',
        borderTopLeftRadius: '5rem',
        borderTopRightRadius: '5rem'
    },
    closeIcon: {
        position: 'absolute',
        right: '8rem',
        top: '8rem',
        fontSize: '22rem',
        color: 'white',
        zIndex: 100
    },
    sliderContainer: {
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        height: '30rem',
    },
    slider: {
        marginLeft: '5rem',
        borderRadius: '13rem',
        width: '13rem',
        height: '13rem'
    },
    selected: {
        backgroundColor: '#3A4750',
        zIndex: 100
    },
    notSelected: {
        backgroundColor: 'white',
        zIndex: 100
    },
    image: {
        position: 'absolute',
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        borderTopLeftRadius: '5rem',
        borderTopRightRadius: '5rem'
    }
});