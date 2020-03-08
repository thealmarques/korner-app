import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

//we define rem equals to the entireScreenWidth / 380
const entireScreenWidth = Dimensions.get("window").width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export const styles = EStyleSheet.create({
  text: {
    color: "#FFFFFF",
    fontSize: '14rem',
    fontFamily: "quicksand-bold",
    marginRight: '4%'
  },
  header: {
    paddingTop: '25rem',
    backgroundColor: "#C92C41",
    height: '65rem',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
