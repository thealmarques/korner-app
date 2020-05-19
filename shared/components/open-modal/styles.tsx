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
    position: 'absolute',
    zIndex: 3,
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    borderRadius: '5rem',
    backgroundColor: 'white',
    width: '80%',
    height: '400rem',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  innerModal: {
    paddingVertical: '15rem',
    paddingHorizontal: '20rem'
  },
  mainTitle: {
    fontFamily: 'quicksand-bold',
    fontSize: '18rem',
    color: '#3A4750'
  },
  subTitle: {
    fontFamily: 'quicksand-bold',
    fontSize: '16rem',
    color: '#AFAFAF'
  },
  marginBetween: {
    marginTop: '10rem'
  },
  shadowTextInput: {
    marginTop: "10rem",
    backgroundColor: "white",
    height: "50rem"
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
  textInput: {
    justifyContent: "flex-start",
    fontSize: "12rem",
    paddingHorizontal: "5rem",
    fontFamily: "quicksand-regular"
  },
  uploadContainer: {
    height: '40rem',
    width: '100%',
    flexDirection: "row",
  },
  dayContainer: {
    width: "25rem",
    height: "25rem",
    borderRadius: "25rem",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "12rem",
    marginTop: "5rem",
    marginBottom: "5rem"
  },
  dayNotSelected: {
    backgroundColor: "#DDDDDD",
  },
  daySelected: {
    backgroundColor: "#5A646B",
  },
  dayText: {
    fontFamily: "quicksand-bold",
    color: "white",
    fontSize: "12rem"
  },
  schedulePickerContainer: {
    position: "absolute",
    bottom: 0,
    justifyContent: "flex-end",
    height: "270rem",
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
  smallText: {
    alignSelf: 'center',
    fontFamily: "quicksand-bold",
    color: "#5A646B",
    fontSize: "14rem"
  },
  smallTextMarginTop: {
    marginTop: "16rem"
  },
  arrow: {
    marginTop: '5rem',
    width: '20rem',
    height: '14rem'
  },
  arrowMargin: {
    marginRight: '13rem'
  },
  voteText: {
    fontFamily: "quicksand-bold",
    fontSize: "14rem"
  },
  greyColor: {
    color: '#AFAFAF'
  },
  greenColor: {
    color: '#199B44'
  },
  redColor: {
    color: 'red'
  },
  votesContainer: {
    flexDirection: 'row',
    marginTop: '2.5rem'
  }
});