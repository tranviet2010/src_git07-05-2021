import { COLOR } from "../../../utils/color/colors";
import {
  sizeHeight,
  sizeWidth,
  sizeFont,
} from "../../../utils/helper/size.helper";
import { size } from "lodash";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  touchRegister: {
    backgroundColor: COLOR.BUTTON_SIGN_IN,
    justifyContent:'center',
    alignItems:'center',
    height:sizeHeight(5),
    width: sizeWidth(50),
    marginTop: sizeHeight(3),
    borderRadius:50,
  },
  textSignin: {
    color: "#fff",
    textAlign: "center",
    fontSize: sizeFont(3.5),
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  viewTitle: {
    height:sizeHeight(20),
    width:sizeWidth(88),
    borderRadius:10,
    borderColor:'#FCF5F5',
    backgroundColor:'#FCF5F5',
    fontSize: sizeFont(4),
    padding: 5,
  },
});

export default styles;
