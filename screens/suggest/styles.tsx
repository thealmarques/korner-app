import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

//we define rem equals to the entireScreenWidth / 380
const entireScreenWidth = Dimensions.get("window").width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export const styles = EStyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white"
  },
  text: {
    paddingHorizontal: "10rem",
    fontFamily: "quicksand-bold",
    color: "#3A4750",
    fontSize: "14rem",
    marginTop: "10rem"
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: "5rem",
    marginTop: "10rem"
  },
  touchableCategory: {
    alignItems: "center",
    justifyContent: "center",
    height: "80rem"
  },
  touchableSubCategory: {
    alignItems: "center",
    justifyContent: "center",
    height: "80rem"
  },
  touchableMiniCategory: {
    alignItems: "center",
    justifyContent: "center",
    height: "34.5rem"
  },
  categoriesContainer: {
    backgroundColor: "white",
    margin: "5rem",
    width: "85rem",
    height: "80rem"
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  shadowLight: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.84,
    elevation: 2
  },
  selected: {
    backgroundColor: "#EDEDED"
  },
  byColumn: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    height: "90rem"
  },
  mainSubCategoryContainer: {
    backgroundColor: "white",
    margin: "5rem",
    width: "85rem",
    height: "80rem",
    justifyContent: "center",
    alignItems: "center"
  },
  miniSubCategoryContainer: {
    backgroundColor: "white",
    margin: "5rem",
    width: "140rem",
    height: "34.5rem"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  image: {
    width: "28rem",
    height: "40rem",
    resizeMode: "contain"
  },
  smallImage: {
    width: "14rem",
    height: "20rem",
    resizeMode: "contain"
  },
  subText: {
    fontFamily: "quicksand-bold",
    color: "#3A4750",
    fontSize: "8rem"
  },
  textInput: {
    justifyContent: "flex-start",
    fontSize: "12rem",
    paddingHorizontal: "5rem",
    fontFamily: "quicksand-regular"
  },
  shadowTextInput: {
    margin: "10rem",
    paddingHorizontal: "5rem",
    backgroundColor: "white",
    height: "45rem"
  },
  marginTop: {
    marginTop: "5rem"
  },
  marginBottom: {
    marginBottom: "6rem"
  },
  setupContainer: {
    marginTop: "5rem",
    flex: 1
  },
  innerSetupView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "10rem"
  },
  innerSetupText: {
    color: "#B0B4B7",
    fontFamily: "quicksand-regular",
    fontSize: "14rem",
    width: "75%"
  },
  sliderView: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    marginTop: "5rem",
    marginHorizontal: "10rem"
  },
  slider: {
    backgroundColor: "#508B69",
    width: '15rem',
    height: '15rem'
  },
  sliderText: {
    color: "#B0B4B7",
    fontFamily: "quicksand-regular",
    fontSize: "14rem",
    flexWrap: "wrap"
  }
});
