import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";

//we define rem equals to the entireScreenWidth / 380
const entireScreenWidth = Dimensions.get("window").width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export const styles = EStyleSheet.create({
    text: {
        fontSize: 20,
        fontFamily: "quicksand-bold",
        color: "#DDDDDD",
        lineHeight: 20
    },
    smallText: {
        fontSize: 16,
        fontFamily: "quicksand-bold",
        color: "#DDDDDD",
        lineHeight: 16
    },
    selectedText: {
        fontSize: 30,
        fontFamily: "quicksand-bold",
        color: "#5A646B",
        lineHeight: 30
    },
    smallSelectedText: {
        fontSize: 18,
        fontFamily: "quicksand-bold",
        color: "#5A646B",
        lineHeight: 18
    },
    container: {
        width: 90,
        justifyContent: "center",
        alignItems: "center",
    }
});