import { COLOR } from "../../utils/color/colors";
import {
  sizeWidth,
  sizeHeight,
  sizeFont,
} from "../../utils/helper/size.helper";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  textRed: {
    color: COLOR.BUTTON,
    fontSize: sizeFont(4),
  },
  textInput: {
    width: sizeWidth(65),
    borderWidth: 1,
    borderRadius: 1,
    paddingVertical: sizeHeight(1),
    borderColor: "#999",
    paddingHorizontal: sizeWidth(2),
  },
  viewFlex: {
    flexDirection: "row",
    width: sizeWidth(96),
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: sizeHeight(2),
  },
  textTitle: {
    fontSize: sizeFont(4),
  },
  fontRed: {
    fontSize: sizeFont(3),
    color: COLOR.BUTTON,
    width: sizeWidth(65),
  },
  textInputDown: {
    width: sizeWidth(55.5),
    paddingVertical: sizeHeight(1),
  },
  viewFlexDown: {
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#999",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: sizeWidth(2),
  },
  viewFlexPrice: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    width: sizeWidth(65),
  },
  textInputPrice: {
    width: sizeWidth(55.5),
    paddingVertical: sizeHeight(1),
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#999",
    paddingHorizontal: sizeWidth(2),
  },
  viewShop: {
    paddingVertical: sizeHeight(1),
    // marginVertical: sizeHeight(2),
    width: sizeWidth(96),
    alignSelf: "center",
  },
  textShop: {
    color: "#fff",
    textAlign: "center",
  },
  viewChildShop: {
    backgroundColor: COLOR.BUTTON,
    paddingVertical: sizeHeight(1),
    marginRight: sizeWidth(2),
  },
  textDetailShop: {
    color: "#000",
    textAlign: "center",
  },
  textInputChildPrice: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 4,
    paddingVertical: sizeHeight(1),
    paddingHorizontal: sizeWidth(2),
    width: "100%",
  },
});
export default styles;