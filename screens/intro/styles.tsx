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
    backgroundColor: "white",
    paddingHorizontal: "30rem",
    flex: 1,
  },
  top: {
    height: "220rem",
    alignItems: "center",
    marginTop: "18rem",
  },
  logo: {
    width: "110rem",
    height: "110rem",
    resizeMode: "contain",
  },
  social: {
    flexDirection: "row",
    alignItems: 'center',
    marginTop: '10rem'
  },
  socialGoogle: {
    width: "60rem",
    height: "60rem",
    resizeMode: "contain",
  },
  socialFacebook: {
    marginLeft: '10rem',
    width: "50rem",
    height: "50rem",
    resizeMode: "contain",
  },
  subtext: {
    marginTop: "15rem",
    color: "#ADABAB",
    fontSize: "12rem",
    fontFamily: "quicksand-bold",
  },
  mainText: {
    marginTop: "15rem",
    color: "#3A4750",
    fontSize: "14rem",
    fontFamily: "quicksand-bold",
    textAlign: "center",
  },
  forms: {
    width: "100%",
    flex: 0.8,
    justifyContent: "flex-start",
  },
  forgot: {
    marginTop: "2rem",
    color: "#ADABAB",
    fontSize: "12rem",
    fontFamily: "quicksand-bold",
    textAlign: "right",
    marginBottom: "2rem",
  },
  bottom: {
    bottom: 0,
    position: "absolute",
    width: "100%",
  },
  smallText: {
    width: "100%",
    padding: "5rem",
    marginTop: "8rem",
    color: "#ADABAB",
    fontSize: "14rem",
    fontFamily: "quicksand-bold",
    textAlign: "center",
    marginBottom: "10rem",
  },
});
