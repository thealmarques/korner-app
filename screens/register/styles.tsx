import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

//we define rem equals to the entireScreenWidth / 380
const entireScreenWidth = Dimensions.get("window").width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export const styles = EStyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginVertical: '20rem',
    paddingBottom: 0,
    paddingHorizontal: '15rem',
    flex: 1
  },
  createText: {
    marginTop: '10rem',
    fontFamily: "quicksand-bold",
    fontSize: '20rem',
  },
  header: {
    height: '100rem'
  },
  forms: {
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
