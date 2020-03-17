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
  uploadContainer: {
    paddingHorizontal: "10rem",
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    margin: "auto"
  },
  browseContainer: {
    backgroundColor: "white",
    width: "90rem",
    height: "85rem",
    justifyContent: 'space-between',
    alignItems: "center",
  },
  browseImage: {
    height: "40rem",
    width: "40rem",
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: "13rem"
  },
  browseTextContainer: {
    borderTopLeftRadius: "5rem",
    borderTopRightRadius: "5rem",
    backgroundColor: "#BBC5CC",
    alignItems: "center",
    justifyContent: 'center',
    width: "90rem",
    paddingVertical: "3rem",
    margin: 0
  },
  browseText: {
    fontFamily: "quicksand-bold",
    color: "white",
    fontSize: "12rem"
  }
});