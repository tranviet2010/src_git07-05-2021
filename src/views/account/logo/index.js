import React, { Component } from "react";
import { View, Image } from "react-native";
import { sizeWidth, sizeHeight } from "../../../utils/helper/size.helper";
import styles from "./styles";

export default class LogoApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.image}
        />
      </View>
    );
  }
}
