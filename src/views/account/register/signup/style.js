import { COLOR } from "../../../../utils/color/colors";
import {
  sizeHeight,
  sizeWidth,
  sizeFont,
} from "../../../../utils/helper/size.helper";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  conatainer: {
    backgroundColor: "#4d7335",
  },
  logo: { marginTop: sizeHeight(-5) },

  touchSignUp: {
    backgroundColor: COLOR.BUTTON,
    paddingVertical: sizeHeight(2),
    borderRadius: 6,
    width: sizeWidth(73),
  },
  textSignUp: {
    textAlign: "center",
    fontWeight: "600",
    color: "#fff",
    fontSize: sizeFont(4),
  },
  viewFooter: {
    alignSelf: "center",
    marginTop: sizeHeight(6),
  },
  logoSignup:{
    marginTop:sizeHeight(5),
    justifyContent: "center",
    alignItems: "center",
  },  
  iconSignup:{
    justifyContent: "center",
    alignItems: "center",
    width:sizeWidth(30),
    height:sizeHeight(15),
    borderRadius:100,
    backgroundColor:'white',
  },
  viewSignup:{
    
  },  
  textFoot: { textAlign: "center", fontSize: sizeFont(4) },
});

export default styles;
