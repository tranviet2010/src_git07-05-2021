import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../style";
import ComponentTextInput, {
  FormTextInput,
  FormTextInputNoIcon,
} from "../../../../../components/textinput";
import {
  sizeFont,
  sizeWidth,
  sizeHeight,
} from "../../../../../utils/helper/size.helper";
import { COLOR } from "../../../../../utils/color/colors";
export default class ListBank extends Component {
    constructor(props){
      super(props)
    this.state={
      namenh:''
    }
  }
  changeDistrictChild=(text)=>{
      this.setState({namenh:text})
      this.props.changeStateBank(text);
  }
  render() {
    const {
      account,
      nameBank,
      chinhanh,
      nameAccount,
      changeStateAccount,
      changeStateName,
      changeStateBank,
      deleteStateAccount,
      deleteStateBank,
      deleteStateName,
      updateAccount,
      title,
    } = this.props;
    return (
      <View style={{ marginTop: sizeHeight(2) }}>
        <View style={styles.infor}>
          <Text style={styles.textInfor}>Tài khoản ngân hàng</Text>
        </View>
        <View style={{ alignSelf: "center", marginTop: sizeHeight(1) }}>
          <FormTextInput
            props={{
              placeholder: "Số tài khoản",
              placeholderTextColor: "#999",
              type: "phone",
              size: sizeFont(6),
              name: "times-circle",
              value: account,
              onChangeText: (text) => changeStateAccount(text),
              primary: "#017DFF",
              color: COLOR.BUTTON,
              onDelete: () => deleteStateAccount(),
              style: styles.styleWidth,
            }}
            eye={false}
            onSetSee={this.onSetSee}
            styleTextInput={{
              width: sizeWidth(78),
            }}
            styleChild={styles.styleChild}
          />
          <FormTextInput
            props={{
              placeholder: "Tên tài khoản",
              placeholderTextColor: "#999",
              type: "email",
              size: sizeFont(6),
              name: "times-circle",
              value: nameAccount,
              onChangeText: (text) => changeStateName(text),
              primary: "#017DFF",
              color: COLOR.BUTTON,
              onDelete: () => deleteStateName(),
              style: styles.styleWidth,
            }}
            eye={false}
            onSetSee={this.onSetSee}
            styleTextInput={{
              width: sizeWidth(78),
            }}
            styleChild={styles.styleChild}
          />
          <FormTextInput
            props={{
              placeholder: "Ngân hàng",
              placeholderTextColor: "#999",
              type: "email",
              value:{changeStateBank},
              size: sizeFont(6),
              name: "chevron-down",
              onChangeText: (text) => null,
              primary: "#017DFF",
              color: COLOR.MAIN,
              onDelete: () => null,
              style: styles.styleWidth,
            }}
            eye={false}
            onSetSee={this.onSetSee}
            styleTextInput={{
              width: sizeWidth(76),
            }}
            styleChild={styles.styleChild}
            pointerEvents="none"
            value={this.state.namenh.vn_name}
            onPressCustom={() => {

              this.props.navigation.navigate("Listbank", {
                onSetDistrictChild: this.changeDistrictChild,
                NAME: "Thông tin CTV",
              });

            }}
            changeColor={COLOR.MAIN}
            light
          />
          <FormTextInput
            props={{
              placeholder: "Chi nhánh",
              placeholderTextColor: "#999",
              type: "email",
              size: sizeFont(6),
              name: "times-circle",
              value: chinhanh,
              onChangeText: (text) => changeStateBank(text),
              primary: "#017DFF",
              color: COLOR.BUTTON,
              onDelete: () => deleteStateBank(),
              style: styles.styleWidth,
            }}
            eye={false}
            onSetSee={this.onSetSee}
            styleTextInput={{
              width: sizeWidth(78),
            }}
            styleChild={styles.styleChild}
          />
          {/* <View style={{ height: sizeHeight(9),width:sizeWidth(91), marginTop: 10, marginBottom: 10, borderColor: COLOR.MAIN, borderWidth: 1, borderRadius: 5, padding: 10, backgroundColor: '#fff',flexDirection:'row',justifyContent:'space-between' }}>
                <View>
                  <Text style={{ color: 'gray',marginTop:-5 }}>Mã cộng tác viên</Text>
              <Text style={{ lineHeight: 30 }}>{this.props.authUser.USER_CODE}</Text>
                </View>
                <TouchableOpacity onPress={() => Clipboard.setString(`${this.props.authUser.USER_CODE}`) }>
                  <Text>copy</Text>
                </TouchableOpacity>
              </View> */}
        </View>
        <TouchableOpacity
          onPress={updateAccount}
          style={{
            backgroundColor: COLOR.MAIN,
            paddingVertical: sizeHeight(2),
            borderRadius: 6,
            width: sizeWidth(70),
            alignSelf: "center",
            marginTop: sizeHeight(4),
            marginBottom: sizeHeight(4),
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: sizeFont(4),
            }}
          >
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
