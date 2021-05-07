import React, { Component } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { sizeHeight, sizeWidth } from "../../utils/helper/size.helper";
import IconComponets from "../icon";

export default class SearchComponent extends Component {
  render() {
    const {
      onChangeText,
      value,
      name,
      size,
      color,
      isIcon,
      style,
      placeholder,
    } = this.props;
    return (
      <View
        style={[
          {
            borderRadius: 50,
            borderWidth: 3,
            borderColor: "#4d7335",
            width: sizeWidth(80),
          },
          style,
        ]}
      >
        {isIcon ? (
          <IconComponets name={name} color={color} size={size} />
        ) : null}
        <TextInput
          placeholder={placeholder}
          autoCapitalize='characters'
          onChangeText={onChangeText}
          value={value}
          style={{
            paddingVertical: sizeHeight(1.5),
            paddingHorizontal: sizeWidth(2),
            width: sizeWidth(70),
          }}
        />
      </View>
    );
  }
}
