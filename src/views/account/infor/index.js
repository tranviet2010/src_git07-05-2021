import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5Pro from "react-native-vector-icons/FontAwesome5";
import IconComponets from "../../../components/icon";
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../utils/helper/size.helper";
import { COLOR } from "../../../utils/color/colors";
import styles from "./styles";

export default class Information extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>Thông tin</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("About")}
          style={[
            styles.touchView,
            {
              borderBottomWidth: 1,
              borderBottomColor: "#ddd",
            },
          ]}
        >
          <Text style={{ fontSize: sizeFont(4) }}>Về chúng tôi</Text>
          <IconComponets
            size={sizeFont(4)}
            color={COLOR.COLOR_RIGHT}
            name="chevron-right"
            solid
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchView}>
          <Text style={{ fontSize: sizeFont(4) }}>Điều khoản</Text>
          <IconComponets
            size={sizeFont(4)}
            color={COLOR.COLOR_RIGHT}
            name="chevron-right"
            solid
          />
        </TouchableOpacity>
      </View>
    );
  }
}
