import React, { Component } from "react";
import { View } from "react-native";

import { UIActivityIndicator, SkypeIndicator } from "react-native-indicators";

import {
  sizeHeight,
  sizeWidth,
  sizeFont,
} from "../../utils/helper/size.helper";
import { COLOR } from "../../utils/color/colors";

export default class Loading extends Component {
  render() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: sizeHeight(4),
          marginBottom: sizeHeight(3),
          width: sizeWidth(85),
          //height: sizeHeight(50),
          alignSelf: 'center',
        }}
      >
        <SkypeIndicator color={COLOR.MAIN} size={sizeFont(10)} />
      </View>
    );
  }
}
