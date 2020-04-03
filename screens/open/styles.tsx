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
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    margin: "auto"
  },
  browseContainer: {
    backgroundColor: "white",
    width: "90rem",
    height: "85rem",
    justifyContent: "space-between",
    alignItems: "center"
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
    justifyContent: "center",
    width: "90rem",
    paddingVertical: "3rem",
    margin: 0
  },
  browseText: {
    fontFamily: "quicksand-bold",
    color: "white",
    fontSize: "12rem"
  },
  uplodedImage: {
    width: "90rem",
    height: "85rem",
    marginRight: "20rem",
    marginBottom: "10rem"
  },
  deleteIcon: {
    width: "35rem",
    height: "35rem"
  },
  dayContainer: {
    width: "30rem",
    height: "30rem",
    borderRadius: "25rem",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "12rem",
    marginTop: "5rem",
    marginBottom: "5rem"
  },
  dayText: {
    fontFamily: "quicksand-bold",
    color: "white",
    fontSize: "12rem"
  },
  dayNotSelected: {
    backgroundColor: "#DDDDDD"
  },
  daySelected: {
    backgroundColor: "#5A646B"
  },
  schedulePickerContainer: {
    position: "absolute",
    bottom: 0,
    justifyContent: "flex-end",
    height: "50%",
    width: "100%",
    backgroundColor: "white",
    elevation: 2,
    flexDirection: "column"
  },
  shadowSchedule: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  leftArrow: {
    height: '20rem',
    width: '25rem',
    resizeMode: 'contain',
    marginLeft: '25rem',
    marginTop: '25rem'
  },
  approve: {
    height: '35rem',
    width: '35rem',
    resizeMode: 'contain',
    marginTop: '20rem',
    alignSelf: 'center'
   },
  smallText: {
    alignSelf: 'center',
    fontFamily: "quicksand-bold",
    color: "#5A646B",
    fontSize: "14rem"
  },
  smallTextMarginTop: {
    marginTop: "16rem"
  }
});
