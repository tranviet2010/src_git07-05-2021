import {
    sizeHeight,
    sizeWidth,
    sizeFont,
  } from "../../../utils/helper/size.helper";
  import { COLOR } from "../../../utils/color/colors";
  
  const { StyleSheet, Platform } = require("react-native");
  
  const styles = StyleSheet.create({
    viewAvatar: {
      alignItems: "center",
      marginTop: sizeHeight(2),
    },
    viewTouchCamera: {
      borderRadius: sizeFont(5),
      borderWidth: 1,
      borderColor: COLOR.HEADER,
      width: sizeFont(10),
      height: sizeFont(10),
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      right: sizeWidth(20),
      bottom: sizeHeight(0),
    },
    container1: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor:COLOR.HEADER,
  },
  container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderWidth: 0.5,
      borderColor: '#149CC6',
  },
  children: {
      borderRightColor: '#149CC6',
      borderRightWidth: 0.5,
      width: sizeWidth(70),
      justifyContent: 'center',
      padding: 8,
  },
  children1: {
      width: sizeWidth(70),
      borderRightColor: '#fff',
      borderRightWidth: 0.5,
  },
  cuttoms: {
      marginTop: 5,
      padding: 10,
      backgroundColor: COLOR.HEADER,
      alignItems: 'center',
      width: sizeWidth(30),
  },
  confix: {
      width: sizeWidth(30),
      borderColor: '#4a8939',
      paddingLeft: 10,
      paddingRight: 10,
      borderWidth: 0.5,
      borderRadius: 5,
      height: sizeHeight(5),
      justifyContent: 'center',
  },
    centeredView: {
      flex: 1,
      justifyContent:'flex-end',
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      width:sizeWidth(100),
      height:sizeHeight(50),
      backgroundColor: "#fff",
      
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "#2196F3",
      fontWeight: "bold",
      textAlign: "center",
      fontSize:sizeFont(5),
      marginTop:sizeHeight(1),
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
  
  
  
  
    styleChild: {
      borderRadius: 6,
      height: 55,
      overflow: "hidden",
      borderWidth: 0.8,
      borderColor: COLOR.COLOR_ICON,
      width: sizeWidth(92),
      alignSelf: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      alignContent: "center",
    },
    styleWidth: {
      borderBottomWidth: 0,
      borderTopWidth: 0,
      width: sizeWidth(90),
      marginTop: sizeHeight(1),
    },
    infor: {
      backgroundColor: COLOR.HEADER,
      paddingVertical: sizeHeight(1.5),
    },
    textInfor: {
      fontSize: sizeFont(4.5),
      fontWeight: "bold",
      color: "#fff",
      marginLeft: sizeWidth(2.5),
    },
    viewGender: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: sizeWidth(92),
      alignSelf: "center",
      marginTop: sizeHeight(1),
    },
    textDayOfBirth: {
      fontSize: sizeFont(4),
      borderRadius: 6,
      borderWidth: 0.8,
      //paddingHorizontal: sizeWidth(5),
      textAlign: "left",
      paddingRight: sizeWidth(8),
      borderColor: COLOR.COLOR_ICON,
      backgroundColor: "#fff",
      paddingLeft: sizeWidth(2),
      paddingVertical: sizeHeight(1),
    },
    textDayTitle: {
      fontSize: sizeFont(4),
      marginBottom: sizeHeight(1),
    },
    viewChildGender: {
      flexDirection: "row",
      backgroundColor: "#ddd",
      borderRadius: 6,
      paddingVertical: 2,
      paddingHorizontal: 2,
      width: sizeWidth(27),
    },
    textGender: {
      flex: 1,
      fontSize: sizeFont(4),
      borderRadius: 6,
      backgroundColor: "#fff",
      paddingHorizontal: sizeWidth(2),
      paddingVertical: sizeHeight(0.7),
      textAlign: "center",
      overflow: "hidden",
    },
    viewImage: {
      flexDirection: "row",
      marginTop: sizeHeight(2),
      alignSelf: "center",
      width: sizeWidth(90),
    },
    viewImageChild: {
      alignItems: "center",
      flex: 1,
      justifyContent: "center",
    },
    viewCMT: {
      backgroundColor: "#fff",
      width: sizeWidth(40),
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: sizeHeight(2),
      borderRadius: 3,
      marginTop: sizeHeight(2),
    },
    touchCMT: {
      borderRadius: sizeFont(15),
      borderWidth: 0.2,
      borderColor: COLOR.BUTTON,
      width: sizeFont(30),
      height: sizeFont(30),
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      //marginTop: sizeHeight(2),
    },
    imageCMT: {
      borderWidth: 0.2,
      borderColor: COLOR.BUTTON,
      width: sizeWidth(35),
      height: sizeWidth(35),
      overflow: "hidden",
    },
  });
  
  export default styles;
  