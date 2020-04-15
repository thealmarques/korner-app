import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const entireScreenWidth = Dimensions.get("window").width;
let factor = 380;
if (entireScreenWidth > 500) {
  factor = 440;
  
}
EStyleSheet.build({ $rem: entireScreenWidth / factor });

export const styles = EStyleSheet.create({
  text: {
    color: "#FFFFFF",
    fontSize: '14rem',
    fontFamily: "quicksand-bold",
    marginRight: '4%'
  },
  header: {
    backgroundColor: "#C92C41",
    overflow: 'hidden',
    height: '55rem',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
