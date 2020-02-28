import { StyleSheet, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import EStyleSheet from 'react-native-extended-stylesheet';

//we define rem equals to the entireScreenWidth / 380
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

export const styles = EStyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    paddingHorizontal: '10rem',
    fontFamily: "quicksand-bold",
    color: "#3A4750",
    fontSize: '14rem',
    marginTop: '10rem'
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: '5rem',
    marginTop: '5rem'
  },
  scrollViewPadding: {
    padding: '10rem',
  },
  scrollSubCategories: {
    flexDirection: "column",
    height: hp("15%"),
    marginLeft: '10rem'
  },
  touchable: {
    alignItems: "center",
    justifyContent: "center",
  },
  categoriesContainer: {
    backgroundColor: "white",
    margin: '5rem',
    width: '85rem',
    paddingVertical: '10rem'
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
  selected: {
    backgroundColor: "#EDEDED"
  },
  categoriesByColumn: {
    flexWrap: "wrap",
    justifyContent: "space-between"
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
    height: wp("9%"),
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
    width: '28rem',
    height: '40rem',
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
