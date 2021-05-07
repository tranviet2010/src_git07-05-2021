import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, Platform } from 'react-native';
import { LoginPhone } from "../../action/authAction";
import { _retrieveData } from "../../utils/asynStorage";
import { connect } from 'react-redux';
import { USER_NAME, PASSWORD, PUSH_TOKEN, TOKEN, DATAITEM } from "../../utils/asynStorage/store";
import { GetIdShop } from "../../action/authAction";
import { getUserAgent, getDeviceType, getUniqueId, getVersion, getDeviceName } from "react-native-device-info";
import { getDevice } from "../../service/device";
import { addToCart } from '../../action/orderAction';
import OneSignal from 'react-native-onesignal';
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../utils/helper/size.helper";
class SplashScreen extends Component {
  handload = async () => {
    let [username, password] = ['', ''];
    let id = '';
    let accessToken = '';
    // await _retrieveData(PUSH_TOKEN).then((res) => {
    //   if (res) {
    //     accessToken = res.substr(1).slice(0, -1);
    //   }
    // });
    let nameDevice = await getDeviceName().then((ua) => ua)
    // console.log("this is accessToken", accessToken)
    const deviceState = await OneSignal.getDeviceState();
    await _retrieveData(USER_NAME).then((result) => {
      if (result) {
        username = result.substr(1).slice(0, -1)
      }
    })
    await _retrieveData(PASSWORD).then((result) => {
      if (result) {
        password = result.substr(1).slice(0, -1)
      }
    }).catch((err) => {
    })
    this.props.LoginPhone({
      IDSHOP: 'F6LKFY',
      USERNAME: username,
      PASSWORD: password,
    })
      .then((result) => {
        this.props.navigation.navigate("screenHome", {
          CODE: 1
        });
      })
      .catch((err) => {

      });
    getDevice({
      USERNAME: username,
      APP_VERSION: getVersion(),
      MODEL_NAME: nameDevice,
      TOKEN_KEY: "fXZEodQWSNGA",
      DEVICE_TYPE: Platform.OS,
      OS_VERSION: getVersion(),
      UUID: deviceState.userId,
      IDSHOP: 'F6LKFY'
    }).then((res) => {
      console.log("updatedata", res);
    })
  }
  componentDidMount() {
    this.handload();
    this.initCart();
  }
  initCart = async () => {
    let dataCart = await _retrieveData(DATAITEM);
    let cart = JSON.parse(dataCart);
    this.props.addToCart({ cart: cart || [], data: false });
    console.log("aaaaaaaaaaaaaa",dataCart)
  }

  render() {

    return (
      <View>
        <View style={{ width: '100%', height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{ width: sizeWidth(70), height: sizeHeight(40) }}
            resizeMode="contain"
          />
        </View>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    LoginPhone: (data) => dispatch(LoginPhone(data)),
    GetIdShop: (data) => dispatch(GetIdShop(data)),
    addToCart: (text) => dispatch(addToCart(text)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreen);
