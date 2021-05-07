import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../../utils/helper/size.helper";
import ImagePicker from "react-native-image-picker";
import { Avatar } from "react-native-elements";
import { COLOR } from "../../../../utils/color/colors";
import IconComponets from "../../../../components/icon";
import { UpdateInforAccount } from "../../../../service/account";
import { connect } from "react-redux";
import { AlertCommon, ElementCustom } from "../../../../components/error";
import Spinner from "react-native-loading-spinner-overlay";
import { GetProfile } from "../../../../action/authAction";
import { changePass } from '../../../../service/auth';
import { Alert } from "react-native";
const options = {
  title: "Select Avatar",
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
  maxWidth: 720,
  maxHeight: 1080,
};
class UpdateAccount extends Component {
  constructor(props) {
    super(props);
    const { authUser } = this.props;
    this.state = {
      nameShop: authUser.USERNAME,
      phoneText: "",
      emailText: authUser.EMAIL ? authUser.EMAIL : "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      imageAvatar: authUser.AVATAR ? authUser.AVATAR : "",
      loading: false,
    };
  }
  componentWillUnmount() {
    clearTimeout(this.message);
  }
  updateAmdmin = () => {
    const { oldPassword, newPassword } = this.state;
    changePass({
      OLD_PWD: oldPassword,
      NEW_PWD: newPassword
    }).then((res) => {
      if (res.data.ERROR == '0000') {
        console.log("thành công", res);
        this.props.navigation.goBack();
      } else {
        Alert.alert('Thông báo',res.data.RESULT)
      }
    })
  }
  render() {
    const {
      nameShop,
      phoneText,
      emailText,
      oldPassword,
      newPassword,
      confirmPassword,
      loading,
      imageAvatar,
    } = this.state;
    const { authUser } = this.props;
    return (
      <ScrollView keyboardShouldPersistTaps="handled">

        <View style={{ marginTop: sizeHeight(8) }}>
          <Text
            style={{
              backgroundColor: "#999",
              fontSize: sizeFont(4),
              fontWeight: "bold",
              opacity: 0.8,
              paddingVertical: sizeHeight(2),
              paddingHorizontal: sizeWidth(2.5),
            }}
          >
            Đổi mật khẩu
          </Text>
          <View style={[styles.viewCommon, { marginTop: sizeHeight(4) }]}>
            <Text style={styles.textTitle}>Mật khẩu cũ</Text>
            <TextInput
              value={oldPassword}
              secureTextEntry={true}
              onChangeText={(text) => this.setState({ oldPassword: text })}
              style={styles.textInputChild}
            />
          </View>
          <View style={styles.viewCommon}>
            <Text style={styles.textTitle}>Mật khẩu mới</Text>
            <TextInput
              value={newPassword}
              secureTextEntry={true}
              onChangeText={(text) => this.setState({ newPassword: text })}
              style={styles.textInputChild}
            />
          </View>
          <View style={styles.viewCommon}>
            <Text style={styles.textTitle}>Nhập lại mật khẩu mới</Text>
            <TextInput
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(text) => this.setState({ confirmPassword: text })}
              style={styles.textInputChild}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            if (newPassword !== confirmPassword) {
              AlertCommon(
                "Thông báo",
                "Mật khẩu mới không trùng khớp",
                () => null
              );
            } else {
              this.setState({ loading: true }, () => this.updateAmdmin());
            }
          }}
          style={{
            backgroundColor: COLOR.HEADER,
            paddingVertical: sizeHeight(2),
            marginVertical: sizeHeight(2),
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: sizeFont(4),
            }}
          >
            Cập nhật
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewCommon: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: sizeWidth(2.5),
    marginVertical: sizeHeight(1),
    alignItems: "center",
    alignContent: "center",
  },
  viewTextInput: {
    width: sizeWidth(70),
    borderWidth: 1,
    borderColor: "#999",
    paddingVertical: sizeHeight(1.5),
    paddingHorizontal: sizeWidth(2),
  },
  textTitle: {
    fontSize: sizeFont(4),
    fontWeight: "500",
  },
  textInputChild: {
    width: sizeWidth(50),
    borderWidth: 1,
    borderColor: "#999",
    paddingVertical: sizeHeight(1.5),
    paddingHorizontal: sizeWidth(2),
  },
});
const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    username: state.authUser.username,
    idshop: state.product.database,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { GetProfile: (text) => dispatch(GetProfile(text)) };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateAccount);
