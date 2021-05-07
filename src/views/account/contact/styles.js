import {
  sizeWidth,
  sizeHeight,
  sizeFont,
} from "../../../utils/helper/size.helper";
import { COLOR } from "../../../utils/color/colors";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  touchView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: sizeWidth(5),
    paddingRight: sizeWidth(2.5),
    paddingVertical: sizeHeight(1.7),
    width: sizeWidth(95),
    alignSelf: "center",
  },
  container: {
    width: sizeWidth(100),
    //marginTop: sizeHeight(4),
  },
  textTitle: {
    backgroundColor: COLOR.BACKGROUD,
    paddingVertical: sizeHeight(1.5),
    color: COLOR.TEXT,
    fontSize: sizeFont(4),
    fontWeight: "500",
    paddingHorizontal: sizeWidth(2.5),
  },
  textEmail: {
    textDecorationLine: "underline",
    color: "blue",
    fontSize: sizeFont(4),
  },
  textPhone: {
    fontSize: sizeFont(4),
    color: COLOR.BUTTON_SIGN_IN,
    fontStyle: "italic",
  },
});
export default styles;
