import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";

//we define rem equals to the entireScreenWidth / 380
const entireScreenWidth = Dimensions.get("window").width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export const styles = EStyleSheet.create({
    list: {
        flex: 1
    },
    text: {
        fontSize: 20,
        fontFamily: "quicksand-bold",
        color: "#DDDDDD"
    },
    smallText: {
        fontSize: 16,
        fontFamily: "quicksand-bold",
        color: "#DDDDDD"
    },
    selectedText: {
        fontSize: 24,
        fontFamily: "quicksand-bold",
        color: "#5A646B",
        alignItems: "flex-end"
    },
    smallSelectedText: {
        fontSize: 18,
        fontFamily: "quicksand-bold",
        color: "#5A646B",
        alignItems: "flex-start"
    },
    container: {
        width: 90,
        justifyContent: "center",
        alignItems: "center"
    }
});