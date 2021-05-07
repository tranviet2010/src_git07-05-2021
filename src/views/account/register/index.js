import React, { Component } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import styles from "./styles";
import { COLOR } from "../../../utils/color/colors";
import { sizeFont, sizeHeight, sizeWidth } from "../../../utils/helper/size.helper";


export default class Register extends Component {

  showAll = () => {
    return Alert.alert(
      `${this.props.fullname}`,
      `${this.props.discription}`,
      [
        {
          text: "Đóng",
          style: "destructive",
        },

      ],
      { cancelable: false }
    );
  };
  render() {
    const { navigation, discription } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.viewTitle}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#4B4C4B'}}>{this.props.fullname}</Text>
          {discription == null ? <Text></Text> : <Text>
            {((discription).length > 250) ?
              (((discription).substring(0, 249)) + '...') :
              discription}
            <Text onPress={() => { this.showAll() }} style={{ justifyContent: 'center', alignItems: 'center' }}>Xem thêm</Text>
          </Text>}
        </View>
        <View style={{ marginTop: sizeHeight(7) }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("screenHome")}
            style={[
              styles.touchRegister,
              { backgroundColor: COLOR.BUTTON_SIGN_UP },
            ]}
          >
            <Text style={styles.textSignin}>Bắt đầu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchRegister}
            onPress={() => navigation.navigate("StartTwo")}
          >
            <Text style={styles.textSignin}>Thay đổi shop</Text>
          </TouchableOpacity>
        </View>


        {/* <TouchableOpacity
          onPress={() => navigation.navigate("StartTwo")}
          style={{ marginTop: sizeHeight(15) }}
        >
          <Text style={{ color: 'white', textDecorationStyle: 'solid', fontSize: sizeFont(4.5) }}>Thay đổi shop</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}
