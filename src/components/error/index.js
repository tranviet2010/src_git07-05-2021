import React, { Component } from "react";
import { View, Text, Alert } from "react-native";
import { Toast, Container } from "native-base";
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../utils/helper/size.helper";
import { ActivityIndicator } from "react-native-paper";

export const ToastCommon = (props) => {
  const { res } = props.props;
  alert(1);
  Toast.show({
    text: res.data.RESULT,
    duration: 3000,
    textStyle: {
      color: "red",
      fontSize: sizeFont(4),
      textAlign: "center",
    },
    style: {
      backgroundColor: "#ddd",
      borderRadius: 6,
    },
  });
};
export const ElementCustom = () => {
  return (
    <View
      style={{
        width: sizeWidth(20),
        height: sizeWidth(20),
        borderRadius: 10,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size={sizeFont(10)} color="#999" animating={true} />
    </View>
  );
};
export const AlertCommon = (title, message, onBack) => {
  //alert(message);
  return Alert.alert(
    title,
    message,
    [
      {
        text: "OK",
        onPress: () => onBack(),
        style: "default",
      },
    ],
    { cancelable: false }
  );
};
export const AlertCommonLogin = (
  title,
  message,
  onCancel,
  onBack,
  textOne,
  textTwo
) => {
  //alert(message);

  return Alert.alert(
    title,
    message,
    [
      {
        text: textOne,
        onPress: () => onCancel(),
        style: "destructive",
      },
      {
        text: textTwo,
        onPress: () => onBack(),
        style: "default",
      },
    ],
    { cancelable: false }
  );
};

export default class ErrorDisplay extends Component {
  render() {
    const { message } = this.props;
    return (
      <View style={{ marginTop: sizeHeight(2), width: sizeWidth(90) }}>
        <Text
          style={{ fontSize: sizeFont(4), color: "red", textAlign: "center" }}
        >
          {message}{" "}
        </Text>
      </View>
    );
  }
}
