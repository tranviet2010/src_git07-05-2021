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
        "Thông báo",
        "Nhập họ và tên chỉ gồm chữ và số không có kí tự đăc biệt và nhỏ hơn 50 kí tự",
        // () => this.focusFullName.focus()
      );
    } else if (
      !isVietnamesePhoneNumber(phoneText) ||
      phoneText.length > 10
    ) {
      return Alert.alert(
        "Thông báo",
        "Nhập đúng số điện thoại 0xxxxxxxxx",
        // () => this.focusPhone.focus()
      );
    } else if (

      address.length > 100
    ) {
      return Alert.alert(
        "Thông báo",
        "Địa chỉ không nhập quá 100 ký tự",
        // () => this.focusPhone.focus()
      );
    }
    else if (
      nameAccount && (nameAccount.length > 100)
    ) {
      Alert.alert(
        "Thông báo",
        "Tên tài khoản không quá 100 ký tự và không chứa ký tự đặc biệt",
        // () => this.focusBankNum.focus()
      );
    } else if (email != null && !validateEmail(email) && email.length !== 0) {
      Alert.alert("Thông báo", "Nhập sai định dạng email",
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
        "Thông báo",
        "CMNN/CCCD chỉ gồm số lớn hơn 8 và nhỏ hơn 20 kí tự",
        // () => this.focusCMNN.focus()
      );
    } else if (dayOfBirth == "") {
      Alert.alert("Thông báo", "Nhập ngày tháng năm sinh của bạn", () => null);
    } else if (
      nameBank && nameBank.length === 0 &&
      (account.length !== 0 ||
        nameAccount.length !== 0 ||
        brankBank.length !== 0)
    ) {
      Alert.alert(
        "Thông báo",
        "Nhập thông tin tài khoản ngân hàng",
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
        "Thông báo",
        "Nhập thông tin tài khoản nhỏ hơn 20 chữ số",
        // () => this.focusBankNum.focus()
      );
    } else if (
      nameAccount && nameAccount.length === 0 &&
      (account.length !== 0 || nameBank.length !== 0 || brankBank.length !== 0)
    ) {
      Alert.alert(
        "Thông báo",
        "Tên tài khoản chỉ gồm chữ và số và nhỏ hơn 50 kí tự",
        // () => this.focusNameBank.focus()
      );
    } else if (
      chinhanh && (chinhanh.length > 50 || !alphanumeric(chinhanh)) &&
      chinhanh !== ""
    ) {
      Alert.alert(
        "Thông báo",
        "Chi nhánh chỉ gồm chữ và số và nhỏ hơn 50 kí tự",
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
                    AlertCommon("Thông báo", result.data.RESULT, () => {
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
                    AlertCommon("Thông báo", result.data.RESULT, () => {
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
            () => AlertCommon("Thông báo", "Có lỗi xảy ra", () => null),
            5
          );
          console.log(error);
        });
    }
  };
  showLogin = () => {
    return Alert.alert(
      "Thông báo",
      `Quý dân cư chưa đăng nhập. Vui lòng đăng nhập bằng mã căn hộ để mua hàng và nhận ưu đãi từ GDShop`,
      [
        {
          text: "Để sau",
          style: "destructive",
        },
        {
          text: "Đăng nhập",
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
                  <Text style={styles.textInfor}>Thông tin Cộng tác viên</Text>
                </View>
                <View style={{ alignSelf: "center" }}>
                  <FormTextInput
                    props={{
                      placeholder: "Số điểm",
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
                      placeholder: "Họ và tên",
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
                      placeholder: "Số điện thoại",
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
                      placeholder: "Địa chỉ",
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
                      CẬP NHẬT
                </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {Data.length != 0 ? <View>
                {loading === false ? <View style={{ height: sizeHeight(40) }}>
                  <View style={styles.container1}>
                    <View style={[styles.cuttoms, styles.children1]}>
                      <Text style={{ color: 'white' }}>Nội dung</Text>
                    </View>
                    <View style={styles.cuttoms}>
                      <Text style={{ color: 'white' }}>Số tiền</Text>
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
                                {Val.TRANSACTION_TYPE == 2 ? <Text style={{ color: 'red' }}>- {numeral(Val.AMOUNT).format("0,0")} đ</Text> : <Text style={{ color: '#149CC6' }}>+ {numeral(Val.AMOUNT).format("0,0")} đ</Text>}
                              </View>
                            </View>
                          </TouchableOpacity>
                        ))}

                      </View>

                    </ScrollView>
                  </View>
                </View> : <View style={{ height: sizeHeight(40) }}><Loading /></View>}
              </View> : <View style={{ height: sizeHeight(40), justifyContent: 'center', alignItems: 'center' }}>
                  <Text>Không có dữ liệu</Text>
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
                          <Text style={{ fontSize: sizeFont(5), color: '#2196F3', textDecorationLine: 'underline' }}>Chọn từ thư viện...</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => this.handleImageCamera(this.state.numberPick)}
                        >
                          <Text style={{ fontSize: sizeFont(5), color: '#2196F3', textDecorationLine: 'underline', marginTop: sizeHeight(2) }}>Chọn từ camera...</Text>
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
