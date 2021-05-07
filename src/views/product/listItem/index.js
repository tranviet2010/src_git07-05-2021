import React, { Component, PureComponent, useCallback } from "react";
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
  TouchableHighlight,
  Linking,
  Platform,
  Alert,
} from "react-native";
import { _storeData } from '../../../utils/asynStorage'
import { CART, DATAITEM } from "../../../utils/asynStorage/store";
import { addToCart } from "../../../action/orderAction";
import { Toast, Container } from "native-base";
import { AlertCommon, ElementCustom } from "../../../components/error";
import { AlertCommonLogin } from "../../../components/error";
import { _retrieveData } from "../../../utils/asynStorage";
import { HeaderLeftComponet } from "../../../components/header"
import Spinner from "react-native-loading-spinner-overlay";
import IconComponets from "../../../components/icon";
import _ from "lodash";
import { Image } from "react-native-elements";
import { getListOrder } from "../../../service/order";
import Listcate from "./Listcate";
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../utils/helper/size.helper";
import { Getwithdrawal } from "../../../service/rose";
import { COLOR } from "../../../utils/color/colors";
import styles from "./style";
import { connect } from "react-redux";
import { handleMoney } from "../../../components/money";
import Loading from "../../../components/loading";
var numeral = require("numeral");
import moment from "moment";
import { getListProduct1 } from "../../../service/products";
import { getListSubProducts } from "../../../service/products";

class ListProducts extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      load: true,
      scrollY: new Animated.Value(0),
      data: [],
      endTime: moment(new Date()).format("DD/MM/YYYY"),
      open: false,
      dataList: [],
      search: '',
      value: this.props.searchText,
    };
    this.count = 0;


  }
  renderSearch = (text) => {
    getListSubProducts({
      USERNAME: this.props.username,
      ID_PARENT: '',
      IDSHOP: "F6LKFY",
      SEARCH_NAME: text,
    })
      .then((result) => {
        if (result.data.ERROR == "0000") {
          for (let i = 0; i < result.data.DETAIL.length; i++) {
            result.data.DETAIL[i].data = result.data.DETAIL[i].INFO;

            //resultArray.push(result.data.DETAIL[i]);
          }
          this.setState(
            {
              data: result.data.DETAIL,
            }
          );
        } else {

          this.setState(
            {
              data: [],
            }
          );

        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }
  handleLoad = async () => {
    await getListSubProducts({
      USERNAME: this.props.username,
      ID_PARENT: '',
      IDSHOP: "F6LKFY",
      SEARCH_NAME: this.state.search,
    })
      .then((result) => {
        if (result.data.ERROR == "0000") {
          for (let i = 0; i < result.data.DETAIL.length; i++) {
            result.data.DETAIL[i].data = result.data.DETAIL[i].INFO;
            //resultArray.push(result.data.DETAIL[i]);
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
          this.setState({ loading: false }, () =>
            AlertCommon("Thông báo", result.data.RESULT, () => null)
          );
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }
  componentDidMount() {
    this.handleLoad();
    getListProduct1({
      USERNAME: this.props.username,
      ID_PARENT: '',
      IDSHOP: "F6LKFY",
    })
      .then((res) => {
        if (res.data.ERROR == "0000") {
          this.setState({
            dataList: res.data.DETAIL,
            load: false
          })
        } else {
          // this.setState({load:false})
        }
      })
      .catch((err) => {
      });

    this._interval = setInterval(() => {
      this.handleLoad();
    }, 20000);
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
                NAME: "Product",
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
  checkTime = (a, b) => {
    var start = a;
    var end = b;
    var datePart1 = start.split("/");
    var datePart2 = end.split("/");

    var dateObject1 = new Date(+datePart1[2], datePart1[1] - 1, +datePart1[0]);
    var dateObject2 = new Date(+datePart2[2], datePart2[1] - 1, +datePart2[0]);
    var currentDate = new Date();

    return (dateObject1 < currentDate && currentDate < dateObject2) ? 1 : -1
  }
  handleScreen = (text, title, type) => {
    const { navigation } = this.props;
    navigation.navigate(text, { TITLE: title, TYPE: type });
  };
  render() {
    const {
      refreshing,
      navigation,
      onRefreshing,
      status,
      authUser,
      searchText,
      listItem,
      countNotify
    } = this.props;
    const { Data, loading, Rose, dataList, open, search, data, open2, value, load } = this.state;
    if (load) {
      setTimeout(() => {
        this.setState({ load: false })
      }, 10000);
    }
    return (
      <View style={{ marginBottom: sizeHeight(5) }}>
        <View style={{ flexDirection: 'row', paddingTop: sizeHeight(3), height: Platform.OS == "ios" ? sizeHeight(12) : sizeHeight(9), backgroundColor: '#4d7335', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              source={require('../../../assets/images/list.png')}
              style={{
                width: sizeFont(7.5),
                height: sizeFont(7.5),
                marginLeft: 12,
                marginRight: 11
              }}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Tìm kiếm"
            returnKeyType="search"
            onChangeText={(text) => this.renderSearch(text)}
            style={{
              paddingLeft: 10,
              height: Platform.OS == "ios" ? sizeHeight(4) : sizeHeight(5.3),
              width: sizeWidth(55),
              borderColor: 'white',
              borderWidth: 1,
              backgroundColor: 'white'
            }}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 20, width: 70 }}>
            <View>
              <TouchableOpacity
                navigation={navigation}
                onPress={() => navigation.navigate("notiProduct", {
                  NAME: 'Product',
                })}
              >
                <Image
                  source={require('../../../assets/images/ring.png')}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
              {countNotify == 0 ? null : <View style={styles.viewList}>
                {countNotify < 100 ? <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontSize: sizeFont(3),
                  }}
                >
                  {countNotify}
                </Text> : <Text style={{
                  fontSize: sizeFont(2), color: "#fff",
                }}>99+</Text>}
              </View>}
            </View>
            <View>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() =>
                  navigation.navigate("Carts", {
                    NAME: "Product",
                  })
                }
              >
                {authUser.GROUPS != 3 ? <TouchableOpacity
                  navigation={navigation}
                  onPress={() =>
                    navigation.navigate("Carts", {
                      NAME: "Product",
                    })
                  }

                >
                  <Image
                    source={require('../../../assets/images/cart1.png')}
                    style={{ width: 30, height: 30 }}
                  />
                </TouchableOpacity> : null}
                {listItem.length != 0 ? (
                  <View style={styles.viewList}>
                    <Text
                      style={{
                        color: "#fff",
                        textAlign: "center",
                        fontSize: sizeFont(3),
                      }}
                    >
                      {listItem.length}
                    </Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            </View>
            {/* <TouchableOpacity
              onPress={() => Linking.openURL('http://google.com')}

            >
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={require("../../../assets/images/mess.png")}
                  style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center', marginLeft: sizeWidth(1) }}
                />
              </View>
            </TouchableOpacity > */}
          </View>
        </View>




        <View style={{ margin: sizeHeight(1) }} >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableHighlight
            navigation={navigation}
            onPress={() => {
              this.setState({ open: !this.state.open }),
              this.props.navigation.navigate("listproduct",{
                Value:dataList,
                navigation:navigation
              })
            }}>
              <View style={{ flexDirection: 'row', height: sizeHeight(4.5), borderRadius: 5, backgroundColor: '#149CC6', color: 'white', width: sizeWidth(98), paddingLeft: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                <Text
                  style={{ color: 'white' }}
                >
                  Tất cả các sản phẩm
                     </Text>

                <Image
                  source={require('../../../assets/images/dropdow.png')}
                  style={{ width: 15, height: 15, marginRight: 10, justifyContent: 'center', alignItems: 'center' }}
                />
              </View>
            </TouchableHighlight>

            {/* <ScrollView>
              {open ? <ScrollView style={{marginBottom:100,marginTop:100}}>{dataList.map((Val) => {
                return (

                  <Listcate Val={Val} navigation={navigation} />

                )
              })}</ScrollView> : null}
            </ScrollView> */}

          </View>

        </View>
        {load ? <Spinner
          visible={load}
          animation="fade"
          customIndicator={<ElementCustom />}
        /> :
          <View style={{ marginTop: sizeHeight(1) }}>
            <Animated.SectionList
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                {
                  useNativeDriver: false,
                }
              )}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefreshing}
                />
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
                      borderBottomWidth: 6,
                      borderBottomColor: COLOR.COLOR_BOTTOM,
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
                                ID_PRODUCT: item.ID_PRODUCT,
                                NAME: "Product",
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
                            <Text style={styles.textName}>
                              {_.truncate(item.PRODUCT_NAME, {
                                length: 20,
                              })}{" "}
                            </Text>

                            {item.END_PROMOTION && this.checkTime(item.START_PROMOTION, item.END_PROMOTION) >= 0 ? <View>
                              <View style={styles.textPrice1}>
                                <View style={{ flexDirection: 'column' }}>
                                  <Text style={styles.textPrice}>{numeral(item.PRICE_PROMOTION).format("0,0")} đ</Text>
                                  <Text style={{ textDecorationLine: 'line-through', color: 'gray', fontSize: sizeFont(3), marginLeft: sizeWidth(1) }}>{numeral(item.PRICE).format("0,0")} đ</Text>
                                </View>

                                <TouchableOpacity
                                  onPress={() => this.handleTouchAdd(item)}
                                >
                                  <Image
                                    source={require('../../../assets/images/cartmain.png')}
                                    style={styles.imageCart}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View> : <View style={styles.textPrice1}>
                                <Text style={styles.textPrice}>
                                  {numeral(item.PRICE).format("0,0")} đ
                          </Text>
                                <TouchableOpacity
                                  onPress={() => this.handleTouchAdd(item)}
                                >
                                  <Image
                                    source={require('../../../assets/images/cartmain.png')}
                                    style={styles.imageCart}
                                  />
                                </TouchableOpacity>
                              </View>}
                          </TouchableOpacity>
                        );
                      }}
                      keyExtractor={(item) => item.ID_PRODUCT.toString()}
                    />
                  </View>
                ) : null;
              }}
              stickySectionHeadersEnabled={true}
              renderSectionHeader={({ section: { PARENT_NAME, ID } }) => (
                <View style={styles.viewHeader}>
                  <Text style={styles.title}>{PARENT_NAME} </Text>
                  <TouchableOpacity
                    style={styles.touchViewMore}
                    onPress={() => {
                      navigation.navigate("ChildListItem", {
                        name: PARENT_NAME,
                        ID: ID,
                      });
                    }}
                  >
                    <Text style={styles.textViewMore}>Xem tất cả</Text>
                    <IconComponets
                      size={sizeFont(4)}
                      color={"#166CEE"}
                      name="chevron-right"
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        }


      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    searchText: state.notify.searchproduct,
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    username: state.authUser.username,
    idshop: state.product.database,
    listItem: state.order.listItem,
    countNotify: state.notify.countNotify,
  };
};
const mapDispatchToProps = (dispatch) => {
  return { addToCart: (text) => dispatch(addToCart(text)) };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListProducts);
