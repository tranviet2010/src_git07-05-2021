import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import moment from "moment";
import { UpdateInforAccount } from "../../../../../service/account";
import { AlertCommon, ElementCustom } from "../../../../../components/error";
import { Avatar } from "react-native-elements";
import IconComponets from "../../../../../components/icon";
import Spinner from "react-native-loading-spinner-overlay";
import { TextInput, Provider } from "react-native-paper";
import { FormTextInput } from "../../../../../components/textinput";
import { COLOR } from "../../../../../utils/color/colors";
import {
  sizeWidth,
  sizeFont,
  sizeHeight,
} from "../../../../../utils/helper/size.helper";
import ListBank from "../../update/bank";
import AlertDesignNotification from "../../../../../components/alert/AlertDesignNotification";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from "./style";
const options = {
  title: "Select Avatar",
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
  maxWidth: 720,
  maxHeight: 1080,
};
class UpdateStore extends Component {
  constructor(props) {
    super(props);
    const { authUser } = this.props;
    this.state = {
      phoneText: "",
      userName: authUser.FULL_NAME,
      idStore: authUser.USER_CODE,
      email: authUser.EMAIL ? authUser.EMAIL : "",
      dayOfBirth: authUser.DOB
        ? moment(authUser.DOB, "DD/MM/YYYY").format("DD/MM/YYYY")
        : moment("01/01/1990").format("DD/MM/YYYY"),
      gender: authUser.GENDER === 1 ? 1 : 0,
      address: authUser.ADDRESS ? authUser.ADDRESS : "",
      account: authUser.STK ? authUser.STK : "",
      nameAccount: authUser.TENTK ? authUser.TENTK : "",
      nameBank: authUser.TEN_NH ? authUser.TEN_NH : "",
      showAlert: false,
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
      districChild:
        authUser.WARD == null
          ? ""
          : {
              NAME: authUser.WARD,
              XAID: authUser.WARD_ID,
            },
      loading: false,
      showCalendar: false,
      password: "",
      nameShop: "",
      name: "",
    };
    this.message = "";
  }
  handleDate = (item) => {
    this.setState({
      dayOfBirth: moment(item).format("DD/MM/YYYY"),
      showCalendar: false,
    });
  };
  updateAccount = () => {
    const {
      emailText,
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
      dayOfBirth,
    } = this.state;
    const { authUser } = this.props;

    UpdateInforAccount({
      USERNAME: authUser.USERNAME,
      USER_CTV: authUser.USERNAME,
      NAME: userName,
      DOB: dayOfBirth,
      GENDER: gender,
      EMAIL: emailText,
      CITY_NAME: city.NAME,
      DISTRICT_NAME: district.NAME,
      ADDRESS: address,
      STK: account,
      TENTK: nameAccount,
      TENNH: nameBank,
      AVATAR: imageAvatar,
      IDSHOP: "F6LKFY",
      CMT: passport,
      IMG1: CMT_1,
      IMG2: CMT_2,
      WARD_NAME: districChild.NAME,
      OLD_PWD: "",
      NEW_PWD: "",
    })
      .then((result) => {
        if (result.data.ERROR === "00000") {
          this.setState(
            {
              loading: false,
            },
            () => {
              this.props
                .GetProfile({
                  IDSHOP: "F6LKFY",
                  USER_CTV: this.props.authUser.USERNAME,
                  USERNAME: this.props.authUser.USERNAME,
                })
                .then((result) => {
                })
                .catch((error) => {
                  this.setState({ loading: false });
                });
              this.message = setTimeout(
                () => AlertCommon("Thông báo", result.data.RESULT, () => null),
                10
              );
            }
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
                    this.props.navigation.popToTop();
                    this.props.navigation.navigate("home");
                  }),
                10
              );
            }
          );
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };
  changeCity = (text) => {
    if (text == "- tất cả -") {
      this.setState({ city: "", district: "", districChild: "" });
    } else {
      this.setState({ city: text, district: "", districChild: "" }, () => {
        console.log(this.state.district, "2020202020202020");
      });
    }
  };

  componentWillUnmount() {
    // this._unsubscribe();
    clearTimeout(this.message);
  }
  changeDistrict = (text) => {
    if (text == "- tất cả -") {
      this.setState({ district: "", districChild: "" });
    } else this.setState({ district: text, districChild: "" });
  };
  changeDistrictChild = (text) => {
    if (text == "- tất cả -") {
      this.setState({ districChild: "" });
    } else this.setState({ districChild: text });
  };

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
  changeStateBank = (text) => {
    this.setState({
      nameBank: text,
    });
  };
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
  render() {
    const {
      phoneText,
      userName,
      idStore,
      email,
      dayOfBirth,
      gender,
      city,
      district,
      districChild,
      address,
      nameBank,
      nameAccount,
      account,
      showAlert,
      loading,
      showCalendar,
      name,
      nameShop,
      password,
    } = this.state;
    return (
      <Provider>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Spinner
            visible={loading}
            customIndicator={<ElementCustom />}
            //overlayColor="#ddd"
          />
          <View style={{ alignSelf: "center" }}>
            <FormTextInput
              props={{
                placeholder: "Tên truy cập",
                placeholderTextColor: "#Fafafa",
                type: "name",
                size: sizeFont(6),
                name: "times-circle",
                value: name,
                onChangeText: (text) => this.setState({ name: text }),
                primary: "#017DFF",
                color: COLOR.COLOR_ICON,
                onDelete: () => this.setState({ name: "" }),
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
                placeholder: "Mã kho",
                placeholderTextColor: "#Fafafa",
                type: "name",
                size: sizeFont(6),
                name: "times-circle",
                value: idStore,
                onChangeText: (text) => this.setState({ idStore: text }),
                primary: "#017DFF",
                color: COLOR.COLOR_ICON,
                onDelete: () => this.setState({ idStore: "" }),
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
                placeholder: "Tên kho",
                placeholderTextColor: "#Fafafa",
                type: "name",
                size: sizeFont(6),
                name: "times-circle",
                value: nameShop,
                onChangeText: (text) => this.setState({ nameShop: text }),
                primary: "#017DFF",
                color: COLOR.COLOR_ICON,
                onDelete: () => this.setState({ nameShop: "" }),
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
                placeholder: "Mật khẩu",
                placeholderTextColor: "#Fafafa",
                type: "password",
                size: sizeFont(6),
                name: "times-circle",
                value: password,
                onChangeText: (text) => this.setState({ password: text }),
                primary: "#017DFF",
                color: COLOR.COLOR_ICON,
                onDelete: () => this.setState({ password: "" }),
                style: styles.styleWidth,
              }}
              eye={true}
              onSetSee={this.onSetSee}
              styleTextInput={{
                width: sizeWidth(78),
              }}
              styleChild={styles.styleChild}
            />
          </View>
          <View
            style={{ backgroundColor: "#F6F6F7", marginTop: sizeHeight(2) }}
          >
            <View style={styles.infor}>
              <Text style={styles.textInfor}>Thông tin kho</Text>
            </View>
            <View style={{ alignSelf: "center" }}>
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
                  placeholder: "Email",
                  placeholderTextColor: "#999",
                  type: "name",
                  size: sizeFont(6),
                  name: "times-circle",
                  value: email,
                  onChangeText: (text) => this.setState({ email: text }),
                  primary: "#017DFF",
                  color: COLOR.COLOR_ICON,
                  onDelete: () => this.setState({ email: "" }),
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

            <View style={styles.viewGender}>
              <TouchableOpacity>
                <Text style={styles.textDayTitle}>Ngày sinh</Text>
                <Text
                  style={styles.textDayOfBirth}
                  onPress={() => this.setState({ showCalendar: true })}
                >
                  {dayOfBirth}{" "}
                </Text>
              </TouchableOpacity>
              <View>
                <Text style={[styles.textDayTitle, { textAlign: "right" }]}>
                  Giới tính
                </Text>
                <View style={styles.viewChildGender}>
                  <Text
                    onPress={() => {
                      this.setState({ gender: 1 });
                    }}
                    style={[
                      styles.textGender,
                      {
                        backgroundColor: gender == 1 ? "#fff" : "#ddd",
                      },
                    ]}
                  >
                    Nam
                  </Text>
                  <Text
                    onPress={() => {
                      this.setState({ gender: 2 });
                    }}
                    style={[
                      styles.textGender,
                      {
                        backgroundColor: gender == 2 ? "#fff" : "#ddd",
                      },
                    ]}
                  >
                    Nữ
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ alignSelf: "center", marginTop: sizeHeight(1) }}>
              <FormTextInput
                props={{
                  placeholder: "Tỉnh/Thành phố",
                  placeholderTextColor: "#999",
                  type: "email",
                  size: sizeFont(8),
                  name: "chevron-down",
                  value: city.NAME == undefined ? "" : city.NAME,
                  onChangeText: (text) => null,
                  primary: "#017DFF",
                  color: COLOR.BUTTON,
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
                onPressCustom={() => {
                  this.props.navigation.navigate("ListCountries", {
                    onSetCity: this.changeCity,
                  });
                }}
                changeColor={COLOR.BUTTON}
                light
              />
              <FormTextInput
                props={{
                  placeholder: "Quận/Huyện",
                  placeholderTextColor: "#999",
                  type: "email",
                  size: sizeFont(6),
                  name: "chevron-down",
                  value: district.NAME == undefined ? "" : district.NAME,
                  onChangeText: (text) => null,
                  primary: "#017DFF",
                  color: COLOR.BUTTON,
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
                onPressCustom={() => {
                  if (city == "") {
                    this.message = "Vui lòng chọn Tỉnh/Thành phố";
                    this.setState({ showAlert: true });
                  } else {
                    this.props.navigation.navigate("ListDistrict", {
                      onSetDistrict: this.changeDistrict,
                      GHN_TINHID: city.MATP,
                    });
                  }
                }}
                changeColor={COLOR.BUTTON}
                light
              />
              <FormTextInput
                props={{
                  placeholder: "Phường/Xã",
                  placeholderTextColor: "#999",
                  type: "email",
                  size: sizeFont(6),
                  name: "chevron-down",
                  value:
                    districChild.NAME == undefined ? "" : districChild.NAME,
                  onChangeText: (text) => null,
                  primary: "#017DFF",
                  color: COLOR.BUTTON,
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
                onPressCustom={() => {
                  if (city == "") {
                    this.setState({ showAlert: true });
                  } else if (district == "") {
                    this.message = "Vui lòng chọn Quận/Huyện";
                    this.setState({ showAlert: true });
                  } else {
                    this.props.navigation.navigate("ListDistrictChild", {
                      onSetDistrictChild: this.changeDistrictChild,
                      GHN_TINHID: district.MAQH,
                    });
                  }
                }}
                changeColor={COLOR.BUTTON}
                light
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
                  color: COLOR.BUTTON,
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

            <ListBank
              account={account}
              nameAccount={nameAccount}
              nameBank={nameBank}
              changeStateAccount={this.changeStateAccount}
              changeStateName={this.changeStateName}
              changeStateBank={this.changeStateBank}
              deleteStateAccount={this.deleteStateAccount}
              deleteStateBank={this.deleteStateBank}
              deleteStateName={this.deleteStateName}
              updateAccount={() => {
                this.setState({ loading: true }, () => this.updateAccount());
              }}
              title="CẬP NHẬT"
            />
          </View>

          <AlertDesignNotification
            showAlert={showAlert}
            message={this.message}
            title="Thông báo"
            onClose={() => this.setState({ showAlert: false })}
          />
          <DateTimePickerModal
            isVisible={showCalendar}
            mode="date"
            date={new Date(moment("01/01/1990").format("DD/MM/YYYY"))}
            maximumDate={new Date()}
            onConfirm={(day) => {
              this.handleDate(day);
            }}
            onCancel={() => this.setState({ showCalendar: false })}
          />
        </ScrollView>
      </Provider>
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
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateStore);
