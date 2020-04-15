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
        position: "absolute",
        width: '70%',
        height: '210rem',
        alignSelf: "center",
        borderRadius: '15rem',
        top: '32%',
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
        width: '100%',
        height: '80rem',
        backgroundColor: '#5A646B',
        borderTopLeftRadius: '15rem',
        borderTopRightRadius: '15rem',
        paddingHorizontal: '10rem',
        paddingVertical: '10rem',
        alignItems: 'flex-start',
        alignContent: 'flex-start'
    },
    image: {
        width: '95%',
        height: '100%',
        resizeMode: 'cover',
        marginLeft: 0
    },
    iconContainer: {
        width: '20rem',
        height: '20rem',
    },
    icon: {
        fontSize: '18rem',
        color: 'white',
    },
    item: {
        paddingHorizontal: '10rem',
        paddingVertical: '10rem',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: "#3A4750",
        fontSize: '15rem',
        fontFamily: "quicksand-bold"
    },
    subtitle: {
        color: "#000000",
        fontSize: '10rem',
        marginTop: '5rem',
        fontFamily: "quicksand-bold"
    },
});