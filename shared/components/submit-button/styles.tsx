import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

//we define rem equals to the entireScreenWidth / 380
const entireScreenWidth = Dimensions.get("window").width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export const styles = EStyleSheet.create({
  signInButton: {
    backgroundColor: "#C92C41",
    width: "100%",
    borderRadius: "12rem",
    paddingVertical: "10rem"
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: "14rem",
    fontFamily: "quicksand-bold",
  },
});
