import { Dimensions } from "react-native";

const entireScreenWidth = Dimensions.get("window").width;
let responsiveFactor = 380;
if (entireScreenWidth > 500) {
    responsiveFactor = 440;
}

export default responsiveFactor;