import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import IconComponets from "../../../components/icon";
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../utils/helper/size.helper";
import { COLOR } from "../../../utils/color/colors";
import styles from "./styles";

export default class Contact extends Component {
  render() {
    
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>Liên hệ</Text>
        <TouchableOpacity
          style={[
            styles.touchView,
            {
              borderBottomWidth: 1,
              borderBottomColor: "#ddd",
            },
          ]}
        >
          <Text style={{ fontSize: sizeFont(4) }}>Email</Text>
          <Text style={styles.textEmail}>babumart@gmail.com</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchView}>
          <Text style={{ fontSize: sizeFont(4) }}>Hotline</Text>
          <Text style={styles.textPhone}>094 398 360</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
