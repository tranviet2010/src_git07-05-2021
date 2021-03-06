import React, { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Keyboard, Alert, Clipboard, Platform, Modal, Share } from "react-native";
import { connect } from "react-redux";
import { Avatar } from "react-native-elements";
import { LoginPhone } from "../../../../action/authAction";
import { Toast, Container } from "native-base";
import { GetCTVDetail, Getwithdrawal } from "../../../../service/rose";
import {
  sizeHeight,
  sizeFont,
  sizeWidth,
} from "../../../../utils/helper/size.helper";
import {
  alphanumeric,
  checkFullName,
  isVietnamesePhoneNumber,
  checkAccountBank,
  validateEmail,
  checkAgent,
} from "../../../../utils/check";
import ComponentTextInput, {
  FormTextInput,
  FormTextInputNoIcon,
} from "../../../../components/textinput";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker/src';
// import Clipboard from '@react-native-community/clipboard';
import { _retrieveData } from "../../../../utils/asynStorage";
import { PASSWORD } from "../../../../utils/asynStorage/store";
import { COLOR } from "../../../../utils/color/colors";
import { Provider } from "react-native-paper";
import IconComponets from "../../../../components/icon";
import styles from "./style";
import moment from "moment";
var numeral = require("numeral");
import AlertDesignNotification from "../../../../components/alert/AlertDesignNotification";
import { UpdateInforAccount } from "../../../../service/account";
// import api from "../../../../api";
// import axios from "axios";
// import { bank } from './bank/listbank';
import Spinner from "react-native-loading-spinner-overlay";
import { ElementCustom, AlertCommon } from "../../../../components/error";
import { GetProfile } from "../../../../action/authAction";
import DateTimePickerModal from "react-native-modal-datetime-picker";
const options = {
  title: "Select Avatar",
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
  maxWidth: 720,
  maxHeight: 1080,
};
class UpdateInformation extends Component {
  constructor(props) {
    super(props);
    const { authUser } = this.props;
    this.state = {
      phoneText: authUser.MOBILE,
      userName: authUser.FULL_NAME,
      idStore: authUser.USER_CODE,
      Data: [],
      levelStore: authUser.GROUPS,
      nameLogin: authUser.USERNAME,
      point: 0,
      email: authUser.EMAIL ? authUser.EMAIL : "",
      dayOfBirth: authUser.DOB
        ? moment(authUser.DOB, "DD/MM/YYYY").format("DD/MM/YYYY")
        : moment("01/01/1990").format("DD/MM/YYYY"),
      gender: authUser.GENDER == 'Nam' ? 1 : 0,
      address: authUser.ADDRESS ? authUser.ADDRESS : "",
      passport: authUser.SO_CMT ? authUser.SO_CMT : "",
      account: authUser.STK ? authUser.STK : "",
      nameAccount: authUser.TENTK ? authUser.TENTK : "",
      nameBank: authUser.TEN_NH,
      chinhanh: authUser.CHINHANH_NH,
      showAlert: false,
      numberPick: 0,
      brankBank: '',
      modalVisible: false,
      rose: authUser.COMISSION,
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
      modalVisible1: false,
      loading: false,
      imageAvatar: !authUser.AVATAR ? "" : authUser.AVATAR,
      CMT_1: authUser.IMG1 ? authUser.IMG1 : "",
      CMT_2: authUser.IMG2 ? authUser.IMG2 : "",
      showCalendar: false,
      photo: null,
    };
    this.message = "";
    this.refs.focusFullName;
    this.refs.focusPhone;
    this.refs.focusBankNum;
    this.refs.focusEmail;
    this.refs.focusBrank;
    this.refs.focusNameBank;
    this.refs.foucsAddress;
    this.refs.focusCMNN;
    this.focusPassport;
  }
  handleDate = (item) => {
    this.setState({ showCalendar: false }, () =>
      this.setState({ dayOfBirth: moment(item).format("DD/MM/YYYY") })
    );
  };
  handshare = () => {

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
    Keyboard.dismiss();
    if (userName.trim() === "" || userName.length > 50) {
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
      nameAccount && (nameAccount.length > 100) &&
      account.trim() !== ""
    ) {
      Alert.alert(
        "Th??ng b??o",
        "T??n t??i kho???n kh??ng qu?? 100 k?? t??? v?? kh??ng ch???a k?? t??? ?????c bi???t",
        // () => this.focusBankNum.focus()
      );
    } else if (email != null && !validateEmail(email) && email.trim().length !== 0) {
      Alert.alert("Th??ng b??o", "Nh???p sai ?????nh d???ng email",
        // () =>this.focusEmail.focus()
      );
    } else if (
      passport.trim() !== "" &&
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
      chinhanh.trim() !== ""
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
        EMAIL: email.trim(),
        CITY_NAME: city === "" ? "" : city.NAME,
        DISTRICT_NAME: district === "" ? "" : district.NAME,
        ADDRESS: address.trim(),
        STK: account.trim(),
        MOBILE: phoneText.trim(),
        TENTK: nameAccount,
        TENNH: nameBank,
        AVATAR: imageAvatar,
        IDSHOP: 'F6LKFY',
        CMT: passport.trim(),
        IMG1: CMT_1,
        CHINHANHNH: chinhanh,
        IMG2: CMT_2,
        WARD_NAME: districChild,
        OLD_PWD: "",
        NEW_PWD: "",
        LEVEL_AGENCY: authUser.LEVEL_AGENCY,
      })
        .then((result) => {
          console.log("th??nh c??ng", result);
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
                  })
                  .catch((error) => {
                  });
                this.message = setTimeout(
                  () =>
                    AlertCommon("Th??ng b??o", result.data.RESULT, () => {
                      this.props.navigation.popToTop();
                      this.props.navigation.navigate("screenHome");
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
        });
    }
  };
  changeCity = (text) => {
    if (text == "- t???t c??? -") {
      this.setState({ city: "", district: "", districChild: "" });
    } else {
      this.setState({ city: text, district: "", districChild: "" }, () => {
      });
    }
  };
  upload = (source, data, type) => {
    console.log("hhhhhhh===", source)
    if (source != null) {
      var photo = { ...source, name: "image.jpg", type: "image/jpeg" };
      this.setState({
        loading: true,
      });
      const data = new FormData();
      data.append("name", "imagefile");
      data.append("image", photo);
      fetch("https://f5sell.com/f/upload_avatar.jsp", {
        method: "post",
        body: data,
        headers: {
          "Content-Type": "multipart/form-data; ",
          "Content-Disposition": "form-data",
        },
      })
        .then(async (res) => {
          let responseJson = await res.json();
          if (responseJson.ERROR == "0000") {
            if (type === 1) {
              this.setState(
                {
                  imageAvatar: responseJson.URL,
                },
                () => this.setState({ loading: false })
              );
            } else if (type === 2) {
              this.setState(
                {
                  CMT_1: responseJson.URL,
                },
                () => this.setState({ loading: false })
              );
            } else if (type === 3) {
              this.setState(
                {
                  CMT_2: responseJson.URL,
                },
                () => this.setState({ loading: false })
              );
            }
          } else {
            this.setState(
              {
                loading: false,
              },
              () => {
                this.message = setTimeout(
                  () =>
                    AlertCommon("Th??ng b??o", responseJson.RESULT, () => null),
                  10
                );
              }
            );
          }
        })
        .catch((err) => {
          this.setState({ loading: false });
          this.message = setTimeout(
            () => AlertCommon("Th??ng b??o", "C?? l???i x???y ra", () => null),
            5
          );
        });
    }
  };
  componentWillUnmount() {
    // this._unsubscribe();
    clearTimeout(this.message);
  }
  changeDistrict = (text) => {
    if (text == "- t???t c??? -") {
      this.setState({ district: "", districChild: "" });
    } else this.setState({ district: text, districChild: "" });
  };
  changeDistrictChild1 = (text) => {
    this.setState({ nameBank: text })
  }
  changeDistrictChild = (text) => {
    if (text == "- t???t c??? -") {
      this.setState({ districChild: "" });
    } else this.setState({ districChild: text.NAME });
  };
  copyToClipboard = () => {
    Clipboard.setString('hello world1114444')
  }
  handleImage = (type) => {
    launchImageLibrary(options, async (response) => {

      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState(
          {
            loading: true,
          },
          () => this.upload(source, response.data, type)
        );
      }
    });
  };
  handleImageCamera = (type) => {
    launchCamera(options, async (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState(
          {
            loading: true,
          },
          () => this.upload(source, response.data, type)
        );
      }
    });
  }
  handlePicCamere = () => {

  }
  changeStateAccount = (text) => {
    this.setState({
      account: text,
    });
  };
  changeStateName = (text) => {
    this.setState({
      nameAccount: text,
    });
  };
  changechinhanh = (text) => {
    this.setState({
      chinhanh: text,
    });
  };
  GetCTV = () => {
    const { authUser } = this.props;
    GetCTVDetail({
      USERNAME: authUser.USERNAME,
      USER_CTV: authUser.USERNAME,
      IDSHOP: 'F6LKFY'
    }).then((res) => {
      this.setState({
        districChild: res.data.WARD,
        imageAvatar: res.data.AVATAR,
        point: res.data.BALANCE,
      })
    })
  }
  deleteStateAccount = () => {
    this.setState({
      account: "",
    });
  };
  deleteStateName = () => {
    this.setState({
      nameAccount: "",
    });
  };
  deleteStateBank = () => {
    this.setState({
      nameBank: "",
    });
  };
  handleLoad = async () => {
    await Getwithdrawal({
      USERNAME: this.props.username,
      USER_CTV: this.props.username,
      START_TIME: '01/01/2021',
      END_TIME: '31/12/2021',
      PAGE: 1,
      NUMOFPAGE: 10,
      IDSHOP: 'F6LKFY',
    })
      .then((res) => {
        if (res.data.ERROR == "0000") {
          this.setState({
            Data: res.data.INFO
          })
        } else {
          this.showLogin();
        }
      })
      .catch((err) => {
      });
  }
  componentDidMount() {
    this.handleLoad();
    this.GetCTV();
  }
  render() {
    const {
      phoneText,
      userName,
      point,
      address,
      showAlert,
      loading,
      Data,
      imageAvatar,
      nameLogin,
      modalVisible,
      showCalendar,
    } = this.state;
    const { authUser, status } = this.props;
    return (
      <View>
        {status == '' ? <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: sizeHeight(15), padding: 10 }}>
          <Image
            source={require('../../../../assets/images/logo.png')}
            style={{ width: 130, height: 130, marginBottom: sizeHeight(3) }}
          />
          <Text style={{ fontWeight: '500', marginBottom: 10, justifyContent: 'center' }}>Qu?? c?? d??n ch??a ????ng nh???p</Text>
          <Text style={{ textAlign: 'center' }}>Vui l??ng ????ng nh???p b???ng m?? c??n h??? ????? mua h??ng v?? nh???n ??u ????i t??? Ch??? An B??nh City</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignIn')}
            style={{ backgroundColor: COLOR.HEADER, width: sizeWidth(40), height: sizeHeight(5), justifyContent: 'center', alignItems: 'center', marginTop: sizeHeight(5), borderRadius: 5 }}
          >
            <Text style={{ color: '#fff' }}>????ng nh???p ngay</Text>
          </TouchableOpacity>
        </View> :
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
                  <Text style={styles.textInfor}>Th??ng tin kh??ch h??ng</Text>
                </View>
                <View style={{ alignSelf: "center" }}>
                  <FormTextInput
                    props={{
                      placeholder: "T??n ????ng nh???p",
                      placeholderTextColor: "#Fafafa",
                      type: "name",
                      size: sizeFont(6),
                      name: "times-circle",
                      value: nameLogin,
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
                      placeholder: "S??? ??i???m",
                      placeholderTextColor: "#Fafafa",
                      type: "name",
                      size: sizeFont(6),
                      name: "times-circle",
                      value: numeral(point).format("0,0"),
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
                      placeholder: "M?? kh??ch h??ng",
                      placeholderTextColor: "#Fafafa",
                      type: "name",
                      size: sizeFont(6),
                      name: "times-circle",
                      value: authUser.USER_CODE,
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
                </View>
                <View style={{ alignSelf: "center", marginTop: sizeHeight(1) }}>
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
              <AlertDesignNotification
                showAlert={showAlert}
                message={this.message}
                title="Th??ng b??o"
                onClose={() => this.setState({ showAlert: false })}
              />
              <View style={styles.infor}>
                <Text style={styles.textInfor}>B???ng sao k?? giao d???ch</Text>
              </View>
              {Data.length != 0 ? <View>
                {loading === false ? <View style={{ height: sizeHeight(30), marginTop: 15, marginBottom: sizeHeight(20) }}>
                  <View style={styles.container1}>
                    <View style={[styles.cuttoms, styles.children1]}>
                      <Text style={{ color: '#fff' }}>N???i dung</Text>
                    </View>
                    <View style={styles.cuttoms}>
                      <Text style={{ color: '#fff' }}>S??? ti???n</Text>
                    </View>
                  </View>
                  <View>
                    <ScrollView nestedScrollEnabled={true} style={{ marginTop: sizeHeight(0.2), height: sizeHeight(36), borderTopColor: '#149CC6', borderTopWidth: 1 }}>
                      <View style={{ marginTop: -2 }}>
                        {this.state.Data.map((Val, key) => (
                          <View>
                            <View style={styles.container}>
                              <View style={styles.children}>
                                <Text >{Val.UPDATE_TIME}</Text>
                                <Text>{Val.COMMENTS}</Text>
                              </View>
                              <View style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 10 }}>
                                {Val.TRANSACTION_TYPE == 2 ? <Text style={{ color: 'red' }}>- {numeral(Val.AMOUNT).format("0,0")} ??</Text> : <Text style={{ color: '#149CC6' }}>+ {numeral(Val.AMOUNT).format("0,0")} ??</Text>}
                              </View>
                            </View>
                          </View>
                        ))}

                      </View>

                    </ScrollView>
                  </View>
                </View> : <View style={{ height: sizeHeight(40) }}></View>}
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
                <View>

                </View>
              </View>
            </ScrollView>
          </View>}
      </View>
    );
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
  return {
    GetProfile: (text) => dispatch(GetProfile(text)),
    LoginPhone: (data) => dispatch(LoginPhone(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateInformation);
