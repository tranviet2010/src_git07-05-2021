import {
  sizeHeight,
  sizeWidth,
  sizeFont,
} from "../../../../../utils/helper/size.helper";
import { COLOR } from "../../../../../utils/color/colors";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  viewTitle: {
    flexDirection: "row",
    paddingVertical: sizeHeight(2),
    justifyContent: "space-between",
    paddingHorizontal: sizeWidth(2.5),
    alignItems: "center",
    alignContent: "center",
  },
  textInputTitle: {
    borderWidth: 1,
    width: sizeWidth(78),
    borderColor: "#999",
    paddingVertical: sizeHeight(1.5),
    paddingHorizontal: sizeWidth(2.5),
  },
  textTitle: {
    fontSize: sizeFont(4),
  },
  viewContent: {
    paddingHorizontal: sizeWidth(2.5),
  },
  textInputContent: {
    borderWidth: 1,
    borderColor: "#999",
    paddingVertical: sizeHeight(1.5),
    paddingHorizontal: sizeWidth(2.5),
    marginVertical: sizeHeight(2),
    paddingBottom: sizeHeight(20),
  },
  touchAdd: {
    backgroundColor: COLOR.BUTTON,
    width: sizeWidth(40),
    alignSelf: "center",
    borderRadius: 6,
    paddingVertical: sizeHeight(2),
  },
  textAdd: {
    color: "#fff",
    textAlign: "center",
    fontSize: sizeFont(4),
  },
  image: {
    width: sizeWidth(30),
    height: sizeHeight(20),
  },
});

export default styles;
