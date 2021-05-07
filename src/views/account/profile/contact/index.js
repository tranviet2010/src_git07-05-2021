import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../style";
import IconComponets from "../../../../components/icon";
import { sizeFont } from "../../../../utils/helper/size.helper";
import { COLOR } from "../../../../utils/color/colors";

class Contact extends Component {
  render() {
    const { authUser } = this.props;
    return (
      <View style={{}}>
        <Text style={styles.textTitle}>Liên hệ</Text>
        <TouchableOpacity style={styles.touchCommon}>
          <Text style={styles.textContent}>Email</Text>
          <Text>{authUser.EMAIL} </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchCommon}>
          <Text style={styles.textContent}>Hotline</Text>
          <Text style={styles.textContent}>094 398 360</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default Contact;
