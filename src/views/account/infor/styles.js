import { sizeWidth, sizeHeight, sizeFont } from "../../../utils/helper/size.helper";
import { COLOR } from "../../../utils/color/colors";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  touchView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: sizeWidth(5),
    paddingRight: sizeWidth(2.5),
    paddingVertical: sizeHeight(1.5),
    width: sizeWidth(95),
    alignSelf: "center",
  },
  container: {
    width: sizeWidth(100),
    marginTop: sizeHeight(4),
  },
  textTitle: {
    backgroundColor: COLOR.BACKGROUD,
    paddingVertical: sizeHeight(1.5),
    color: COLOR.TEXT,
    fontSize: sizeFont(4),
    fontWeight: "500",
    paddingHorizontal: sizeWidth(2.5),
  },
});
export default styles;
