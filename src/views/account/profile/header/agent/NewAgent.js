import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  sizeHeight,
  sizeWidth,
  sizeFont,
} from "../../../../../utils/helper/size.helper";
import { COLOR } from "../../../../../utils/color/colors";

export default class NewAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      percent: 0,
    };
  }
  render() {
    const { name, percent } = this.state;
    return (
      <View>
        <View style={styles.viewTextInput}>
          <Text>Tên cấp đại lý</Text>
          <TextInput
            value={name}
            onChangeText={(text) => this.setState({ name: text })}
            style={styles.textInput}
          />
        </View>
        <View style={styles.viewTextInput}>
          <Text>Phần trăm kênh giá</Text>
          <TextInput
            value={percent}
            onChangeText={(text) => this.setState({ percent: text })}
            keyboardType="number-pad"
            style={styles.textInput}
          />
        </View>
        <TouchableOpacity style={styles.touch}>
          <Text style={styles.textAdd}>Thêm mới</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  touch: {
    paddingVertical: sizeHeight(1.5),
    width: sizeWidth(40),
    borderRadius: 6,
    backgroundColor: COLOR.BUTTON,
    alignSelf: "center",
    marginVertical: sizeHeight(2),
  },
  textAdd: {
    textAlign: "center",
    color: "#fff",
    fontSize: sizeFont(4),
  },
  textInput: {
    width: sizeWidth(60),
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: sizeHeight(1.5),
    paddingHorizontal: sizeWidth(2.5),
  },
  viewTextInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: sizeHeight(2),
    alignItems: "center",
    marginHorizontal: sizeWidth(2.5),
  },
});
