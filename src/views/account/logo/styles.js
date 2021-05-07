import { sizeHeight, sizeWidth } from "../../../utils/helper/size.helper";
import { ifIphoneX } from "react-native-iphone-x-helper";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  container: {
    width:150,
    height:150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: sizeHeight(2),
    marginTop: sizeHeight(6),
    backgroundColor:'#fff',
    borderRadius:100,

  },
  image: {
    width: 130,
    height: 130,
  },
});

export default styles;
