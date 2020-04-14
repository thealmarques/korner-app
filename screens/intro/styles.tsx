import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

//we define rem equals to the entireScreenWidth / 380
const entireScreenWidth = Dimensions.get("window").width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export const styles = EStyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: '30rem',
    flex: 1
  },
  top: {
    height: '250rem',
    alignItems: 'center',
    marginTop: '15rem'
  },
  logo: {
    width: '110rem',
    height: '110rem',
    resizeMode: 'contain'
  },
  subtext: {
    marginTop: '35rem',
    color: "#ADABAB",
    fontSize: '12rem',
    fontFamily: "quicksand-bold"
  },
  mainText: {
    marginTop: '30rem',
    color: "#3A4750",
    fontSize: '14rem',
    fontFamily: "quicksand-bold",
    textAlign: 'center'
  },
  forms: {
    marginTop: '15rem',
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
  },
  forgot: {
    marginTop: '5rem',
    color: "#ADABAB",
    fontSize: '12rem',
    fontFamily: "quicksand-bold",
    textAlign: "right",
    marginBottom: "5rem"
  },
  bottom: {
    bottom: 0,
    position: 'absolute',
    width: '100%'
  },
  smallText: {
    width: '100%',
    padding: '5rem',
    marginTop: '8rem',
    color: "#ADABAB",
    fontSize: '14rem',
    fontFamily: "quicksand-bold",
    textAlign: "center",
    marginBottom: '10rem'
  }
});