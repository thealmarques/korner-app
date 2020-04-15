import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const entireScreenWidth = Dimensions.get("window").width;
let factor = 380;
if (entireScreenWidth > 500) {
  factor = 440;
}
EStyleSheet.build({ $rem: entireScreenWidth / factor });

export class Styles {
  stylesheet: EStyleSheet.AnyObject;
  constructor(props: any) {
    const width = Dimensions.get("screen").width / props.visibleElements;
    const fontSize = parseInt(props.fontSize.toString().split('rem')[0], 10);
    this.stylesheet = EStyleSheet.create({
      container: {
        marginHorizontal: props.marginHorizontal,
        height: props.height,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      },
      item: {
        width: width,
        justifyContent: "center",
        alignItems: "center",
      },
      mainTextSelected: {
        fontSize: props.fontSize,
        fontFamily: props.fontFamily,
        color: props.mainColor,
        lineHeight: props.fontSize,
      },
      mainTextNotSelected: {
        fontSize: fontSize - 3 + 'rem',
        fontFamily: props.fontFamily,
        color: props.secondaryColor,
        lineHeight: fontSize - 3 + 'rem'
      },
      smallTextSelected: {
        fontSize: fontSize - 6 + 'rem',
        fontFamily: props.fontFamily,
        color: props.mainColor,
        lineHeight: fontSize - 6 + 'rem',
      },
      smallTextNotSelected: {
        fontSize: fontSize - 7 + 'rem',
        fontFamily: props.fontFamily,
        color: props.secondaryColor,
        lineHeight: fontSize - 7 + 'rem',
      }
    });
  }
}
