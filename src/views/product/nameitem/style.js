import {
  sizeHeight,
  sizeWidth,
  sizeFont,
} from "../../../utils/helper/size.helper";
import { COLOR } from "../../../utils/color/colors";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000000",
    marginLeft: 10,
  },
  text_active: {
    fontSize: 18,
    fontWeight: "500",
    color: "#ffffff",
    marginLeft: 10,
  },
  item_active: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLOR.HEADER,
    height: sizeHeight(6),
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "rgb(72,72,72)",
    borderWidth: 0.4,
    height: sizeHeight(6),
    marginBottom: 10,
  },
  icon_expand: {
    borderLeftColor: "rgb(72,72,72)",
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 0.4,
    height: sizeHeight(6),
  },
  icon_expand_active: {
    borderLeftColor: "#ffffff",
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
    height: sizeHeight(6),
  },
  item_child: {
    marginLeft: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  viewOption: {
    flexDirection: "row",
    position: "absolute",
    right: sizeWidth(15),
    alignItems: "center",
    alignContent: "center",
  },
  touchTrash: {
    marginRight: sizeWidth(5),
  },
  viewChose: {
    width: sizeWidth(5),
    height: sizeWidth(5),
    borderRadius: sizeWidth(2.5),
    backgroundColor: COLOR.BUTTON,
  },
  viewEdit: {
    backgroundColor: "#fff",
    width: sizeWidth(101),
    alignSelf: "center",
  },
  textInputEdit: {
    width: sizeWidth(96),
    paddingVertical: sizeHeight(1.5),
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#ddd",
    alignSelf: "center",
    marginTop: sizeHeight(5),
    paddingHorizontal: sizeWidth(2),
  },
  touchEdit: {
    backgroundColor: COLOR.BUTTON,
    paddingVertical: sizeHeight(1.5),
    width: sizeWidth(40),
    alignSelf: "center",
    borderRadius: 6,
    marginVertical: sizeHeight(3),
  },
  textEdit: {
    color: "#ffff",
    textAlign: "center",
    fontSize: sizeFont(4),
  },
});

export default styles;
