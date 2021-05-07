import {
  sizeHeight,
  sizeWidth,
  sizeFont,
} from "../../utils/helper/size.helper";
import { COLOR } from "../../utils/color/colors";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  container: {
    marginTop: sizeHeight(1),
    width: sizeWidth(96),
    alignSelf: "center",
    backgroundColor: "#fff",
  },
  touchOne: {
    flexDirection: "row",
    //marginRight: sizeWidth(2),
    paddingVertical: sizeHeight(1),
    //paddingHorizontal: sizeWidth(1),
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  touchTwo: {
    flexDirection: "row",
    paddingVertical: sizeHeight(1),
    //paddingHorizontal: sizeWidth(1),
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
    flex: 1,
    marginRight: sizeWidth(1),
  },
  textFirst: {
    fontSize: sizeFont(4),
    color: "#000",
    marginRight: sizeWidth(2),
    marginBottom: sizeHeight(-1),
  },
  textSecond: {
    fontSize: sizeFont(4),
  },
  viewIcon: {
    backgroundColor: COLOR.BUTTON,
    width: sizeFont(7),
    borderRadius: 8,
    alignItems: "center",
    height: sizeFont(7),
  },
  touchSearch: {
    marginTop: sizeHeight(1),
    backgroundColor: COLOR.BUTTON,
    //borderRadius: 6,
    paddingVertical: sizeHeight(0.7),
    //width: sizeWidth(1),
    alignSelf: "center",
    paddingHorizontal: sizeWidth(3),
    flex: 0.2,
  },
  touchSearchColl: {
    marginTop: sizeHeight(1),
    backgroundColor: COLOR.BUTTON,
    borderRadius: 6,
    paddingVertical: sizeHeight(1.5),
    width: sizeWidth(50),
    alignSelf: "center",
  },
  touchCommon: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#999",
    borderBottomWidth: 0.5,
    paddingVertical: sizeHeight(2),
  },

  viewTouchCommon: {
    width: sizeWidth(95),
    alignSelf: "center",
    marginTop: sizeHeight(2),
  },
  textCommon: {
    fontSize: sizeFont(4),
    fontWeight: "400",
  },
  containerCommon: {
    marginTop: sizeHeight(1),
  },
  textColl: {
    fontSize: sizeFont(4),
    fontWeight: "bold",
    color: "#fff",
  },
  viewColl: {
    borderBottomWidth: 4,
    borderBottomColor: "#ddd",
    borderTopColor: "#ddd",
    borderTopWidth: 4,
    paddingVertical: sizeHeight(1.5),
    marginTop: sizeHeight(1),
  },
  viewPerson: {
    flexDirection: "row",
    //justifyContent: "space-between",
  },
  viewChildPerson: {
    backgroundColor: COLOR.BUTTON,
    paddingVertical: sizeHeight(1),
    paddingHorizontal: sizeWidth(3),
    borderRightWidth: 1,
    borderRightColor: "#fff",
    flex: 1,
    alignItems: "center",
  },
});
export default styles;
