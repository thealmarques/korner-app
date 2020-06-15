import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
let responsiveFactor = 380;

switch(true) {
    case (screenWidth > 500):
        responsiveFactor = 440;
        break;
    default:
        responsiveFactor = 380;
}

export default responsiveFactor;