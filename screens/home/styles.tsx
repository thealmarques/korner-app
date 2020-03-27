import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

//we define rem equals to the entireScreenWidth / 380
const entireScreenWidth = Dimensions.get("window").width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export const styles = EStyleSheet.create({
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)"
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center"
  },
  searchResults: {
    flex: 1,
  },
  item: {
    padding: "10rem",
  },
  title: {
    fontSize: "16rem",
    fontFamily: "quicksand-bold"
  },
  changeLocationContainer: {
    height: "55rem",
    width: "100%",
    backgroundColor: "#B0B4B7",
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "5rem",
  },
  searchIcon: {
    width: '20rem',
    height: '20rem',
    resizeMode: "contain",
    marginLeft: "10rem"
  },
  compassIcon: {
    width: '24rem',
    height: '24rem',
    resizeMode: "contain",
    marginLeft: "5rem"
  },
  searchBar: {
    height: "20rem",
    width: "75%",
    fontFamily: "quicksand-bold",
    color: "white",
    fontSize: "16rem",
    marginLeft: '18rem'
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)"
  }
});
