import { StyleSheet } from "react-native";
import { sizeHeight, sizeWidth, sizeFont } from "../../../../../utils/helper/size.helper";
import { COLOR } from "../../../../../utils/color/colors";

const styles = StyleSheet.create({
  viewTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: sizeHeight(2),
    justifyContent: "space-between",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: sizeHeight(2),
    borderRadius: 2,
    width: sizeWidth(80),
    paddingHorizontal: sizeWidth(2),
  },
  container: {
    width: sizeWidth(96),
    alignSelf: "center",
  },
  textInputContent: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: sizeHeight(2),
    borderRadius: 2,
    width: sizeWidth(96),
    paddingHorizontal: sizeWidth(2),
  },
  textContent: {
    marginTop: sizeHeight(2),
    marginBottom: sizeHeight(1),
    fontSize: sizeFont(4),
  },
  title: {
    fontSize: sizeFont(4),
  },
  touch: {
    backgroundColor: COLOR.BUTTON,
    borderRadius: 6,
    width: sizeWidth(30),
    paddingVertical: sizeHeight(1.5),
    alignSelf: "center",
    marginTop: sizeHeight(2),
  },
  textTouch: {
    color: "#fff",
    textAlign: "center",
  },
});

export default styles;
