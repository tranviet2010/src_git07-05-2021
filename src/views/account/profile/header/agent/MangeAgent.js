import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { GetListCTV, GetLevelCTV } from "../../../../../service/account";
import { connect } from "react-redux";
import {
  sizeWidth,
  sizeFont,
  sizeHeight,
} from "../../../../../utils/helper/size.helper";
import IconComponets from "../../../../../components/icon";
import { COLOR } from "../../../../../utils/color/colors";
import Spinner from "react-native-loading-spinner-overlay";
import { ElementCustom } from "../../../../../components/error";
import _ from "lodash";
import Loading from "../../../../../components/loading";
class MangeAgent extends Component {
  constructor(props) {
    super(props);
    this.offset = 1;
    this.onEndReachedCalledDuringMomentum = true;
    this.state = {
      search: "",
      cityID: "",
      search: "",
      loading: true,
      data: [],
      levelCTV: [],
      loadingSlow: false,
      picked: {
        VALUE: "",
        LEVEL_USER: "",
        NAME_LEVEL: "",
      },
      loadingMore: false,
    };
  }
  handleLoad = () => {
    const { authUser } = this.props;
    const { search, cityID, picked } = this.state;
    GetListCTV({
      USERNAME: authUser.USERNAME,
      SEARCH: search,
      LEVEL_AGENCY: picked.LEVEL_USER,
      I_PAGE: this.offset,
      NUMOFPAGE: 20,
      IDSHOP: "F6LKFY",
    })
      .then((result) => {
        if (result.data.ERROR === "0000") {
          this.setState({ data: result.data.INFO }, () =>
            this.setState({ loading: false })
          );
        }
        this.setState({ loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  handleSearch = () => {
    const { authUser } = this.props;
    const { search, cityID, picked } = this.state;
    this.offset = 1;
    this.setState({ loadingSlow: true }, () => {
      GetListCTV({
        USERNAME: authUser.USERNAME,
        SEARCH: search,
        LEVEL_AGENCY: picked.LEVEL_USER,
        I_PAGE: this.offset,
        NUMOFPAGE: 20,
        IDSHOP: "F6LKFY",
      })
        .then((result) => {
          if (result.data.ERROR === "0000") {
            this.setState({ data: result.data.INFO }, () =>
              this.setState({ loadingSlow: false })
            );
          } else this.setState({ loadingSlow: false });
        })
        .catch((error) => {
          this.setState({ loadingSlow: false });
        });
    });
  };

  handlePicked = (item) => {
    this.setState({ picked: item }, () =>
      this.props.navigation.navigate("MangeAgent")
    );
  };
  componentDidMount() {
    this.handleLoad();
  }

  onMomentumScrollBegin = () => {
    this.onEndReachedCalledDuringMomentum = false;
  };
  onEndReached = ({ distanceFromEnd }) => {
    const { authUser } = this.props;
    const { search, cityID, picked, data } = this.state;
    if (!this.onEndReachedCalledDuringMomentum) {
      this.offset = this.offset + 1;
      this.setState({ loadingMore: true }, () => {
        GetListCTV({
          USERNAME: authUser.USERNAME,
          SEARCH: search,
          LEVEL_AGENCY: picked.LEVEL_USER,
          I_PAGE: this.offset,
          NUMOFPAGE: 20,
          IDSHOP: "F6LKFY",
        })
          .then((result) => {
            if (result.data.ERROR === "0000") {
              this.setState({ data: _.concat(data, result.data.INFO) }, () =>
                this.setState({ loadingMore: false })
              );
            } else this.setState({ loadingMore: false });
          })
          .catch((error) => {
            this.setState({ loadingMore: false });
          });
      });
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  render() {
    const {
      search,
      loading,
      data,
      loadingSlow,
      picked,
      loadingMore,
    } = this.state;
    return loading ? (
      <Spinner
        visible={loading}
        animation="fade"
        customIndicator={<ElementCustom />}
      />
    ) : (
      <View style={styles.container}>
        <Spinner
          visible={loadingSlow}
          customIndicator={<ElementCustom />}
          //overlayColor="#ddd"
        />
        <View style={styles.viewTextinput}>
          <TextInput
            style={{ width: sizeWidth(80), paddingVertical: sizeHeight(0.5) }}
            value={search}
            onChangeText={(text) => this.setState({ search: text })}
            placeholder="Tên/Mã/Số điện thoại"
          />
          <IconComponets
            name="search"
            size={sizeFont(6)}
            color="#999"
            onPress={this.handleSearch}
          />
        </View>
        <View style={styles.viewSearch}>
          <View style={styles.viewSearch}>
            <Text style={styles.text}>Loại</Text>
            <TouchableOpacity
              style={styles.viewChild}
              onPress={() =>
                this.props.navigation.navigate("LevelCTV", {
                  picked: this.state.picked,
                  onPicking: this.handlePicked,
                  NAME: "MangeAgent",
                })
              }
            >
              <Text style={[styles.text, { paddingHorizontal: sizeWidth(5) }]}>
                {picked.NAME_LEVEL === "" ? " Tất cả" : picked.NAME_LEVEL}
              </Text>
            </TouchableOpacity>
            <IconComponets name="angle-down" size={sizeFont(6)} color="#999" />
          </View>
          <TouchableOpacity
            style={styles.touchSearch}
            onPress={() => this.handleSearch()}
          >
            <Text style={styles.textSearch}>Tìm kiếm</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.viewCTV}>
          <View style={styles.viewChildCTV}>
            <Text style={styles.textChildCTV}>Họ và tên</Text>
          </View>
          <View style={[styles.viewSubChildCTV, { flex: 0.5 }]}>
            <Text style={styles.textChildCTV}>Mã ĐL</Text>
          </View>
          <View style={styles.viewSubChildCTV}>
            <Text style={styles.textChildCTV}>Điện thoại</Text>
          </View>
          <View style={styles.viewSubChildCTV}>
            <Text style={styles.textChildCTV}>Phân loại</Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            contentContainerStyle={{
              paddingBottom: sizeHeight(5),
            }}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: sizeHeight(5),
                }}
              >
                <Text>Chưa có đại lý</Text>
              </View>
            )}
            keyExtractor={(item) => item.ID}
            onMomentumScrollBegin={this.onMomentumScrollBegin}
            onEndReached={this.onEndReached}
            scrollEventThrottle={0.5}
            ListFooterComponent={() => (loadingMore ? <Loading /> : null)}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={styles.viewContent}
                  onPress={() =>
                    this.props.navigation.navigate("UpdateNewAgent", {
                      NAME: "MangeAgent",
                      TITLE: "Cập nhật thông tin đại lý",
                      data: item,
                    })
                  }
                >
                  <View style={{ flex: 1 }}>
                    <Text>{item.FULL_NAME} </Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <Text>{item.USER_CODE} </Text>
                  </View>
                  <View style={{ flex: 0.7 }}>
                    <Text>{item.USERNAME} </Text>
                  </View>
                  <View style={{ flex: 0.7 }}>
                    <Text>
                      {item.LEVEL_AGENCY === null
                        ? "Chờ kích hoạt"
                        : item.LEVEL_AGENCY}{" "}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    username: state.authUser.username,
    idshop:state.product.database,
  };
};
const styles = StyleSheet.create({
  container: {
    width: sizeWidth(96),
    alignSelf: "center",
    flex: 1,
  },
  viewTextinput: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#999",
    marginTop: sizeHeight(2),
    paddingVertical: sizeHeight(1.5),
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: sizeWidth(2.5),
  },
  viewSearch: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: sizeHeight(2),
    paddingHorizontal: sizeWidth(2),
    alignItems: "center",
  },
  touchSearch: {
    backgroundColor: COLOR.BUTTON,
    paddingVertical: sizeHeight(1.5),
    borderRadius: 6,
    width: sizeWidth(30),
  },
  textSearch: {
    color: "#fff",
    textAlign: "center",
    fontSize: sizeFont(4),
  },
  viewChild: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#999",
    marginHorizontal: sizeWidth(2),
  },
  text: {
    fontSize: sizeFont(4),
  },
  viewCTV: {
    flexDirection: "row",
    marginTop: sizeHeight(4),
  },
  viewChildCTV: {
    flex: 1,
    borderRightWidth: 2,
    borderRightColor: "#fff",
    backgroundColor: COLOR.BUTTON,
    paddingVertical: sizeHeight(1.5),
  },
  textChildCTV: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  viewSubChildCTV: {
    flex: 0.7,
    borderRightWidth: 2,
    borderRightColor: "#fff",
    backgroundColor: COLOR.BUTTON,
    paddingVertical: sizeHeight(1.5),
  },
  viewContent: {
    flexDirection: "row",
    marginTop: sizeHeight(2.5),
  },
});
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MangeAgent);
