import React, { Component, PureComponent } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  ScrollView,
  SectionList,
  StatusBar,
  TextInput,
  Animated,
  Image,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import { GetListCTV } from "../../../service/account";
import ComponentTextInput, {
  FormTextInput,
  FormTextInputNoIcon,
} from "../../../components/textinput";
import IconComponets from "../../../components/icon";
import AlertDesignNotification from "../../../components/alert/AlertDesignNotification";
import { _retrieveData } from "../../../utils/asynStorage";
import Spinner from "react-native-loading-spinner-overlay";
import styles from "./style";
import { ElementCustom, AlertCommon } from "../../../components/error";
import _ from "lodash";
import {
  alphanumeric,
  checkFullName,
  isVietnamesePhoneNumber,
  checkAccountBank,
  validateEmail,
  checkAgent,
} from "../../../utils/check";
import { DataTable } from 'react-native-paper';
import Header from "../../rose/header/index";
import CtvSub from "../subchilditem/ctvsub";
import Loading from '../../../components/loading';

import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../utils/helper/size.helper";
import { COLOR } from "../../../utils/color/colors";
import { connect } from "react-redux";
import { handleMoney } from "../../../components/money";
import { GetwithdrawalCTV } from "../../../service/rose";
var numeral = require("numeral");
import { GetCTVDetail } from "../../../service/rose";

class ListProducts extends PureComponent {
  constructor(props) {
    super(props);
    const { authUser } = this.props;
    this.state = {
      ListData: [],
      address: authUser.ADDRESS ? authUser.ADDRESS : "",
      data_tt: [],
      showAlert: false,
      dayOfBirth: authUser.DOB,
      gender: authUser.GENDER == 'Nam' ? 1 : 0,
      phoneText: authUser.MOBILE,
      onChangeText: '',
      userName: authUser.FULL_NAME,
      loading: false,
      modalVisible: false,
      city:
        authUser.CITY == null
          ? ""
          : {
            NAME: authUser.CITY,
            MATP: authUser.CITY_ID,
          },
      district:
        authUser.DISTRICT == null
          ? ""
          : {
            NAME: authUser.DISTRICT,
            MAQH: authUser.DISTRICT_ID,
          },
      districChild: '',
    };
    this.count = 0;
  }
  handleLoad = async () => {
    await GetCTVDetail({
      USERNAME: this.props.username,
      USER_CTV: this.props.username,
      IDSHOP: 'F6LKFY'
    })
      .then((res) => {
        console.log("get list ctv", res)
        this.setState({
          ListData: res.data
        })
      })
      .catch((err) => { })

  }
  updateAccount = () => {
    const {
      gender,
      userName,
      passport,
      district,
      districChild,
      city,
      address,
      account,
      nameAccount,
      nameBank,
      imageAvatar,
      CMT_1,
      CMT_2,
      dayOfBirth,
      phoneText,
      email,
      brankBank,
      chinhanh,
    } = this.state;
    const { authUser } = this.props;
    if (userName.length > 50) {
      return Alert.alert(
        "Th??ng b??o",
        "Nh???p h??? v?? t??n ch??? g???m ch??? v?? s??? kh??ng c?? k?? t??? ????c bi???t v?? nh??? h??n 50 k?? t???",
        // () => this.focusFullName.focus()
      );
    } else if (
      !isVietnamesePhoneNumber(phoneText) ||
      phoneText.length > 10
    ) {
      return Alert.alert(
        "Th??ng b??o",
        "Nh???p ????ng s??? ??i???n tho???i 0xxxxxxxxx",
        // () => this.focusPhone.focus()
      );
    } else if (

      address.length > 100
    ) {
      return Alert.alert(
        "Th??ng b??o",
        "?????a ch??? kh??ng nh???p qu?? 100 k?? t???",
        // () => this.focusPhone.focus()
      );
    }
    else if (
      nameAccount && (nameAccount.length > 100)
    ) {
      Alert.alert(
        "Th??ng b??o",
        "T??n t??i kho???n kh??ng qu?? 100 k?? t??? v?? kh??ng ch???a k?? t??? ?????c bi???t",
        // () => this.focusBankNum.focus()
      );
    } else if (email != null && !validateEmail(email) && email.length !== 0) {
      Alert.alert("Th??ng b??o", "Nh???p sai ?????nh d???ng email",
        // () =>this.focusEmail.focus()
      );
    } else if (
      passport !== "" &&
      (passport != null ||
        !alphanumeric(passport) ||
        passport.length > 20 ||
        passport.length < 8)
    ) {
      Alert.alert(
        "Th??ng b??o",
        "CMNN/CCCD ch??? g???m s??? l???n h??n 8 v?? nh??? h??n 20 k?? t???",
        // () => this.focusCMNN.focus()
      );
    } else if (dayOfBirth == "") {
      Alert.alert("Th??ng b??o", "Nh???p ng??y th??ng n??m sinh c???a b???n", () => null);
    } else if (
      nameBank && nameBank.length === 0 &&
      (account.length !== 0 ||
        nameAccount.length !== 0 ||
        brankBank.length !== 0)
    ) {
      Alert.alert(
        "Th??ng b??o",
        "Nh???p th??ng tin t??i kho???n ng??n h??ng",
        () => null
      );
    } else if (
      account && account.length === 0 &&
      (nameBank.length !== 0 ||
        nameAccount.length !== 0 ||
        brankBank.length !== 0 ||
        nameAccount.length > 20
      )
    ) {
      Alert.alert(
        "Th??ng b??o",
        "Nh???p th??ng tin t??i kho???n nh??? h??n 20 ch??? s???",
        // () => this.focusBankNum.focus()
      );
    } else if (
      nameAccount && nameAccount.length === 0 &&
      (account.length !== 0 || nameBank.length !== 0 || brankBank.length !== 0)
    ) {
      Alert.alert(
        "Th??ng b??o",
        "T??n t??i kho???n ch??? g???m ch??? v?? s??? v?? nh??? h??n 50 k?? t???",
        // () => this.focusNameBank.focus()
      );
    } else if (
      chinhanh && (chinhanh.length > 50 || !alphanumeric(chinhanh)) &&
      chinhanh !== ""
    ) {
      Alert.alert(
        "Th??ng b??o",
        "Chi nh??nh ch??? g???m ch??? v?? s??? v?? nh??? h??n 50 k?? t???",
        // () => this.focusNameBank.focus()
      );
    }
    else {
      this.setState({
        loading: true,
      });
      UpdateInforAccount({
        USERNAME: authUser.USERNAME,
        USER_CTV: authUser.USERNAME,
        NAME: userName,
        DOB: dayOfBirth,
        GENDER: gender,
        EMAIL: email,
        CITY_NAME: city === "" ? "" : city.NAME,
        DISTRICT_NAME: district === "" ? "" : district.NAME,
        ADDRESS: address,
        STK: account,
        MOBILE: phoneText,
        TENTK: nameAccount,
        TENNH: nameBank,
        AVATAR: imageAvatar,
        IDSHOP: 'F6LKFY',
        CMT: passport,
        IMG1: CMT_1,
        CHINHANHNH: chinhanh,
        IMG2: CMT_2,
        WARD_NAME: districChild,
        OLD_PWD: "",
        NEW_PWD: "",
        LEVEL_AGENCY: authUser.LEVEL_AGENCY,
      })
        .then((result) => {
          console.log("update===========", result);
          if (result.data.ERROR === "0000") {
            this.setState(
              {
                loading: false,
              },
              async () => {
                var password = '';
                await _retrieveData(PASSWORD).then((result) => {
                  if (result) {
                    password = result.substr(1).slice(0, -1)
                  }
                })
                this.props.LoginPhone({
                  IDSHOP: 'F6LKFY',
                  USERNAME: authUser.USERNAME,
                  PASSWORD: password,
                })
                  .then((result) => {
                    console.log(result, "login");
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                this.message = setTimeout(
                  () =>
                    AlertCommon("Th??ng b??o", result.data.RESULT, () => {
                      this.props.navigation.popToTop();
                      this.props.navigation.navigate("HomePay");
                    }),
                  10
                );
              },
              this.GetCTV()
            );
          } else {
            this.setState(
              {
                loading: false,
              },
              () => {
                this.message = setTimeout(
                  () =>
                    AlertCommon("Th??ng b??o", result.data.RESULT, () => {
                      // this.props.navigation.popToTop();
                      // this.props.navigation.navigate("Home");
                    }),
                  10
                );
              }
            );
          }
        })
        .catch((error) => {
          this.setState({ loading: false });
          this.message = setTimeout(
            () => AlertCommon("Th??ng b??o", "C?? l???i x???y ra", () => null),
            5
          );
          console.log(error);
        });
    }
  };
  showLogin = () => {
    return Alert.alert(
      "Th??ng b??o",
      `Qu?? d??n c?? ch??a ????ng nh???p. Vui l??ng ????ng nh???p b???ng m?? c??n h??? ????? mua h??ng v?? nh???n ??u ????i t??? GDShop`,
      [
        {
          text: "????? sau",
          style: "destructive",
        },
        {
          text: "????ng nh???p",
          onPress: () => {

            this.props.navigation.navigate('SignIn')
          },
          style: "default",
        }
      ],
      { cancelable: false }
    );
  };
  componentDidMount() {
    this.handleLoad();
  }
  render() {
    const {
      data,
      refreshing,
      navigation,
      onRefreshing,
      status,
      authUser,
    } = this.props;
    const { ListData, data_tt, loading, onChangeText, modalVisible, phoneText, showAlert, userName, address } = this.state;
    console.log("data_tt", ListData)
    return (
      <View>
        {status == '' ? this.showLogin() :
          <View>
            <ScrollView keyboardShouldPersistTaps="handled">
              <Spinner
                visible={loading}
                customIndicator={<ElementCustom />}
              //overlayColor="#ddd"
              />
              <View style={styles.viewAvatar}>
                {this.state.imageAvatar == null ? (
                  <IconComponets
                    name="user-circle"
                    size={sizeFont(20)}
                    color={COLOR.HEADER}
                  />
                ) : (
                    <Avatar
                      size={"large"}
                      containerStyle={{
                        borderWidth: 0.2,
                        borderColor: COLOR.HEADER,
                      }}
                      rounded
                      source={{
                        uri: imageAvatar,
                      }}
                    />
                  )}

                <TouchableOpacity
                  style={styles.viewTouchCamera}
                  onPress={() => this.setState({
                    modalVisible: true,
                    numberPick: 1,
                  })}
                >
                  <IconComponets
                    name="camera"
                    size={sizeFont(6)}
                    color={COLOR.HEADER}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{ backgroundColor: "#F6F6F7", marginTop: sizeHeight(2) }}
              >
                <View style={styles.infor}>
                  <Text style={styles.textInfor}>Th??ng tin C???ng t??c vi??n</Text>
                </View>
                <View style={{ alignSelf: "center" }}>
                  <FormTextInput
                    props={{
                      placeholder: "S??? ??i???m",
                      placeholderTextColor: "#Fafafa",
                      type: "name",
                      size: sizeFont(6),
                      name: "times-circle",
                      value: numeral(ListData.BALANCE).format("0,0"),
                      primary: "#017DFF",
                      color: COLOR.COLOR_ICON,
                      onDelete: () => this.setState({ userName: "" }),
                      style: styles.styleWidth,
                    }}
                    editable={false}
                    eye={false}
                    onSetSee={this.onSetSee}
                    styleTextInput={{
                      width: sizeWidth(78),
                    }}
                    styleChild={styles.styleChild}
                  />
                  <FormTextInput
                    props={{
                      placeholder: "H??? v?? t??n",
                      placeholderTextColor: "#Fafafa",
                      type: "name",
                      size: sizeFont(6),
                      name: "times-circle",
                      value: userName,
                      onChangeText: (text) => this.setState({ userName: text }),
                      primary: "#017DFF",
                      color: COLOR.COLOR_ICON,
                      onDelete: () => this.setState({ userName: "" }),
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
                      placeholder: "S??? ??i???n tho???i",
                      placeholderTextColor: "#999",
                      type: "phone",
                      size: sizeFont(6),
                      name: "times-circle",
                      value: phoneText,
                      onChangeText: (text) => this.setState({ phoneText: text }),
                      primary: "#017DFF",
                      color: COLOR.COLOR_ICON,
                      onDelete: () => this.setState({ phoneText: "" }),
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
                      placeholder: "?????a ch???",
                      placeholderTextColor: "#999",
                      type: "email",
                      size: sizeFont(6),
                      name: "times-circle",
                      value: address,
                      onChangeText: (text) => this.setState({ address: text }),
                      primary: "#017DFF",
                      color: COLOR.HEADER,
                      onDelete: () => {
                        this.setState({ address: "" });
                      },
                      style: styles.styleWidth,
                    }}
                    eye={false}
                    onSetSee={this.onSetSee}
                    styleTextInput={{
                      width: sizeWidth(78),
                    }}
                    styleChild={styles.styleChild}
                  />
                </View>
                <View style={{ marginTop: sizeHeight(2) }}>

                  <TouchableOpacity
                    onPress={this.updateAccount}
                    style={{
                      backgroundColor: COLOR.HEADER,
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
                      C???P NH???T
                </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {Data.length != 0 ? <View>
                {loading === false ? <View style={{ height: sizeHeight(40) }}>
                  <View style={styles.container1}>
                    <View style={[styles.cuttoms, styles.children1]}>
                      <Text style={{ color: 'white' }}>N???i dung</Text>
                    </View>
                    <View style={styles.cuttoms}>
                      <Text style={{ color: 'white' }}>S??? ti???n</Text>
                    </View>
                  </View>
                  <View>
                    <ScrollView nestedScrollEnabled={true} style={{ marginTop: sizeHeight(0.2), height: sizeHeight(36), borderTopColor: '#149CC6', borderTopWidth: 1 }}>
                      <View style={{ marginTop: -2 }}>
                        {this.state.Data.map((Val, key) => (
                          <TouchableOpacity key={key} disabled={Val.TRANSACTION_TYPE == 1 ? false : true} onPress={() => this.props.navigation.navigate("DetailOrder", {
                            ID: Val.COMMENTS.substr(8, 8),
                            NAME: 'Rose'
                          })}>
                            <View style={styles.container}>
                              <View style={styles.children}>
                                <Text >{Val.UPDATE_TIME}</Text>
                                <Text>{Val.COMMENTS}</Text>
                              </View>
                              <View style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 10 }}>
                                {Val.TRANSACTION_TYPE == 2 ? <Text style={{ color: 'red' }}>- {numeral(Val.AMOUNT).format("0,0")} ??</Text> : <Text style={{ color: '#149CC6' }}>+ {numeral(Val.AMOUNT).format("0,0")} ??</Text>}
                              </View>
                            </View>
                          </TouchableOpacity>
                        ))}

                      </View>

                    </ScrollView>
                  </View>
                </View> : <View style={{ height: sizeHeight(40) }}><Loading /></View>}
              </View> : <View style={{ height: sizeHeight(40), justifyContent: 'center', alignItems: 'center' }}>
                  <Text>Kh??ng c?? d??? li???u</Text>
                </View>}

              <View style={styles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <View style={{ position: 'absolute', bottom: sizeHeight(20) }}>
                        <TouchableOpacity
                          onPress={() => {
                            this.handleImage(this.state.numberPick)
                          }}
                        >
                          <Text style={{ fontSize: sizeFont(5), color: '#2196F3', textDecorationLine: 'underline' }}>Ch???n t??? th?? vi???n...</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => this.handleImageCamera(this.state.numberPick)}
                        >
                          <Text style={{ fontSize: sizeFont(5), color: '#2196F3', textDecorationLine: 'underline', marginTop: sizeHeight(2) }}>Ch???n t??? camera...</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{ ...styles.openButton }}
                          onPress={() => {
                            this.setState({
                              modalVisible: !modalVisible
                            })
                          }}
                        >
                          <Text style={styles.textStyle}>Cancel</Text>
                        </TouchableOpacity>
                      </View>


                    </View>
                  </View>
                </Modal>
              </View>
              <View
                style={{
                  paddingBottom: sizeHeight(30),
                  backgroundColor: "#F6F6F7",
                }}
              />

            </ScrollView>
          </View>

        }
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    username: state.authUser.username,
    idshop: state.product.database,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListProducts);
