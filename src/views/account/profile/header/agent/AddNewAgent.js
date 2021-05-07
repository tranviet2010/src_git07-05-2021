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
class AddNewAgent extends Component {
  constructor(props) {
    super(props);
    const { authUser } = this.props;
    this.state = {
      phoneText: "",
      userName: authUser.FULL_NAME,
      idStore: authUser.USER_CODE,
      levelStore: authUser.GROUPS,
      email: authUser.EMAIL ? authUser.EMAIL : "",
      dayOfBirth: authUser.DOB
        ? moment(authUser.DOB, "DD/MM/YYYY").format("DD/MM/YYYY")
        : moment("01/01/1990").format("DD/MM/YYYY"),
      gender: authUser.GENDER === 1 ? 1 : 0,
      address: authUser.ADDRESS ? authUser.ADDRESS : "",
      passport: authUser.SO_CMT ? authUser.SO_CMT : "",
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
      imageAvatar: !authUser.AVATAR ? "" : authUser.AVATAR,
      CMT_1: authUser.IMG1 ? authUser.IMG1 : "",
      CMT_2: authUser.IMG2 ? authUser.IMG2 : "",
      showCalendar: false,
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
      imageAvatar,
      CMT_1,
      CMT_2,
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
      });
    }
  };
  
  upload = (source, data, type) => {
    if (source != null) {
      var photo = { ...source, name: "image.jpg", type: "image/jpeg" };

      //If file selected then create FormData
      const data = new FormData();
      data.append("name", "imagefile");
      data.append("image", photo);
      fetch("http://admin.babumart.vn/f/upload_image.jsp", {
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
            //this.props.onChange(responseJson.URL);
          } else {
            this.setState(
              {
                loading: false,
              },
              () => {
                this.message = setTimeout(
                  () =>
                    AlertCommon("Thông báo", result.data.RESULT, () => null),
                  10
                );
              }
            );
          }
        })
        .catch((err) => {
          this.setState({ loading: false });
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
  handleImage = (type) => {
    ImagePicker.showImagePicker(options, async (response) => {

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
      levelStore,
      email,
      dayOfBirth,
      gender,
      city,
      district,
      districChild,
      address,
      passport,
      nameBank,
      nameAccount,
      account,
      showAlert,
      loading,
      imageAvatar,
      CMT_1,
      CMT_2,
      showCalendar,
    } = this.state;
    return (
      <Provider>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Spinner
            visible={loading}
            customIndicator={<ElementCustom />}
            //overlayColor="#ddd"
          />
          <View style={styles.viewAvatar}>
            {this.props.authUser.AVATAR == null ? (
              <IconComponets
                name="user-circle"
                size={sizeFont(20)}
                color={COLOR.BUTTON}
              />
            ) : (
              <Avatar
                size={"xlarge"}
                containerStyle={{
                  borderWidth: 0.2,
                  borderColor: COLOR.BUTTON,
                }}
                rounded
                source={{
                  uri: imageAvatar,
                }}
              />
            )}

            <TouchableOpacity
              style={styles.viewTouchCamera}
              onPress={() => this.handleImage(1)}
            >
              <IconComponets
                name="camera"
                size={sizeFont(6)}
                color={COLOR.BUTTON}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{ backgroundColor: "#F6F6F7", marginTop: sizeHeight(2) }}
          >
            <View style={styles.infor}>
              <Text style={styles.textInfor}>Thông tin Đại lý</Text>
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
                  placeholder: "Mã đại lý",
                  placeholderTextColor: "#999",
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
                editable={false}
                styleChild={styles.styleChild}
              />

              <FormTextInput
                props={{
                  placeholder: "Cấp đại lý",
                  placeholderTextColor: "#999",
                  type: "name",
                  size: sizeFont(6),
                  name: "times-circle",
                  value: levelStore,
                  onChangeText: (text) => this.setState({ levelStore: text }),
                  primary: "#017DFF",
                  color: COLOR.COLOR_ICON,
                  onDelete: () => this.setState({ levelStore: "" }),
                  style: styles.styleWidth,
                }}
                eye={false}
                onSetSee={this.onSetSee}
                styleTextInput={{
                  width: sizeWidth(78),
                }}
                editable={false}
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

              <FormTextInput
                props={{
                  placeholder: "Số CMND",
                  placeholderTextColor: "#999",
                  type: "phone",
                  size: sizeFont(6),
                  name: "times-circle",
                  value: passport,
                  onChangeText: (text) => this.setState({ passport: text }),
                  primary: "#017DFF",
                  color: COLOR.BUTTON,
                  onDelete: () => this.setState({ passport: "" }),
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
            <View style={styles.viewImage}>
              <View style={styles.viewImageChild}>
                <Text>Ảnh CMND mặt trước</Text>
                <View style={styles.viewCMT}>
                  <TouchableOpacity
                    style={styles.touchCMT}
                    onPress={() => this.handleImage(2)}
                  >
                    {CMT_1 == "" ? (
                      <IconComponets
                        name="camera"
                        size={sizeFont(20)}
                        color={COLOR.BUTTON}
                      />
                    ) : (
                      <Image
                        resizeMode="cover"
                        style={styles.imageCMT}
                        source={{
                          uri: CMT_1,
                        }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.viewImageChild}>
                <Text>Ảnh CMND mặt sau</Text>
                <View style={styles.viewCMT}>
                  <TouchableOpacity
                    style={styles.touchCMT}
                    onPress={() => this.handleImage(3)}
                  >
                    {CMT_2 == "" ? (
                      <IconComponets
                        name="camera"
                        size={sizeFont(20)}
                        color={COLOR.BUTTON}
                      />
                    ) : (
                      <Image
                        resizeMode="cover"
                        style={styles.imageCMT}
                        source={{
                          uri: CMT_2,
                        }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
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
)(AddNewAgent);
