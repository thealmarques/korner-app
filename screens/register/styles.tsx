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
    backgroundColor: "#fff",
    marginBottom: '20rem',
    marginTop: '25rem',
    paddingHorizontal: '15rem',
    flex: 1
  },
  createText: {
    marginTop: '14rem',
    fontFamily: "quicksand-bold",
    fontSize: '20rem',
  },
  header: {
    height: '100rem'
  },
  forms: {
    marginTop: '10rem',
    flex: 1
  },
  picture: {
    marginTop: '16rem',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  attachement: {
    width: '30rem',
    height: '30rem',
    resizeMode: 'contain',
    marginTop: '5rem',
    marginRight: '5rem',
    marginBottom: '5rem'
  },
  text: {
    color: "#7C766E",
    marginTop: '5rem',
    fontSize: '14rem',
    fontFamily: "quicksand-bold"
  },
  bottom: {
    width: '100%',
    position: 'absolute',
    bottom: 0
  }
});
