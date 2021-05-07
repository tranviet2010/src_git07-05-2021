import { StyleSheet, Platform } from "react-native";
import { COLOR } from "../../../utils/color/colors";
import {
  sizeHeight,
  sizeFont,
  sizeWidth,
} from "../../../utils/helper/size.helper";
const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLOR.HEADER,
    paddingVertical: sizeHeight(1.5),
    marginTop: Platform.OS == "ios" ? sizeHeight(4) : 0,
    paddingHorizontal: sizeWidth(1),
  },
  textProduct: {
    color: "#fff",
    fontSize: sizeFont(4),
  },
  touchView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingVertical: sizeHeight(1.5),
  },
  textView: {
    fontSize: sizeFont(3.5),
    marginTop: sizeHeight(1.5),
  },
});

export default styles;
