import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  SectionList,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from "react-native";

var numeral = require("numeral");
import {
  getListSubChildProducts,
} from "../../../service/products";
import { _retrieveData } from "../../../utils/asynStorage";
import { USER_NAME } from "../../../utils/asynStorage/store";
import { addToCart } from "../../../action/orderAction";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import {DATAITEM} from "../../../utils/asynStorage/store"
import {
  AlertCommon,
  AlertCommonLogin,
  ElementCustom,
} from "../../../components/error";
import {
  sizeHeight,
  sizeFont,
  sizeWidth,
} from "../../../utils/helper/size.helper";
import { Image } from "react-native-elements";
import IconComponets from "../../../components/icon";
import styles from "../listItem/style";
import { handleMoney } from "../../../components/money";
import { COLOR } from "../../../utils/color/colors";
import { size } from "lodash";

class ChildListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      refreshing: false,
      cartLength:this.props.listItem.length,
      search: "",
      loadingSearch: false,
    };
    this.see = false;
  }
  handleSearch = async () => {
    const { ID } = this.props.route.params;
    await getListSubChildProducts({
      USERNAME: this.props.username == "" ? null : this.props.username,
      SUB_ID: ID,
      IDSHOP: "F6LKFY",
      SEARCH_NAME: this.state.search,
    })
      .then((result) => {
        if (result.data.ERROR == "0000") {
          for (let i = 0; i < result.data.DETAIL.length; i++) {
            result.data.DETAIL[i].data = result.data.DETAIL[i].INFO;
          }
          this.setState(
            {
              data: result.data.DETAIL,
            },
            () => {
              this.setState({ loadingSearch: false });
            }
          );
        } else {
          this.setState(
            {
              loadingSearch: false,
            },
            () => {
              this.message = setTimeout(
                () => AlertCommon("Thông báo", result.data.RESULT, () => null),
                10
              );
            }
          );
        }
      })
      .catch((error) => {
        this.setState({ loadingSearch: false });
      });
  };
  checkTime = (a, b) => {
    var start = a;
    var end = b;
    var datePart1 = start.split("/");
    var datePart2 = end.split("/");

    var dateObject1 = new Date(+datePart1[2], datePart1[1] - 1, +datePart1[0]);
    var dateObject2 = new Date(+datePart2[2], datePart2[1] - 1, +datePart2[0]);
    return dateObject2 - dateObject1;
  }
  handleTouchAdd = async (data) => {
    const { count, activeTab, cartLength, loading, properties } = this.state;
    const { status, navigation } = this.props;
    data.qualyty = 1;
    if (status == "") {
      return AlertCommonLogin(
        "Thông báo",
        "Vui lòng đăng nhập trước khi đặt hàng",
        () => null,
        () => {
          navigation.popToTop();
          navigation.navigate("SignIn");
        },
        "Huỷ bỏ",
        "Đăng nhập"
      );
    }
    
    let dataCart = await _retrieveData(DATAITEM);
    let cart = JSON.parse(dataCart);
    await this.props.addToCart({ cart, data });
    if (cartLength == this.props.listItem.length) {
      AlertCommon("Thông báo", "Sản phẩm đã có trong giỏ hàng", () => null);
    } else {
      Alert.alert(
        "Thông báo",
        "Thêm sản phẩm vào giỏ hàng thành công",
        [
          {
            text: "OK",
            style: "destructive",
        },
          {
            text: "Vào giỏ hàng",
            onPress: () => {
              navigation.navigate("Carts", {
                NAME: "ChildListItem", 
              })
            },
            style: "default",
          },
        ],
        { cancelable: false }
      );
      this.setState({
        cartLength: cartLength + 1,
      });
    }
  };
  componentWillUnmount() {
    clearTimeout(this.message);
  }
  async componentDidMount() {
    const { ID } = this.props.route.params;
    var resultArray = [];
    await getListSubChildProducts({
      USERNAME: this.props.username,
      SUB_ID: ID,
      IDSHOP: "F6LKFY",
      SEARCH_NAME: "",
    })
      .then((result) => {
        if (result.data.ERROR == "0000") {
          for (let i = 0; i < result.data.DETAIL.length; i++) {
            result.data.DETAIL[i].data = result.data.DETAIL[i].INFO;
          }
          this.setState(
            {
              data: result.data.DETAIL,
            },
            () => {
              this.setState({ loading: false });
            }
          );
        } else {
          this.setState({ loading: false }, () => {
            this.message = setTimeout((ele) => {
              AlertCommon("Thông báo", "Mặt hàng này đang được cập nhật. Quý khách vui lòng quay lại sau", () => null);
            }, 10);
          });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { loading, data, refreshing, search } = this.state;
    const { navigation, status, authUser } = this.props;
    return loading ? (
      <Spinner
        visible={loading}
        customIndicator={<ElementCustom />}
      // overlayColor="#ddd"
      />
    ) : (
        <View style={{ backgroundColor: "#fff", height: sizeHeight(100) }}>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
              borderRadius: 6,
              borderWidth: 1,
              borderColor: "#ddd",
              paddingHorizontal: sizeWidth(2),
              marginTop: sizeHeight(2),
              width: sizeWidth(94),
              alignSelf: "center",
              backgroundColor: "#fff",
              marginBottom: sizeHeight(1),
            }}
          >
            <TextInput
              placeholder="Tìm kiếm"
              value={search}
              returnKeyType="search"
              onFocus={() => (this.see = true)}
              onBlur={() => (this.see = false)}
              onChangeText={(text) => this.setState({ search: text })}

              onSubmitEditing={async () => {
                this.setState(
                  {
                    loadingSearch: true,
                  },
                  async () => {
                    await this.handleSearch();
                  }
                );
              }}
              style={{
                width: sizeWidth(85),
                paddingVertical: sizeHeight(1.5),
              }}
            />
            <IconComponets
              onPress={() => this.setState({ search: "" })}
              name="times-circle"
              size={sizeFont(4)}
              color={this.see == false ? "#fff" : "#888"}
              soild
            />
          </View>
          <SectionList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={() => null} />
            }
            sections={data}
            contentContainerStyle={{ paddingBottom: sizeHeight(25) }}
            keyExtractor={(item, index) => {
              return index;
            }}
            renderItem={({ item, section, index }) => {
              if (index == section.INFO.length - 1) {
                this.count = 0;
              }
              return this.count == 0 ? (
                <View
                  style={{
                    borderBottomWidth: 8,
                    borderBottomColor: COLOR.HEADER,
                    paddingLeft: sizeWidth(2.5),
                  }}
                >
                  <FlatList
                    data={section.INFO}
                    horizontal={true}
                    renderItem={({ item, index }) => {
                      this.count = this.count + 1;
                      return (
                        <TouchableOpacity
                          style={styles.touchFlatListChild}
                          onPress={() =>
                            navigation.navigate("DetailProducts", {
                              data: item,
                              ID_PRODUCT: item.ID_PRODUCT,
                              NAME: "ChildListItem",
                            })
                          }
                        >
                          {item.END_PROMOTION && this.checkTime(item.START_PROMOTION, item.END_PROMOTION) >= 0 ?
                            <View style={{ position: 'absolute', right: 5, top: 5, width: sizeWidth(10), height: sizeHeight(2.5), backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', zIndex: 100, borderRadius: 2 }}>
                              <Text style={{ fontSize: sizeFont(3), color: '#fff', fontSize: sizeFont(2) }}>-{numeral((item.PRICE - item.PRICE_PROMOTION) / item.PRICE * 100).format('0.00')}%</Text>
                            </View> : null}
                          <View
                            style={{
                              width: "100%",
                              height: sizeHeight(15),
                              justifyContent: "center",
                            }}
                          >
                            <Image
                              source={{ uri: item.IMAGE_COVER }}
                              PlaceholderContent={<ActivityIndicator />}
                              resizeMode="contain"
                              style={styles.imageSize}
                            />
                          </View>
                          <Text style={{}}>
                            {item.PRODUCT_NAME}{" "}
                          </Text>
                          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            {item.END_PROMOTION && this.checkTime(item.START_PROMOTION, item.END_PROMOTION) >= 0 ? <View>
                              <View style={styles.textPrice1}>
                                <View style={{ flexDirection: 'column', alignItems: 'center', alignItems: 'center' }}>
                                  <Text style={styles.textPrice}>{numeral(item.PRICE_PROMOTION).format("0,0")} đ</Text>
                                  <Text style={{ textDecorationLine: 'line-through', color: 'gray', fontSize: sizeFont(3), marginLeft: sizeWidth(1) }}>{numeral(item.PRICE).format("0,0")} đ</Text>
                                </View>
                                {/* {this.props.authUser.GROUPS == 8 || this.props.authUser.GROUPS == undefined ? null : <Text style={{ color: '#3399FF', fontSize: sizeFont(3.5), paddingBottom: 5 }}>HH: {numeral(item.COMISSION_PRODUCT * item.PRICE_PROMOTION * 0.01).format("0,0")}đ ({item.COMISSION_PRODUCT}%)</Text>} */}
                              </View>
                            </View> : <View style={{ flexDirection: 'column' }}><Text style={styles.textPrice}>
                              {numeral(item.PRICE).format("0,0")} đ
                          </Text>
                                {/* {this.props.authUser.GROUPS == 8 || this.props.authUser.GROUPS == undefined ? null : <Text style={{ color: '#3399FF', fontSize: sizeFont(3.5), paddingBottom: 5 }}>HH: {numeral(item.COMISSION_PRODUCT * item.PRICE * 0.01).format("0,0")}đ ({item.COMISSION_PRODUCT}%)</Text>} */}
                              </View>}
                            <TouchableOpacity
                              onPress={() => this.handleTouchAdd(item)}
                            >
                              <Image
                                source={require('../../../assets/images/cartmain.png')}
                                style={styles.imageCart}
                              />
                            </TouchableOpacity>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                    keyExtractor={(item) => item.ID_PRODUCT.toString()}
                  />
                </View>
              ) : null;
            }}
            stickySectionHeadersEnabled={true}
            renderSectionHeader={({ section: { SUB_NAME, SUB_ID } }) => (
              <View style={styles.viewHeader}>
                <Text style={styles.title}>{SUB_NAME} </Text>
                <TouchableOpacity
                  style={styles.touchViewMore}
                  onPress={() => {
                    navigation.navigate("SubChildItem", {
                      name: SUB_NAME,
                      ID: SUB_ID,
                      SUB_ID_PARENT: this.props.route.params.ID,
                      NAME: "ChildListItem",
                    });
                  }}
                >
                  <Text style={styles.textViewMore}>Xem thêm</Text>
                  <IconComponets
                    size={sizeFont(6)}
                    color={"#000"}
                    name="chevron-right"
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    username: state.authUser.username,
    listItem: state.order.listItem,
    idshop: state.product.database,
  };
};
const mapDispatchToProps = (dispatch) => {
  return { addToCart: (text) => dispatch(addToCart(text)) };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChildListItem);
