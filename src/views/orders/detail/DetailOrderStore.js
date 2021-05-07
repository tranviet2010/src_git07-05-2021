import React, { Component } from "react";
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import {
  getDetailOrdered,
  updateOrder,
  updateOrderShop,
} from "../../../service/order";

import { ElementCustom, AlertCommon } from "../../../components/error";
import Spinner from "react-native-loading-spinner-overlay";
import { Image, CheckBox } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from "./style";
import moment from "moment";
import {
  sizeHeight,
  sizeWidth,
  sizeFont,
} from "../../../utils/helper/size.helper";
import { COLOR } from "../../../utils/color/colors";
import { ActivityIndicator, Text } from "react-native-paper";
import IconComponets from "../../../components/icon";
import Loading from "../../../components/loading";
import Modal from "react-native-modal";
var numeral = require("numeral");

class DetailOrderStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      dayStart: "",
      dayEnd: "",
      statusOrser: "",
      showCalendar: false,
      note: "",
      noteShop: "",
      update: false,
      checked: false,
      showModal: false,
      deny: false,
    };
    this.time;
  }
  changeStatus = (text) => {
    this.setState({
      statusOrser: text,
    });
  };
  handleDate = (item, type) => {
    if (type == 1) {
      this.setState({ dayStart: moment(item).format("DD/MM/YYYY") }, () =>
        this.setState({ showCalendar: false })
      );
    } else {
      this.setState({ dayEnd: moment(item).format("DD/MM/YYYY") }, () =>
        this.setState({ showCalendar: false })
      );
    }
  };
  async componentDidMount() {
    const { CODE_ORDER } = this.props.route.params;
    const { username } = this.props;
    await this.handleLoad();
  }
  handleLoad = async () => {
    const { CODE_ORDER } = this.props.route.params;
    const { username, authUser } = this.props;
    await getDetailOrdered({
      USERNAME: authUser.USERNAME,
      CODE_ORDER: CODE_ORDER,
      IDSHOP: "F6LKFY",
    })
      .then((result) => {
        if (result.data.ERROR == "0000") {
          // var start = new Date(
          //   result.data.ORDER.CREATE_DATE.toString().replace(" ", "T")
          // );
          //moment().toNow()
          this.setState(
            {
              data: [result.data.INFO, result.data.ORDER],
              dayStart: moment(
                result.data.ORDER.CREATE_DATE,
                "DD/MM/YYYY"
              ).format("DD/MM/YYYY"),
              dayEnd:
                result.data.ORDER.TIME_RECEIVER == null
                  ? moment(new Date()).format("hh:mm DD/MM/YYYY")
                  : moment(
                      result.data.ORDER.TIME_RECEIVER,
                      "DD/MM/YYYY"
                    ).format("hh:mm DD/MM/YYYY"),
              noteShop:
                result.data.ORDER.NOTE === null ? "" : result.data.ORDER.NOTE,

              statusOrser: +result.data.ORDER.STATUS,
              checked: result.data.ORDER.UNIT === 0 ? false : true,
            },
            () => {
              this.setState({ loading: false }, () => {
              });
            }
          );
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  };
  handleMoney = (item) => {
    var result = 0;
    for (let i = 0; i < item.length; i++) {
      result += +parseFloat(item[i].MONEY);
    }
    return numeral(result).format("0,0");
  };
  handleTotalMoney = (item, item2) => {
    var result = 0;
    if (item2.ISSETUP === "0") {
      for (let i = 0; i < item.length; i++) {
        if (item[i].COST_SHIP !== null) {
          result += parseFloat(item[i].MONEY) + parseFloat(item[i].COST_SHIP);
        } else {
          result += parseFloat(item[i].MONEY);
        }
      }
    } else {
      for (let i = 0; i < item.length; i++) {
        if (item[i].COST_SHIP === null && item[i].COST_SETUP === null) {
          result += parseFloat(item[i].MONEY);
        } else if (item[i].COST_SETUP === null) {
          result += parseFloat(item[i].MONEY) + parseFloat(item[i].COST_SHIP);
        } else if (item[i].COST_SHIP == null) {
          result += parseFloat(item[i].MONEY) + parseFloat(item[i].COST_SETUP);
        } else {
          result +=
            parseFloat(item[i].MONEY) +
            parseFloat(item[i].COST_SHIP) +
            parseFloat(item[i].COST_SETUP);
        }
      }
      return numeral(result).format("0,0");
    }
    return numeral(result).format("0,0");
  };
  changeTitle = () => {
    const { dayStart, dayEnd, statusOrser, data } = this.state;
    if (statusOrser === 0) {
      return "Đã hoàn thành";
    } else if (statusOrser === 1) return "Đã tiếp nhận";
    else if (statusOrser === 2) return "Đang xử lý ";
    else if (statusOrser === 3) return "Đang vận chuyển";
    else if (statusOrser === 4) return "Huỷ đơn hàng";
    else if (statusOrser === 7) return "Đã giao hàng";
  };
  updateOrderDetail = (item) => {
    const { note, noteShop, statusOrser } = this.state;
    const { authUser } = this.props;
    updateOrder({
      USERNAME: authUser.USERNAME,
      CODE_ORDER: item.ID_CODE_ORDER,
      STATUS: statusOrser,
      NOTE: noteShop,
      IDSHOP: "F6LKFY",
    })
      .then(async (result) => {
        if (result.data.ERROR === "0000") {
          await this.handleLoad();
          this.setState({ update: false }, () => {
            this.time = setTimeout((ele, index) => {
              return AlertCommon("Thông báo", result.data.RESULT, () => null);
            }, 100);
          });
        } else {
          this.setState({ update: false }, () => {
            this.time = setTimeout((ele, index) => {
              return AlertCommon("Thông báo", result.data.RESULT, () => null);
            }, 100);
          });
        }
      })
      .catch((error) => {
        this.setState({ update: false });
      });
  };
  updateOrderDetailShop = (item) => {
    const { note, noteShop, statusOrser, checked, dayEnd, data } = this.state;
    const { authUser } = this.props;
    updateOrderShop({
      USERNAME: authUser.USERNAME,
      CODE_ORDER: item.ID_CODE_ORDER,
      STATUS: statusOrser,
      NOTE: noteShop,
      IDSHOP: "F6LKFY",
      ID: item.ID_CODE_ORDER,
      TIME_RECEIVER: dayEnd,
      UNIT: checked === false ? 0 : 1,
    })
      .then(async (result) => {
        if (result.data.ERROR === "0000") {
          await this.handleLoad();
          this.setState({ update: false }, () => {
            this.time = setTimeout((ele, index) => {
              return AlertCommon("Thông báo", result.data.RESULT, () => null);
            }, 100);
          });
        } else {
          this.setState({ update: false }, () => {
            this.time = setTimeout((ele, index) => {
              return AlertCommon("Thông báo", result.data.RESULT, () => null);
            }, 100);
          });
        }
      })
      .catch((error) => {
        this.setState({ update: false });
      });
  };

  componentWillUnmount() {
    clearTimeout(this.time);
  }
  handleFeeShip = (item) => {
    var feeShip = 0;
    for (let i = 0; i < item.length; i++) {
      feeShip += parseFloat(item[i].COST_SHIP);
    }
    return feeShip;
  };
  handleFeeSetUp = (item) => {
    var feeSetUp = 0;
    for (let i = 0; i < item.length; i++) {
      feeSetUp += parseFloat(item[i].COST_SETUP);
    }
    return feeSetUp;
  };

  render() {
    const {
      loading,
      data,
      dayEnd,
      dayStart,
      showCalendar,
      note,
      noteShop,
      update,
      showModal,
      statusOrser,
      deny,
    } = this.state;
    const { authUser, navigation } = this.props;
    const { TYPE, NAME } = this.props.route.params;
    return loading ? (
      <Spinner
        visible={loading}
        customIndicator={<ElementCustom />}
        //overlayColor="#ddd"
      />
    ) : data.length == 0 ? null : (
      <ScrollView keyboardShouldPersistTaps="handled">
        <Spinner
          visible={update}
          customIndicator={<ElementCustom />}
          //overlayColor="#ddd"
        />
        <View style={{ backgroundColor: "#fff" }}>
          {authUser.GROUPS === "3" ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: sizeHeight(1.5),
                paddingHorizontal: sizeWidth(3),
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                Mã ĐH: {data[1].ID_CODE_ORDER}{" "}
              </Text>
              <Text
                style={{ textDecorationLine: "underline", color: COLOR.BLUE }}
                // onPress={() => {
                //   navigation.navigate("ListStores", {
                //     NAME: "DetailOrderStore",
                //     item: { CODE_ORDER: data[1].ID_CODE_ORDER },
                //     authUser: authUser,
                //   });
                // }}

                onPress={() =>
                  navigation.navigate("DetailsOrdered", {
                    CODE_ORDER: data[1].ID_CODE_ORDER,
                    TYPE: TYPE,
                    NAME: "DetailOrderStore",
                  })
                }
              >
                Đơn đại lý{" "}
              </Text>
            </View>
          ) : null}
          <View style={{}}>
            <Text style={styles.textTitle}>Nội dung đơn hàng</Text>
            <View
              style={{
                borderBottomWidth: 3,
                borderBottomColor: "#ddd",
                width: sizeWidth(95),
                alignSelf: "center",
              }}
            >
              <FlatList
                data={data[0]}
                keyExtractor={(item) => item.ID}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        marginVertical: sizeHeight(2),
                      }}
                    >
                      <Image
                        source={{ uri: item.IMAGE_COVER }}
                        style={{
                          width: sizeWidth(25),
                          height: sizeHeight(15),
                          overflow: "hidden",
                        }}
                        resizeMode="contain"
                        PlaceholderContent={<ActivityIndicator />}
                      />
                      <View
                        style={{
                          marginLeft: sizeWidth(5),
                          width: sizeWidth(66),
                        }}
                      >
                        <View style={styles.space}>
                          <Text
                            style={{
                              paddingBottom: sizeHeight(0.2),
                              fontSize: sizeFont(4),
                            }}
                          >
                            {item.PRODUCT_NAME}{" "}
                          </Text>
                          <Text style={styles.textOrder}>
                            {item.MODEL_PRODUCT}{" "}
                          </Text>
                        </View>
                        <View style={styles.viewItemChild}>
                          <Text style={styles.size}>Thuộc tính</Text>
                          <Text style={{ color: "#888" }}>
                            {item.PROPERTIES == null ? "" : item.PROPERTIES}{" "}
                          </Text>
                        </View>
                        <View style={styles.viewItemChild}>
                          <Text style={styles.size}>Đơn giá thu KH</Text>
                          <Text style={styles.textCommon}>
                            {numeral(item.PRICE).format("0,0")} VNĐ{" "}
                          </Text>
                        </View>
                        <View style={styles.viewItemChild}>
                          <Text style={styles.size}>Số lượng</Text>
                          <Text style={styles.textCommon}>x{item.NUM} </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
            <View style={{ flexDirection: "row", marginTop: sizeHeight(2) }}>
              <View style={{ flex: 0.8 }} />
              <View style={{ flex: 2.5 }}>
                <View style={styles.viewPrice}>
                  <Text style={styles.textTitlePrice}>Thành tiền</Text>
                  <Text style={styles.textPrice}>
                    {this.handleMoney(data[0])} VNĐ
                  </Text>
                </View>
                <View style={styles.viewPrice}>
                  <Text style={styles.textTitlePrice}>
                    Phí vận chuyển dự kiến
                  </Text>
                  <Text style={styles.textPrice}>
                    {numeral(this.handleFeeShip(data[0])).format("0,0")} VNĐ
                  </Text>
                </View>
                <View style={styles.viewPrice}>
                  <Text style={styles.textTitlePrice}>Phí lắp đặt dự kiến</Text>
                  <Text style={styles.textPrice}>
                    {data[1].ISSETUP === "0"
                      ? 0
                      : numeral(this.handleFeeSetUp(data[0])).format("0,0")}
                    {" VNĐ"}
                  </Text>
                </View>
                <View style={styles.viewPrice}>
                  <Text
                    style={{
                      backgroundColor: "rgb(243,116,29)",
                      color: "#fff",
                      paddingHorizontal: sizeWidth(2.5),
                      paddingVertical: sizeHeight(0.2),
                    }}
                  >
                    Tổng tiền thanh toán
                  </Text>
                  <Text style={[styles.textPrice, { fontWeight: "bold" }]}>
                    {this.handleTotalMoney(data[0], data[1])} VNĐ
                  </Text>
                </View>
                <View style={styles.viewSetting}>
                  <IconComponets
                    name="wrench"
                    size={sizeFont(6)}
                    color="#999"
                  />
                  <Text style={styles.textSetting}>
                    {data[1].ISSETUP === "1" ? "Có" : "Không"} lắp đặt
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.reciver}>
            <View style={styles.viewChild}>
              <View style={styles.viewTable}>
                <Text style={styles.textReciver}>Người nhận:</Text>
              </View>
              <Text style={styles.textReciverDetail}>
                {data[1].FULLNAME_RECEIVER}{" "}
              </Text>
            </View>
            <View style={styles.viewChild}>
              <View style={styles.viewTable}>
                <Text style={styles.textReciver}>Số điện thoại:</Text>
              </View>
              <Text style={styles.textReciverDetail}>
                {data[1].MOBILE_RECEIVER}
              </Text>
            </View>
            <View style={styles.viewChild}>
              <View style={styles.viewTable}>
                <Text style={styles.textReciver}>Địa chỉ:</Text>
              </View>
              <Text style={styles.textReciverDetail}>
                {data[1].ADDRESS_RECEIVER}{" "}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: "#fff" }}>
          <Text style={styles.textTitle}>Tình trạng đơn hàng</Text>

          <View
            style={{
              marginTop: sizeHeight(1),
              width: sizeWidth(96),
              alignSelf: "center",
              backgroundColor: "#fff",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: sizeHeight(1),
                backgroundColor: "#fff",
              }}
            >
              <TouchableOpacity
                disabled={true}
                // disabled={TYPE === 4 || TYPE === 0 ? true : false}
                // onPress={() => {
                //   if (TYPE === 1 || TYPE === 3 || TYPE === 7) {
                //     this.props.navigation.navigate("StatusBuyer", {
                //       onSetStatus: this.changeStatus,
                //       TYPE: authUser.GROUPS,
                //       STATUS: data[1].STATUS_NAME,
                //     });
                //   }
                // }}
                style={styles.touchTwo}
              >
                <Text style={styles.textFirst}>Trạng thái</Text>
                <View style={styles.viewIcon}>
                  <Text
                    style={[
                      styles.textSecond,
                      { position: "absolute", right: 0 },
                    ]}
                  >
                    {this.changeTitle()}{" "}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              // disabled={this.props.authUser.GROUPS === "3" ? false : true}
              style={styles.touchTwo}
            >
              <Text style={styles.textFirst}>Thời gian dự kiến nhận hàng:</Text>
              <TouchableOpacity
                style={styles.viewTimeDeliver}
                onPress={() => {
                  if (TYPE === 1 && authUser.GROUPS === "3") {
                    this.setState(
                      { showCalendar: true },
                      () => (this.type = 2)
                    );
                  }
                }}
              >
                <Text
                  style={[styles.textTime, { position: "absolute", right: 0 }]}
                >
                  {dayEnd}{" "}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.touchTwo}>
              <Text style={styles.textFirst}>
                {data[1].UNIT === 0 ? "Shop thu tiền" : "Kho thu tiền"}{" "}
              </Text>
            </View>
            <View style={{ marginTop: sizeHeight(1) }}>
              <Text
                style={{
                  fontSize: sizeFont(4),
                  color: "#888",
                  marginBottom: sizeHeight(1),
                }}
              >
                Ghi chú
              </Text>
              <TextInput
                value={noteShop}
                editable={TYPE === 4 || TYPE === 0 ? false : true}
                onChangeText={(text) => this.setState({ noteShop: text })}
                style={styles.textNote}
              />
            </View>
            {TYPE === 6 ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: sizeHeight(2),
                  alignSelf: "center",
                }}
              >
                {deny ? null : (
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({ showModal: !showModal, statusOrser: 5 })
                    }
                    style={[styles.touchAccept, { marginRight: sizeWidth(3) }]}
                  >
                    <Text style={styles.textAccept}>Xác nhận</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[
                    styles.touchAccept,
                    { backgroundColor: deny ? COLOR.HEADER : COLOR.BUTTON },
                  ]}
                  onPress={() =>
                    this.setState({ deny: !deny, statusOrser: data[1].STATUS })
                  }
                >
                  <Text style={styles.textAccept}>Không xác nhận</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            <DateTimePickerModal
              isVisible={showCalendar}
              mode="date"
              minimumDate={new Date()}
              onConfirm={(day) => {
                this.handleDate(day, this.type);
              }}
              onCancel={() => this.setState({ showCalendar: false })}
            />
          </View>

          <View
            style={{
              backgroundColor: "#fff",
              marginVertical: sizeHeight(3),
            }}
          >
            <Text style={styles.textTitle}>Giá trị nhập hàng</Text>

            <View
              style={{
                marginTop: sizeHeight(1),
                width: sizeWidth(96),
                alignSelf: "center",
                backgroundColor: "#fff",
              }}
            >
              <View style={styles.viewFooter}>
                <Text style={styles.textFirst}>Tổng giá trị hàng nhập</Text>
                <Text style={styles.textSetting}>
                  {" "}
                  {this.handleMoney(data[0])} VNĐ
                </Text>
              </View>
              <View style={styles.viewFooter}>
                <Text style={styles.textFirst}>Phí vận chuyển</Text>
                <Text style={styles.textSetting}>
                  {numeral(this.handleFeeShip(data[0])).format("0,0")} VNĐ
                </Text>
              </View>
              <View style={styles.viewFooter}>
                <Text style={styles.textFirst}>Phí lắp đặt</Text>
                <Text style={styles.textSetting}>
                  {data[1].ISSETUP === "0"
                    ? 0
                    : numeral(this.handleFeeSetUp(data[0])).format("0,0")}
                  {" VNĐ"}
                </Text>
              </View>
              <View style={styles.viewFooter}>
                <Text style={styles.textFirst}>Tổng</Text>
                <Text style={[styles.textSetting, { fontWeight: "bold" }]}>
                  {this.handleTotalMoney(data[0], data[1])} VNĐ
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.touchSearch}
            disabled={TYPE === 4 || TYPE === 0 ? true : false}
            onPress={() => {
              this.setState({ update: true }, () => {
                if (authUser.GROUPS !== "3") this.updateOrderDetail(data[1]);
                else {
                  this.updateOrderDetailShop(data[1]);
                }
              });
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>CẬP NHẬT</Text>
          </TouchableOpacity>
        </View>

        <Modal
          isVisible={showModal}
          onBackButtonPress={() => this.setState({ showModal: !showModal })}
          onBackdropPress={() => this.setState({ showModal: !showModal })}
          backdropOpacity={0.6}
        >
          <View style={styles.viewModal}>
            <View style={styles.viewModalTitle}>
              <Text style={styles.textTitleModal}>
                XÁC NHẬN HOÀN THÀNH ĐƠN HÀNG
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: sizeWidth(2.5),
                paddingVertical: sizeHeight(2),
              }}
            >
              <Text
                style={{ fontSize: sizeFont(4), marginBottom: sizeHeight(1) }}
              >
                Mã ĐH:{data[1].ID_CODE_ORDER}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: sizeFont(4) }}>
                  Tổng tiền KH thanh toán
                </Text>
                <Text style={styles.textSecond}>
                  {" "}
                  {this.handleTotalMoney(data[0], data[1])} VNĐ
                </Text>
              </View>
            </View>

            <View style={{ marginVertical: sizeHeight(2) }}>
              <Text
                style={{
                  color: COLOR.BUTTON,
                  textAlign: "center",
                  fontSize: sizeFont(5),
                  fontWeight: "bold",
                }}
              >
                {data[1].UNIT === 0 ? "Shop thu tiền" : "Kho thu tiền"}{" "}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: sizeHeight(2),
                alignSelf: "center",
              }}
            >
              <TouchableOpacity style={styles.touchAccept}>
                <Text style={styles.textAccept}>Xác nhận</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ showModal: !showModal })}
                style={[
                  styles.touchAccept,
                  { backgroundColor: COLOR.HEADER, marginLeft: sizeWidth(3) },
                ]}
              >
                <Text style={styles.textAccept}>Quay lại</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
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
)(DetailOrderStore);
