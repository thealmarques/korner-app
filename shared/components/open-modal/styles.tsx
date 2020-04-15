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
        width: '70%',
        height: '290rem',
    }
});