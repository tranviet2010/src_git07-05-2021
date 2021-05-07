import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Avatar, Accessory } from "react-native-elements";
import {
  sizeHeight,
  sizeFont,
  sizeWidth,
} from "../../../../../utils/helper/size.helper";
import { Switch, Provider } from "react-native-paper";
import { COLOR } from "../../../../../utils/color/colors";
import IconComponets from "../../../../../components/icon";
import { UpdateInforAccount } from "../../../../../service/account";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ImagePicker from "react-native-image-picker";
import AlertDesignNotification from "../../../../../components/alert/AlertDesignNotification";
import { GetProfile } from "../../../../../action/authAction";
import moment from "moment";
import { connect } from "react-redux";
import { AlertCommon, ElementCustom } from "../../../../../components/error";
import Loading from "../../../../../components/loading";
import Spinner from "react-native-loading-spinner-overlay";
const options = {
  title: "Select Avatar",
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
  maxWidth: 720,
  maxHeight: 1080,
};
class UpdateNewAgent extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props.route.params;
    this.state = {
      userName: data.USERNAME,
      userCode: data.USER_CODE,
      status: data.STATUS === 1 ? true : false,
      fullName: data.FULL_NAME,
      lavelStore: data.GROUP_DES,
      phone: data.USERNAME,
      email: data.EMAIL,
      dateOfBirth: data.DOB,
      gender: data.GENDER,
      city:
        data.CITY == null
          ? ""
          : {
              NAME: data.CITY,
              MATP: data.CITY_ID,
            },
      district:
        data.DISTRICT == null
          ? ""
          : {
              NAME: data.DISTRICT,
              MAQH: data.DISTRICT_ID,
            },
      districChild:
        data.WARD == null
          ? ""
          : {
              NAME: data.WARD,
              XAID: data.WARD_ID,
            },

      address: data.ADDRESS,
      bankNum: data.STK,
      bankName: data.TENTK,
      nameBank: data.TEN_NH,
      password: data.PASSWORD,
      loading: false,
      imageAvatar: !data.AVATAR ? "" : data.AVATAR,
      CMT_1: data.IMG1 ? data.IMG1 : "",
      CMT_2: data.IMG2 ? data.IMG2 : "",
      numCMNN: data.SO_CMT,
      showAlert: false,
      branchBank: data,
      showCalendar: false,
    };
    this.message;
  }
  componentDidMount() {}
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
  changeCity = (text) => {
    if (text == "- tất cả -") {
      this.setState({ city: "", district: "", districChild: "" });
    } else {
      this.setState({ city: text, district: "", districChild: "" }, () => {
      });
    }
  };
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

  updateAccount = () => {
    const {
      userCode,
      userName,
      status,
      fullName,
      lavelStore,
      phone,
      email,
      dateOfBirth,
      gender,
      city,
      district,
      ward,
      address,
      bankNum,
      bankName,
      nameBank,
      password,
      imageAvatar,
      CMT_1,
      CMT_2,
      numCMNN,
      districChild,
      showAlert,
    } = this.state;
    const { authUser } = this.props;

    UpdateInforAccount({
      USERNAME: authUser.USERNAME,
      USER_CTV: authUser.USERNAME,
      NAME: userName,
      DOB: dateOfBirth,
      GENDER: gender,
      EMAIL: email,
      CITY_NAME: city.NAME,
      DISTRICT_NAME: district.NAME,
      ADDRESS: address,
      STK: bankNum,
      TENTK: bankName,
      TENNH: nameBank,
      AVATAR: imageAvatar,
      IDSHOP: "F6LKFY",
      CMT: numCMNN,
      IMG1: CMT_1,
      IMG2: CMT_2,
      WARD_NAME: districChild.NAME,
      OLD_PWD: "",
      NEW_PWD: "",
      MOBILE: phone,
      STATUS: status === true ? 1 : 0,
    })
      .then((result) => {
        if (result.data.ERROR === "0000") {
          this.setState(
            {
              loading: false,
            },
            () => {
              this.message = setTimeout(
                () =>
                  AlertCommon("Thông báo", result.data.RESULT, () =>
                    this.props.navigation.navigate("MangeAgent")
                  ),
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
                    this.props.navigation.navigate("MangeAgent");
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
  handleDate = (item) => {
    this.setState(
      {
        showCalendar: false,
      },
      () => this.setState({ dateOfBirth: moment(item).format("DD/MM/YYYY") })
    );
  };
  render() {
    const { data } = this.props.route.params;
    const {
      userCode,
      userName,
      status,
      fullName,
      lavelStore,
      phone,
      email,
      dateOfBirth,
      gender,
      city,
      district,
      ward,
      address,
      bankNum,
      bankName,
      nameBank,
      password,
      imageAvatar,
      CMT_1,
      CMT_2,
      numCMNN,
      districChild,
      showAlert,
      showCalendar,
    } = this.state;
    return (
      <Provider>
        <ScrollView
          contentContainerStyle={{ backgroundColor: "#fff" }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={{
              width: sizeWidth(96),
              alignSelf: "center",
              position: "relative",
            }}
          >
            <View style={styles.viewComon}>
              <Text style={styles.fontComon}>Tên truy cập</Text>
              <Text>{userName} </Text>
            </View>
            <View style={styles.viewComon}>
              <Text style={styles.fontComon}>Mã đại lý</Text>
              <Text>{userCode} </Text>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                position: "absolute",
                right: sizeWidth(10),
                top: sizeHeight(2),
              }}
              onPress={() => this.handleImage(1)}
            >
              <View
                style={{
                  width: sizeFont(24),
                  borderRadius: sizeFont(12),
                  borderWidth: 1,
                  height: sizeFont(24),
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: "#ddd",
                }}
              >
                {imageAvatar === "" ? (
                  <IconComponets
                    name="user-circle"
                    size={sizeFont(20)}
                    color="#888"
                  />
                ) : (
                  <Avatar
                    source={{ uri: imageAvatar }}
                    rounded
                    resizeMode="contain"
                    size={sizeFont(20)}
                  />
                )}
              </View>
              <IconComponets
                name="camera-alt"
                size={sizeFont(6)}
                color="#888"
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: sizeWidth(-5),
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: sizeWidth(96),
              alignSelf: "center",
              marginTop: sizeHeight(5),
            }}
          >
            <View style={[styles.viewComon]}>
              <Text style={styles.fontComon}>Mật khẩu</Text>
              <View style={{ width: sizeWidth(66), flexDirection: "column" }}>
                <TextInput
                  value={password}
                  secureTextEntry={true}
                  style={styles.viewTextInput}
                  onChangeText={(text) => this.setState({ password: text })}
                />
              </View>
            </View>
            <View style={[styles.viewComon, { marginTop: 3 }]}>
              <Text style={styles.fontComon} />
              <Text
                style={{
                  fontSize: sizeFont(3),
                  color: "red",
                  width: sizeWidth(66),
                }}
              >
                (Không dấu và khoảng trắng,bao gồm chữ cái và số *)
              </Text>
            </View>
          </View>

          <Text style={styles.textTitle}>Thông tin đại lý</Text>
          <View style={{ width: sizeWidth(96), alignSelf: "center" }}>
            <View style={styles.viewComon}>
              <Text style={styles.fontComon}>Họ và tên</Text>
              <View style={{ width: sizeWidth(66) }}>
                <TextInput
                  value={fullName}
                  style={styles.viewTextInput}
                  onChangeText={(text) => this.setState({ fullName: text })}
                />
              </View>
            </View>
            <View style={styles.viewComon}>
              <Text style={styles.fontComon}>Cấp đại lý</Text>
              <TouchableOpacity style={styles.viewComonIcon}>
                <Text>{lavelStore} </Text>
                <IconComponets
                  name="chevron-down"
                  size={sizeFont(6)}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: sizeHeight(2),
              }}
            >
              <Text>Hoạt động</Text>
              <Switch
                value={status}
                onValueChange={() => this.setState({ status: !status })}
                color={COLOR.BUTTON}
              />
            </View>
            <View style={styles.viewComon}>
              <Text style={styles.fontComon}>Số điện thoại</Text>
              <View style={{ width: sizeWidth(66) }}>
                <TextInput
                  value={phone}
                  style={styles.viewTextInput}
                  onChangeText={(text) => this.setState({ phone: text })}
                />
              </View>
            </View>
            <View style={styles.viewComon}>
              <Text style={styles.fontComon}>Email</Text>
              <View style={{ width: sizeWidth(66) }}>
                <TextInput
                  value={email}
                  style={styles.viewTextInput}
                  onChangeText={(text) => this.setState({ email: text })}
                />
              </View>
            </View>

            <View style={styles.viewComon}>
              <Text style={styles.fontComon}>Ngày sinh</Text>
              <TouchableOpacity
                style={{
                  width: sizeWidth(30),
                  borderWidth: 1,
                  paddingVertical: sizeHeight(1),
                  alignItems: "center",
                  marginRight: sizeWidth(10),
                }}
                onPress={() => this.setState({ showCalendar: true })}
              >
                <Text>{dateOfBirth} </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  borderWidth: 0.1,
                  borderRadius: 4,
                  overflow: "hidden",
                  backgroundColor: "#999",
                }}
              >
                <TouchableOpacity
                  onPress={() => this.setState({ gender: 1 })}
                  style={{
                    backgroundColor: gender === 1 ? "#fff" : "#999",
                    paddingVertical: sizeHeight(0.9),
                    width: sizeWidth(12),
                    alignItems: "center",
                  }}
                >
                  <Text>Nam</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({ gender: 2 })}
                  style={{
                    backgroundColor: gender === 2 ? "#fff" : "#999",
                    paddingVertical: sizeHeight(0.9),
                    width: sizeWidth(12),
                    alignItems: "center",
                  }}
                >
                  <Text>Nữ</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.viewComon}>
              <Text style={styles.fontComon}>Tỉnh/TP</Text>
              <TouchableOpacity
                style={styles.viewComonIcon}
                onPress={() => {
                  this.props.navigation.navigate("ListCountries", {
                    onSetCity: this.changeCity,
                    NAME: "UpdateNewAgent",
                  });
                }}
              >
                <Text>{city.NAME} </Text>
                <IconComponets
                  name="chevron-down"
                  size={sizeFont(6)}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.viewComon}>
              <Text style={styles.fontComon}>Quận/Huyện</Text>
              <TouchableOpacity
                style={styles.viewComonIcon}
                onPress={() => {
                  if (city == "") {
                    this.message = "Vui lòng chọn Tỉnh/Thành phố";
                    this.setState({ showAlert: true });
                  } else {
                    this.props.navigation.navigate("ListDistrict", {
                      onSetDistrict: this.changeDistrict,
                      GHN_TINHID: city.MATP,
                      NAME: "UpdateNewAgent",
                    });
                  }
                }}
              >
                <Text>{district.NAME} </Text>
                <IconComponets
                  name="chevron-down"
                  size={sizeFont(6)}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.viewComon}>
              <Text style={styles.fontComon}>Phường/Xã</Text>
              <TouchableOpacity
                style={styles.viewComonIcon}
                onPress={() => {
                  if (city == "") {
                    this.setState({ showAlert: true });
                  } else if (district == "") {
                    this.message = "Vui lòng chọn Quận/Huyện";
                    this.setState({ showAlert: true });
                  } else {
                    this.props.navigation.navigate("ListDistrictChild", {
                      onSetDistrictChild: this.changeDistrictChild,
                      GHN_TINHID: district.MAQH,
                      NAME: "UpdateNewAgent",
                    });
                  }
                }}
              >
                <Text>{districChild.NAME} </Text>
                <IconComponets
                  name="chevron-down"
                  size={sizeFont(6)}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.viewComon}>
              <Text style={styles.fontComon}>Địa chỉ</Text>
              <View style={{ width: sizeWidth(66) }}>
                <TextInput
                  value={address}
                  style={styles.viewTextInput}
                  onChangeText={(text) => this.setState({ address: text })}
                />
              </View>
            </View>
            <View style={styles.viewComon}>
              <Text style={styles.fontComon}>Số CMND</Text>
              <View style={{ width: sizeWidth(66) }}>
                <TextInput
                  style={styles.viewTextInput}
                  value={numCMNN}
                  onChangeText={(text) => this.setState({ numCMNN: text })}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: sizeWidth(80),
              alignSelf: "center",
              marginTop: sizeHeight(3),
            }}
          >
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => this.handleImage(2)}
            >
              <Text>Ảnh CMND mặt trước</Text>
              {CMT_1 === "" ? (
                <IconComponets
                  name="camera-alt"
                  size={sizeFont(20)}
                  color="#888"
                />
              ) : (
                <Avatar
                  source={{ uri: CMT_1 }}
                  resizeMode="contain"
                  size={sizeFont(20)}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => this.handleImage(3)}
            >
              <Text>Ảnh CMND mặt sau</Text>
              {CMT_2 === "" ? (
                <IconComponets
                  name="camera-alt"
                  size={sizeFont(20)}
                  color="#888"
                />
              ) : (
                <Avatar
                  source={{ uri: CMT_2 }}
                  resizeMode="contain"
                  size={sizeFont(20)}
                />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.textTitle}>Tài khoản ngân hàng</Text>
          <View style={{ width: sizeWidth(96), alignSelf: "center" }}>
            <View style={styles.viewComon}>
              <Text style={styles.fontComon}>Số tài khoản</Text>
              <View style={{ width: sizeWidth(66) }}>
                <TextInput
                  value={bankNum}
                  style={styles.viewTextInput}
                  onChangeText={(text) => this.setState({ bankNum: text })}
                />
              </View>
            </View>
            <View style={styles.viewComon}>
              <Text style={styles.fontComon}>Tên TK</Text>
              <View style={{ width: sizeWidth(66) }}>
                <TextInput
                  value={bankName}
                  style={styles.viewTextInput}
                  onChangeText={(text) => this.setState({ bankName: text })}
                />
              </View>
            </View>

            <View style={styles.viewComon}>
              <Text style={styles.fontComon}>Ngân hàng</Text>
              <TouchableOpacity style={styles.viewComonIcon}>
                <Text>{nameBank} </Text>
                <IconComponets
                  name="chevron-down"
                  size={sizeFont(6)}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.viewComon}>
              <Text style={styles.fontComon}>Chi nhánh</Text>
              <View style={{ flex: 2 }}>
                <TextInput
                  value={fullName}
                  style={styles.viewTextInput}
                  onChangeText={(text) => this.setState({ fullName: text })}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.touchUpdate}
            onPress={() =>
              this.setState({ loading: true }, () => this.updateAccount())
            }
          >
            <Text style={styles.textUpdate}>Cập nhật</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={showCalendar}
            mode="date"
            date={
              new Date(moment("01/01/1990", "DD/MM/YYYY").format("DD/MM/YYYY"))
            }
            maximumDate={new Date()}
            onConfirm={(day) => {
              this.handleDate(day);
            }}
            onCancel={() => this.setState({ showCalendar: false })}
          />
          <Spinner
            visible={this.state.loading}
            customIndicator={<ElementCustom />}
            //overlayColor="#ddd"
          />
          <AlertDesignNotification
            showAlert={showAlert}
            message={this.message}
            title="Thông báo"
            onClose={() => this.setState({ showAlert: false })}
          />
        </ScrollView>
      </Provider>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    authUser: state.authUser.authUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { GetProfile: (text) => dispatch(GetProfile(text)) };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateNewAgent);
const styles = StyleSheet.create({
  viewComon: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: sizeHeight(2),
  },
  textTitle: {
    backgroundColor: "#ddd",
    color: "#000",
    paddingVertical: sizeHeight(1),
    fontSize: sizeFont(4),
    marginTop: sizeHeight(2),
    paddingHorizontal: sizeWidth(2.5),
  },
  fontComon: {
    fontSize: sizeFont(4),
    width: sizeWidth(30),
  },
  viewTextInput: {
    borderWidth: 1,
    flex: 2,
    paddingVertical: sizeHeight(1.2),
    paddingHorizontal: sizeWidth(1),
  },
  viewComonIcon: {
    borderWidth: 1,
    flexDirection: "row",
    paddingVertical: sizeHeight(1.2),
    justifyContent: "space-between",
    paddingHorizontal: sizeHeight(1),
    alignItems: "center",
    width: sizeWidth(66),
  },
  touchUpdate: {
    backgroundColor: COLOR.BUTTON,
    paddingVertical: sizeHeight(2),
    width: sizeWidth(60),
    alignSelf: "center",
    borderRadius: 6,
    marginVertical: sizeHeight(5),
  },
  textUpdate: {
    color: "#fff",
    textAlign: "center",
    fontSize: sizeFont(4),
  },
});
