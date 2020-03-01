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
  scrollSubCategories: {
    flexDirection: "column",
    height: hp("15%"),
    marginLeft: '10rem'
  },
  touchableCategory: {
    alignItems: "center",
    justifyContent: "center",
    height: '70rem'
  },
  touchableSubCategory: {
    alignItems: "center",
    justifyContent: "center",
    height: '75rem'
  },
  touchableMiniCategory: {
    alignItems: "center",
    justifyContent: "center",
    height: '32rem'
  },
  categoriesContainer: {
    backgroundColor: "white",
    margin: '5rem',
    width: '85rem',
    height: '70rem'
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
  byColumn: {
    flex: 1,
    flexDirection : "column",
    flexWrap: 'wrap',
    height: '90rem',
  },
  mainSubCategoryContainer: {
    backgroundColor: "white",
    margin: '5rem',
    width: '85rem',
    height: '75rem',
    justifyContent: 'center',
    alignItems: 'center'
  },
  miniSubCategoryContainer: {
    backgroundColor: "white",
    margin: '5rem',
    width: '100rem',
    height: '32rem',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  image: {
    width: '28rem',
    height: '40rem',
    resizeMode: "contain"
  },
  smallImage: {
    width: '14rem',
    height: '20rem',
    resizeMode: "contain"
  },
  subText: {
    fontFamily: "quicksand-bold",
    color: "#3A4750",
    fontSize: '8rem'
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
