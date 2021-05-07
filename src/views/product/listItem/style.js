import {
  sizeHeight,
  sizeWidth,
  sizeFont,
} from "../../../utils/helper/size.helper";
import { COLOR } from "../../../utils/color/colors";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  viewHeader: {
    //backgroundColor: "#ddd",
    paddingVertical: sizeHeight(1.5),
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    paddingHorizontal: sizeWidth(2.5),
    backgroundColor: "#fff",
    // backgroundColor: "#fff",
  },
  textPrice1:{
    flexDirection:'row',
    alignItems:'center',
   
  },  
  textPrice: {
    color: 'red',
    fontSize: sizeFont(3.8),
    paddingVertical: sizeHeight(1),
    //paddingHorizontal: sizeWidth(2),
  },
  imageCart:{
    width:sizeWidth(9),
    height:sizeHeight(5),
    marginLeft:sizeWidth(10),
  },
  touchViewMore: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  textViewMore: {
    fontSize: sizeFont(4),
    color: "#166CEE",
    paddingHorizontal: sizeWidth(5),
  },
  title: {
    fontSize: sizeFont(4.5),
    fontWeight: "400",
  },
  touchFlatListChild: {
    // borderRadius: 6,
    // borderColor: COLOR.BUTTON,
    // borderWidth: 0.5,
    marginVertical: sizeHeight(1),
    // marginHorizontal: sizeWidth(2),
    width: sizeWidth(38),
    //width: sizeWidth(30),
    overflow: "hidden",
    borderColor:'#F1F2F2',
    borderWidth:1,
    marginRight: sizeWidth(2),
  },
  touchPlus: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: sizeFont(4),
    width: sizeFont(8),
    height: sizeFont(8),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: sizeWidth(4),
  },
  viewList: {
    width: sizeWidth(5),
    height: sizeWidth(5),
    backgroundColor: "red",
    color: "#fff",
    borderRadius: sizeWidth(2.5),
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: sizeHeight(-1),
    right: sizeWidth(-1),
  },
  imageSize: {
    width: "100%",
    // width: sizeWidth(30),
    height: "100%",
    //height: sizeHeight(20),
    overflow: "visible",
  },
  textName: {
    fontSize: sizeFont(3.5),
    paddingVertical: sizeHeight(3.5),
    
    //paddingHorizontal: sizeWidth(2),

    paddingVertical: sizeHeight(1),
  },
  textCode: {
    fontSize: sizeFont(4),
    fontWeight: "bold",
    // paddingHorizontal: sizeWidth(2),
  },
  textPrice: {
    color: COLOR.PRICE,
    fontSize: sizeFont(3.8),
    // fontWeight:"bold",
    paddingVertical: sizeHeight(1),
    //paddingHorizontal: sizeWidth(2),
  },
  viewChildDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: sizeWidth(2),
    marginBottom: sizeHeight(1),
    alignItems: "center",
    alignContent: "center",
  },
  viewCount: {
    borderWidth: 1,
    borderColor: COLOR.BUTTON,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  textCount: {
    backgroundColor: COLOR.BUTTON,
    color: "#fff",
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
  touchSafeBuy: {
    backgroundColor: COLOR.BUTTON,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  touchSafeAddCart: {
    backgroundColor: COLOR.HEADER,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius:50,
  },
  viewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLOR.HEADER,
    paddingVertical: sizeHeight(1.5),
    marginTop: Platform.OS == "ios" ? sizeHeight(4) : 0,
    paddingHorizontal: sizeWidth(1),
  },
  textProduct: {
    color: "#fff",
    fontSize: sizeFont(4),
  },
  touchView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingVertical: sizeHeight(1.5),
  },
  textView: {
    fontSize: sizeFont(3.5),
    marginTop: sizeHeight(1.5),
  },
});
export default styles;
