import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white"
  },
  container: {
    flex: 1,
    marginTop: hp("1%")
  },
  text: {
    paddingHorizontal: wp("4%"),
    fontFamily: "quicksand-bold",
    color: "#3A4750",
    fontSize: wp("4%")
  },
  scrollCategories: {
    flexDirection: "row",
    height: hp("16%"),
    marginLeft: wp('2%'),
    marginTop: hp('1%')
  },
  scrollSubCategories: {
    flexDirection: "column",
    height: hp("15%"),
    marginLeft: wp('2%')
  },
  categoriesContainer: {
    backgroundColor: "white",
    width: wp("23%"),
    height: wp("21%"),
    marginRight: wp("2%"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  categoriesContainerSelected: {
    backgroundColor: "#EDEDED",
    width: wp("23%"),
    height: wp("21%"),
    marginRight: wp("2%"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  subCategoriesContainer: {
    height: wp("23%"),
    width: wp("21%"),
    backgroundColor: "white",
    marginRight: wp("2%"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  subCategoriesContainerSelected: {
    height: wp("23%"),
    width: wp("21%"),
    backgroundColor: "#EDEDED",
    marginRight: wp("2%"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  miniSubCategoriesContainer: {
    backgroundColor: "white",
    marginRight: wp("2%"),
    height: wp("8.5%"),
    width: wp("34%"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  miniSubCategoriesContainerSelected: {
    backgroundColor: "#EDEDED",
    marginRight: wp("2%"),
    height: wp("8.5%"),
    width: wp("34%"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  image: {
    width: wp("8.5%"),
    height: hp("8.5%"),
    resizeMode: "contain"
  },
  smallImage: {
    width: wp("4.5%"),
    height: hp("4.5%"),
    resizeMode: "contain"
  },
  subText: {
    fontFamily: "quicksand-bold",
    color: "#3A4750",
    fontSize: wp("2%")
  },
  textInput: {
    justifyContent: "flex-start",
    fontSize: wp("2.7%"),
    paddingHorizontal: wp("2%"),
    fontFamily: "quicksand-regular"
  },
  shadowTextInput: {
    marginTop: hp("2%"),
    marginHorizontal: wp("4%"),
    backgroundColor: "white",
    height: wp("12%"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  }
});
