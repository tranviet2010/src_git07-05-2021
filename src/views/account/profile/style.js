import {
  sizeHeight,
  sizeFont,
  sizeWidth,
} from "../../../utils/helper/size.helper";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  touchCommon: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#ddd",
    borderBottomWidth: 0.8,
    paddingVertical: sizeHeight(2),
    paddingHorizontal: sizeWidth(3),
    width: sizeWidth(95),
    alignSelf: "center",
    paddingLeft: sizeWidth(5),
  },
  textTitle: {
    backgroundColor: "#ddd",
    fontSize: sizeFont(4.5),
    fontWeight: "bold",
    paddingVertical: sizeHeight(2),
    paddingHorizontal: sizeWidth(2.5),
  },
  textContent: {},
});
export default styles;
