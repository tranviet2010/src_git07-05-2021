import { COLOR } from "../../utils/color/colors";
import {
  sizeWidth,
  sizeHeight,
  sizeFont,
} from "../../utils/helper/size.helper";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  viewChildDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: sizeWidth(2),
    marginBottom: sizeHeight(1.2),
    alignItems: "center",
    alignContent: "center",
  },
  viewCount: {
    borderWidth: 1,
    borderColor: COLOR.ORDER_BUTTON,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  textCount: {
    backgroundColor: COLOR.ORDER_BUTTON,
    color: "#222220",
    paddingHorizontal: sizeWidth(3),
    paddingVertical: sizeHeight(1),
    textAlign: "center",
    fontSize: sizeFont(4),
  },
  viewTab: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: COLOR.HEADER,
    marginTop: sizeHeight(1),
  },
  textTitle: {
    fontSize: sizeFont(4),
    color: "#444",
  },
});

export default styles;
