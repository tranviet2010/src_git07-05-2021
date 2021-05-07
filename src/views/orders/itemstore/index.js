import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity } from "react-native";
import { getListOrderStore } from "../../../service/order";
import { connect } from "react-redux";
import moment from "moment";
import { Provider, Paragraph, Portal, Dialog } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import _ from "lodash";
import Spinner from "react-native-loading-spinner-overlay";
import styles from "../style";
import { ElementCustom } from "../../../components/error";
import {
  sizeFont,
  sizeWidth,
  sizeHeight,
} from "../../../utils/helper/size.helper";
import ListOrderedStore from "../listorderstore";
import IconComponets from "../../../components/icon";
class ItemStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusOrser: this.props.TYPE,
      collaborator: "- Tất cả -",
      dayStart: moment()
        .add(-15, "day")
        .format("DD/MM/YYYY"),
      dayEnd: moment(new Date()).format("DD/MM/YYYY"),
      showCalendar: false,
      loading: true,
      data: [],
      loadingMore: false,
      picked: {
        USERNAME: "",
      },
      loadingSlow: false,
    };
    this.type = 1;
    this.offset = 1;
    this.onEndReachedCalledDuringMomentum = true;
  }

  changeStatus = (text) => {
    this.setState({
      statusOrser: text,
    });
  };
  handleDate = (item, type) => {
    if (type == 1) {
      this.setState({ dayStart: moment(item).format("DD/MM/YYYY") });
    } else {
      this.setState({ dayEnd: moment(item).format("DD/MM/YYYY") });
    }
  };
  onMomentumScrollBegin = () => {
    this.onEndReachedCalledDuringMomentum = false;
  };
  onEndReached = ({ distanceFromEnd }) => {
    const { username, authUser, name } = this.props;
    const { dayStart, dayEnd, statusOrser, loadingMore } = this.state;
    if (!this.onEndReachedCalledDuringMomentum) {
      this.offset = this.offset + 1;
      this.setState(
        {
          loadingMore: true,
        },
        () => {
          getListOrderStore({
            USERNAME: authUser.USERNAME,
            STATUS: statusOrser,
            START_TIME: dayStart,
            END_TIME: dayEnd,
            PAGE: this.offset,
            NUMOFPAGE: 8,
            IDSHOP: "F6LKFY",
          })
            .then((result) => {
              if (result.data.ERROR == "0000") {
                this.setState(
                  { data: _.concat(this.state.data, result.data.INFO) },
                  async () => {
                    this.setState({ loadingMore: false });
                  }
                );
              } else {
                this.setState({ loadingMore: false });
              }
            })
            .catch((error) => {
              this.setState({ loadingMore: false });
            });

          this.onEndReachedCalledDuringMomentum = true;
        }
      );
    }
  };

  searchOrder = () => {
    this.offset = 1;
    const { username, authUser } = this.props;
    const { dayStart, dayEnd, statusOrser, picked } = this.state;
    this.setState(
      {
        loadingSlow: true,
      },
      () =>
        getListOrderStore({
          USERNAME:
            picked.USERNAME === "" ? authUser.USERNAME : picked.USERNAME,
          STATUS: statusOrser,
          START_TIME: dayStart,
          END_TIME: dayEnd,
          PAGE: this.offset,
          NUMOFPAGE: 8,
          IDSHOP: "F6LKFY",
        })
          .then((result) => {
            if (result.data.ERROR == "0000") {
              this.setState({ data: result.data.INFO }, async () => {
                this.setState({ loadingSlow: false });
              });
            } else {
              this.setState({ loadingSlow: false, data: [] });
            }
          })
          .catch((error) => {
            this.setState({ loadingSlow: false, data: [] });
          })
    );
  };
  onRefresh = () => {
    const { username, authUser, name, navigation } = this.props;
    const { dayStart, dayEnd, statusOrser } = this.state;
    this.offset = 1;
    getListOrderStore({
      USERNAME: authUser.USERNAME,
      STATUS: statusOrser,
      START_TIME: dayStart,
      END_TIME: dayEnd,
      PAGE: this.offset,
      NUMOFPAGE: 8,
      IDSHOP: "F6LKFY",
    })
      .then((result) => {
        if (result.data.ERROR == "0000") {
          this.setState({ data: result.data.INFO }, async () => {
            navigation.setParams({
              notify: result.data.TOTAL_NOTI,
            });
            this.setState({ loading: false });
          });
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };
  componentDidMount() {
    const { username, authUser, navigation, name } = this.props;
    const { dayStart, dayEnd, statusOrser } = this.state;

    getListOrderStore({
      USERNAME: authUser.USERNAME,
      STATUS: statusOrser,
      START_TIME: dayStart,
      END_TIME: dayEnd,
      PAGE: this.offset,
      NUMOFPAGE: 10,
      IDSHOP: "F6LKFY",
    })
      .then((result) => {
        if (result.data.ERROR == "0000") {
          this.setState({ data: result.data.INFO }, () => {
            this.setState({ loading: false });
            navigation.setParams({
              notify: result.data.TOTAL_NOTI,
            });
          });
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }
  changeTitle = () => {
    const { dayStart, dayEnd, statusOrser } = this.state;
    if (statusOrser === "") {
      //alert(1);
      return "- Tất cả -";
    } else if (statusOrser === 0) {
      return "Đã hoàn thành";
    } else if (statusOrser === 1) return "Đã tiếp nhận";
    else if (statusOrser === 2) return "Đang xử lý ";
    else if (statusOrser === 3) return "Đang vận chuyển ";
    else if (statusOrser === 4) return "Đã hủy";
  };
  showCan = (item) => {
    this.setState({ showCalendar: true });
    this.type = item;
  };
  handlePicked = (item) => {
    this.setState({ picked: item }, () =>
      this.props.navigation.navigate("OrderStore")
    );
  };
  render() {
    const {
      statusOrser,
      collaborator,
      dayStart,
      dayEnd,
      showCalendar,
      loading,
      data,
      loadingMore,
      picked,
      loadingSlow,
    } = this.state;
    const { authUser, navigation, TYPE, name } = this.props;
    return loading ? (
      <Spinner
        visible={loading}
        customIndicator={<ElementCustom />}
        //overlayColor="#ddd"
      />
    ) : (
      <Provider>
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
          <Spinner
            visible={loadingSlow}
            customIndicator={<ElementCustom />}
            //overlayColor="#ddd"
          />
          <View style={styles.container}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
              }}
            >
              <TouchableOpacity
                style={styles.touchOne}
                onPress={() => this.showCan(1)}
              >
                <Text style={styles.textFirst}>Từ</Text>
                <View style={{ borderBottomWidth: 1, flex: 0.9 }}>
                  <Text style={styles.textSecond}>{dayStart} </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchTwo}
                onPress={() => this.showCan(2)}
              >
                <Text style={styles.textFirst}>Đến</Text>
                <View style={{ borderBottomWidth: 1, flex: 0.9 }}>
                  <Text style={styles.textSecond}>{dayEnd} </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchSearch}
                onPress={() => this.searchOrder()}
              >
                <Text style={{ textAlign: "center", color: "#fff" }}>Tìm</Text>
              </TouchableOpacity>
            </View>

            <DateTimePickerModal
              isVisible={showCalendar}
              mode="date"
              maximumDate={new Date()}
              onConfirm={(day) => {
                this.handleDate(day, this.type);
                this.setState({ showCalendar: false });
              }}
              onCancel={() => this.setState({ showCalendar: false })}
            />
          </View>
          {authUser.GROUPS === "3" ? (
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                justifyContent: "space-around",
                width: "100%",
                marginTop: sizeHeight(2),
              }}
            >
              <Text>Kho:</Text>
              <TouchableOpacity
                style={{ borderBottomWidth: 1, width: sizeWidth(70) }}
                onPress={() =>
                  navigation.navigate("ListNameStore", {
                    picked: picked,
                    onPicking: this.handlePicked,
                    NAME: "OrderStore",
                  })
                }
              >
                <Text style={{ textAlign: "center" }}>
                  {picked.USERNAME === "" ? "Tất cả" : picked.USERNAME}{" "}
                </Text>
              </TouchableOpacity>
              <IconComponets
                name="angle-down"
                size={sizeFont(5)}
                color="#000"
              />
            </View>
          ) : null}
          <View style={{ flex: 1 }}>
            <ListOrderedStore
              navigation={this.props.navigation}
              data={data}
              onEndReached={this.onEndReached}
              loading={loadingMore}
              onMomentumScrollBegin={this.onMomentumScrollBegin}
              onRefresh={this.onRefresh}
              authUser={authUser}
              TYPE={TYPE}
              name={name}
            />
          </View>
        </View>
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
)(ItemStore);
