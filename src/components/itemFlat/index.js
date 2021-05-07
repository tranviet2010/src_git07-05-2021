import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLOR } from "../../utils/color/colors";
import IconComponets from "../icon";
import { sizeFont, sizeHeight } from "../../utils/helper/size.helper";

export default class ItemCommon extends Component {
  render() {
    const { title, name, onPress } = this.props;
    return (
      <TouchableOpacity style={styles.touchCommon} onPress={onPress}>
        <Text style={styles.textCommon}>{title} </Text>
        <IconComponets
          name={name}
          size={sizeFont(4)}
          color={COLOR.COLOR_ICON}
          solid
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  touchCommon: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#999",
    borderBottomWidth: 0.5,
    paddingVertical: sizeHeight(2),
  },

  textCommon: {
    fontSize: sizeFont(4),
    fontWeight: "400",
  },
});
