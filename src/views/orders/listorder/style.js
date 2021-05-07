import {
  sizeWidth,
  sizeHeight,
  sizeFont,
} from "../../../utils/helper/size.helper";
import { COLOR } from "../../../utils/color/colors";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  touchView: {
    width: sizeWidth(96),
    alignSelf: "center",
    borderWidth: 0.3,
    borderColor: COLOR.BUTTON,
    borderRadius: 6,
    marginVertical: sizeHeight(1),
    paddingVertical: sizeHeight(1),
    paddingHorizontal: sizeWidth(2),
    backgroundColor: "#fff",
  },
  viewChild: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: sizeHeight(1.2),
    alignItems: "center",
    alignContent: "center",
  },
  viewInfor: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLOR.BUTTON,
    paddingVertical: sizeHeight(2),
    paddingHorizontal: sizeWidth(2),
    marginTop: sizeHeight(2),
  },
  viewChildInfor: {
    flexDirection: "row",
    //justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    borderBottomColor: "#DDD",
    borderBottomWidth: 2,
    paddingVertical: sizeHeight(1),
  },
  viewSubChildInfor: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    marginRight: sizeWidth(7),
  },
  textInfor: {
    position: "absolute",
    top: sizeHeight(-1.3),
    left: sizeWidth(5),
    zIndex: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    paddingHorizontal: sizeWidth(2),
    color: "#888",
  },
  textChildInfor: {
    marginLeft: sizeWidth(2),
    fontSize: sizeFont(3.8),
    color: "#017DFF",
  },
  textCode: {
    fontWeight: "bold",
    fontSize: sizeFont(4),
  },
  textStatus: {
    //backgroundColor: COLOR.BLUE,
    color: "#999",
    textAlign: "center",
    paddingHorizontal: sizeWidth(2),
    paddingVertical: sizeHeight(0.3),
    // color: "#666",
    fontSize: sizeFont(3.8),
    borderRadius: 2,
  },
  textCommon: {
    fontSize: sizeFont(4.5),
    fontWeight: "400",
  },
  textCommonTitle: {
    color: "#000",
    fontSize: sizeFont(4.5),
  },
  textMoney: {
    fontWeight: "bold",
    fontSize: sizeFont(4.5),
    color: "red",
  },
  textStore: {
    textDecorationLine: "underline",
    color: "#017DFF",
    fontSize: sizeFont(4),
  },
});

export default styles;
