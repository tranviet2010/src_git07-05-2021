import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Platform,
  Alert,
  Keyboard,
  TextInput,
} from "react-native";
import { ComponentSign } from "../../../../components/textinput";
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../../utils/helper/size.helper";
import { COLOR } from "../../../../utils/color/colors";
import styles from "./style";
import { checkPassword } from "../../../../utils/helper/password_validator";
import { AlertCommon } from "../../../../components/error";
import { regUser } from "../../../../service/auth";
import { result } from "lodash";
import IconComponets from "../../../../components/icon";
import {
  checkFullName,
  isVietnamesePhoneNumber,
  alphanumeric,
} from "../../../../utils/check";
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameText: "",
      phoneText: "",
      passwordText: "",
      emailText: "",
      cityText: "",
      districtText: "",
      addressText: "",
      idShop: "",
      codeinfo: "",
      confirmPassword: ""
    };

  }
  onBack = () => {
    this.props.navigation.popToTop();
    this.props.navigation.navigate("home");
  };
  handleReg = () => {
    const { phoneText, passwordText, emailText, cityText, districtText, addressText, confirmPassword, nameText } = this.state;
    const password = checkPassword(passwordText);
    var checkEmail = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
    Keyboard.dismiss();
    if (
      nameText.trim() == "" ||
      !alphanumeric(nameText) ||
      nameText.length > 50
    ) {
      AlertCommon(
        "Thông báo",
        "Vui lòng nhập họ và tên chỉ gồm chữ, không chứa các ký tự đặc biệt và nhỏ hơn 50 kí tự",
        () => null
      );
    } else if (phoneText.trim() == "" || !isVietnamesePhoneNumber(phoneText)) {
      AlertCommon(
        "Thông báo",
        "Vui lòng nhập số điện thoại và chỉ gồm 10 chữ số",
        () => null
      );
    } else if (!checkEmail.test(emailText)) {
      AlertCommon(
        "Thông báo",
        "Email không đúng định dạng",
        () => null
      );
    }else if (password.length == 0) {
      AlertCommon(
        "Mật khẩu yếu",
        "Mật khẩu phải có độ dài lớn hơn 8, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt",
        () => null
      );
    } else {
      if (confirmPassword !== passwordText) {
        AlertCommon("Thống báo", "Xác thực mật khẩu không chính xác", () => null
        );
      } else {
        regUser({
          FULL_NAME: nameText,
          MOBILE: phoneText,
          EMAIL: emailText,
          ID_CITY: "",
          ID_DISTRICT: "",
          ADDRESS: districtText,
          PASSWORD: passwordText,
          IDSHOP: "F6LKFY",
        })
          .then((result) => {
            if (result.data.ERROR == "0000") {
              return AlertCommon("Thông báo", result.data.RESULT, ()=>{this.props.navigation.navigate("SignIn")});
            } else {
              return AlertCommon("Thông báo", result.data.RESULT, () => null);
            }
          })
          .catch((err) => {
          });

      }
    }
  };
  render() {
    const { phoneText, passwordText, codeinfo, confirmPassword, emailText, cityText, districtText, addressText, idShop, nameText } = this.state;
    return (
      <ScrollView
        contentContainerStyle={styles.conatainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoSignup}>
          <View style={styles.iconSignup}><IconComponets name="user" size={sizeFont(15)} color="#4d7335" /></View>
          <View style={styles.viewSignup}>
            <Text style={{ fontSize: 30, textAlign: 'center' }}>CREATE <Text style={{ fontWeight: 'bold' }}>ACCOUT</Text></Text>
          </View>
          <Text style={{ backgroundColor: '#222220', width: 150, height: 5, marginTop: 8, borderRadius: 100 }}></Text>
        </View>
        <View>
          <ComponentSign
            placeholder="Họ và tên *"
            placeholderTextColor="#999"
            type="name"
            size={sizeFont(6)}
            value={nameText}
            onChangeText={(text) => this.setState({ nameText: text })}
            // primary={"#017DFF"}
            primary={"#fff"}
            color={COLOR.COLOR_ICON}
            onDelete={() => this.setState({ nameText: "" })}
          />
          <ComponentSign
            placeholder="Số điện thoại của bạn *"
            placeholderTextColor="#999"
            type="phone"
            size={sizeFont(6)}
            value={phoneText}
            onChangeText={(text) => this.setState({ phoneText: text })}
            // primary={"#017DFF"}
            primary={"#fff"}
            color={COLOR.COLOR_ICON}
            onDelete={() => this.setState({ phoneText: "" })}
          />
          <ComponentSign
            placeholder="Mã giới thiệu *"
            placeholderTextColor="#999"
            type="name"
            size={sizeFont(6)}
            value={codeinfo}
            onChangeText={(text) => this.setState({ codeinfo: text })}
            // primary={"#017DFF"}
            primary={"#fff"}
            color={COLOR.COLOR_ICON}
            onDelete={() => this.setState({ codeinfo: "" })}
          />
          <ComponentSign
            placeholder="Email"
            placeholderTextColor="#999"
            type="phone"
            size={sizeFont(6)}
            value={emailText}
            onChangeText={(text) => this.setState({ emailText: text })}
            // primary={"#017DFF"}
            primary={"#fff"}
            color={COLOR.COLOR_ICON}
            onDelete={() => this.setState({ phoneText: "" })}
          />
          {/* <ComponentSign
            placeholder="Tỉnh/thành phố *"
            placeholderTextColor="#999"
            type="phone"
            size={sizeFont(6)}
            value={cityText}
            onChangeText={(text) => this.setState({ cityText: text })}
            // primary={"#017DFF"}
            primary={"#fff"}
            color={COLOR.COLOR_ICON}
            onDelete={() => this.setState({ phoneText: "" })}
          />
          <ComponentSign
            placeholder="Quận/huyện *"
            placeholderTextColor="#999"
            type="phone"
            size={sizeFont(6)}
            value={districtText}
            onChangeText={(text) => this.setState({ districtText: text })}
            // primary={"#017DFF"}
            primary={"#fff"}
            color={COLOR.COLOR_ICON}
            onDelete={() => this.setState({ phoneText: "" })}
          />

          <ComponentSign
            placeholder="Địa chỉ *"
            placeholderTextColor="#999"
            type="name"
            size={sizeFont(6)}
            value={addressText}
            onChangeText={(text) => this.setState({ addressText: text })}
            // primary={"#017DFF"}
            primary={"#fff"}
            color={COLOR.COLOR_ICON}
            onDelete={() => this.setState({ phoneText: "" })}
          /> */}
          <ComponentSign
            placeholder="Mật khẩu (dài hơn 6 ký tự) *"
            placeholderTextColor="#999"
            type="password"
            size={sizeFont(6)}
            value={passwordText}
            onChangeText={(text) => this.setState({ passwordText: text })}
            // primary={"#017DFF"}
            primary={"#fff"}
            color={COLOR.COLOR_ICON}
            onDelete={() => this.setState({ passwordText: "" })}
          />
          <ComponentSign
            placeholder="Xác nhận mật khẩu"
            placeholderTextColor="#999"
            type="password"
            size={sizeFont(6)}
            value={confirmPassword}
            onChangeText={(text) => this.setState({ confirmPassword: text })}
            // primary={"#017DFF"}
            primary={"#fff"}
            color={COLOR.COLOR_ICON}
            onDelete={() => this.setState({ confirmPassword: "" })}
          />
          {/* <ComponentSign
            placeholder="Id Shop"
            placeholderTextColor="#999"
            type="shop"
            size={sizeFont(6)}
            value={idShop}
            onChangeText={(text) => this.setState({ idShop: text })}
            primary={"#fff"}
            color={COLOR.COLOR_ICON}
            onDelete={() => this.setState({ idShop: "" })}
          /> */}
        </View>
        <View style={styles.viewFooter}>
          <TouchableOpacity style={styles.touchSignUp} onPress={this.handleReg}>
            <Text style={styles.textSignUp}>ĐĂNG KÝ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: sizeHeight(5) }}
            onPress={() => this.props.navigation.navigate("SignIn")}
          >
            <Text style={styles.textFoot}>
              Bạn đã có tài khoản ? Đăng nhập ngay
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginBottom:
              Platform.OS == "ios" ? sizeHeight(25) : sizeHeight(10),
          }}
        />
      </ScrollView>
    );
  }
}
