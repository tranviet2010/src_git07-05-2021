import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  TextInput,
  TouchableHighlight,
  BackHandler,
  AppState,
  Alert
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { _retrieveData } from "../../../utils/asynStorage";
import { getListOrder } from "../../../service/order"
import { LoginPhone } from "../../../action/authAction";
import _ from "lodash";
import { Image } from "react-native-elements";
import Loading from '../../../components/loading';
import { COLOR } from '../../../utils/color/colors';
import { addToCart } from "../../../action/orderAction";
import Modal from 'react-native-modal';
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../utils/helper/size.helper";
import {
  AlertCommon,
  AlertCommonLogin,
  ElementCustom,
} from "../../../components/error";
import {
  checkFullName,
  isVietnamesePhoneNumber,
  alphanumeric,
} from "../../../utils/check";
import styles from "./style";
import { connect } from "react-redux";
import { handleMoney } from "../../../components/money";
import { PASSWORD, DATAITEM } from "../../../utils/asynStorage/store";
import { Getwithdrawal } from "../../../service/rose";
import { UpdateInforAccount } from "../../../service/account";
import { getBanner } from "../../../service/notify"
import moment from "moment";
import { getShopInfo } from '../../../service/products';
var numeral = require("numeral");

class ListProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stickyHeaderIndices: [0, 1, 2, 0],
      scrollY: new Animated.Value(0),
      cartLength: this.props.listItem.length,
      Data: [],
      Rose: [],
      sendcode: '',
      passWord: '',
      shopname: '',
      isdisvisi: true,
      isdisvisi1: true,
      codeinfo: '',
      appState: AppState.currentState,
      modalVisible2: false,
      recoldPass: '',
      phoneText: '',
      endTime: moment(new Date()).format("DD/MM/YYYY"),
      loading: true,
      search: '',
      nameText: '',
      modalVisible: false,
      banner: '',
      modalVisible1: false,
    };
  }
  handleLoad = async () => {
    await getListOrder({
      USERNAME: '',
      USER_CTV: '',
      START_TIME: '',
      END_TIME: '',
      STATUS: '',
      PAGE: 1,
      NUMOFPAGE: 200,
      IDSHOP: "F6LKFY",
    })
      .then((res) => {
        if (res.data.ERROR == "0000") {
          this.setState({
            Data: res.data.INFO.filter((val) => val.STATUS == 1),
            modalVisible2: true
          })
        } else {
          this.showToast(res);
        }
      })
      .catch((err) => {
      });
    if (this.props.authUser.MOBILE == null && this.props.status != '') {
      this.setState({
        modalVisible: true
      })
    }
  }
  updateAaccout = () => {
    const { passWord, nameText, phoneText, recoldPass } = this.state;
    const { authUser } = this.props;
    if (passWord !== recoldPass) {
      AlertCommon("Thông báo", "Xác thực mật khẩu không chính xác", () => { })
    } else if (nameText == '') {
      AlertCommon("Thông báo", "Họ và tên không được để trống", () => { })
    } else if (!alphanumeric(nameText)) {
      AlertCommon("Thông báo", "Họ và tên chỉ gồm chữ và không chứa các ký tự đặc biệt", () => { })
    }
    // else if (passWord == '' || passWord.length<8) {
    //   AlertCommon("Thông báo", "Mật khẩu không được để trống và lớn hơn 8 ký tự", () => { })
    // }
    else {
      UpdateInforAccount({
        USERNAME: authUser.USERNAME,
        USER_CTV: authUser.USERNAME,
        NAME: nameText,
        DOB: '',
        GENDER: '',
        EMAIL: '',
        CITY_NAME: '',
        DISTRICT_NAME: '',
        ADDRESS: authUser.ADDRESS,
        STK: '',
        MOBILE: phoneText,
        TENTK: '',
        TENNH: '',
        AVATAR: authUser.AVATAR,
        IDSHOP: 'F6LKFY',
        CMT: '',
        IMG1: '',
        CHINHANHNH: '',
        IMG2: '',
        WARD_NAME: '',
        PASSWORD: passWord,
      })
        .then((result) => {
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
                  PASSWORD: passWord,
                })
                  .then((result) => {
                  })
                  .catch((error) => {
                  });
                this.message = setTimeout(
                  () =>
                    AlertCommon("Thông báo", result.data.RESULT, () => {
                      this.props.navigation.popToTop();
                      this.props.navigation.navigate("screenHome");
                    }),
                  10
                );
              },
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
        });
    }
  }
  // xacthuc = () => {
  //   const { sendcode, phoneText, passWord, recoldPass } = this.state;

  //     Active({
  //       MSISDN: phoneText,
  //       ICODE: sendcode,
  //     })
  //       .then((res) => {
  //         console.log('rescode_xác thực===', res);
  //         if (res.data.ERROR == "0000") {
  //           AlertCommon("Thông báo", res.data.RESULT, () => this.updateAaccout())
  //         } else {
  //           AlertCommon("Thông báo", res.data.RESULT, () => null)
  //         }
  //       })
  //       .catch((err) => {
  //       });
  // }
  handleLoad1 = async () => {
    await Getwithdrawal({
      USERNAME: this.props.username,
      USER_CTV: this.props.username,
      START_TIME: "01/01/2018",
      END_TIME: this.state.endTime,
      PAGE: 1,
      NUMOFPAGE: 10,
      IDSHOP: "F6LKFY",
    })
      .then((res) => {
        if (res.data.ERROR == "0000") {
          this.setState({
            Rose: res.data.INFO
          })
        } else {
          this.showToast(res);
        }
      })
      .catch((err) => {
      });
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
            text: "Vào giỏ hàng",
            onPress: () => {
              navigation.navigate("CartHome", {
                NAME: "HomePay",
              })
            },
            style: "default",
          },
          {
            text: "Tiếp tục mua",
            style: "destructive",
          }
        ],
        { cancelable: false }
      );
      this.setState({
        cartLength: cartLength + 1,
      });
    }
  }
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
  componentDidMount() {
    this.handleLoad();
    this.handleLoad1();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this._interval = setInterval(() => {
      this.handleLoad();
    }, 30000);
    getBanner({
      IDSHOP: 'F6LKFY'
    }).then((res) => {
      if (res.data.ERROR == '0000') {
        this.setState({
          banner: res.data.INFO
        })
      } else {

      }
    })
    getShopInfo({
      IDSHOP: 'F6LKFY',
      USERNAME: '',
    }).then((res) => {
      if (res.data.ERROR == "0000") {
        this.setState({
          shopname: res.data.SHOP_NAME
        })
      }

      else {

      }
    })
      .catch((err) => {
      });

    AppState.addEventListener("change", this._handleAppStateChange);

  }
  componentWillUnmount() {
    clearInterval(this._interval);
    AppState.removeEventListener("change", this._handleAppStateChange);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton() {
    return true;
}
  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
    }
    this.setState({ appState: nextAppState });
  };
  handleScreen = (text, title, type) => {
    const { navigation } = this.props;
    navigation.navigate(text, { TITLE: title, TYPE: type });
  };
  render() {
    const {
      data,
      navigation,
      status,
      authUser,
    } = this.props;
    var dataSet = [];
    const { Data, Rose, loading, search, modalVisible, modalVisible1, isdisvisi, isdisvisi1, modalVisible2, banner, appState } = this.state;
    const sphot = data ? data.filter((Val, index, array) => {
      return Val.STATUS_TREND == 1;
    }) : null
    const sphot1 = data ? data.filter((Val, index, array) => {
      return Val.STATUS_TREND == 2;
    }) : null
    const sphot2 = data ? data.filter((Val, index, array) => {
      return Val.STATUS_TREND == 3;
    }) : null
    const sphot3 = data ? data.filter((Val, index, array) => {
      return Val.STATUS_TREND == 4;
    }) : null
    var today = moment();
    // console.log("appState==================",appState);
    var tomorow = moment().add(2, 'days');
    return (
      <View>
        {data ? <View>
          {status == '' ? <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
            {<TouchableOpacity
              style={{
                width: sizeWidth(90), height: sizeHeight(6), backgroundColor: COLOR.HEADER,
                justifyContent: 'center', alignItems: 'center', borderRadius: 50
              }}
              onPress={() => this.props.navigation.navigate('SignIn')}
            >
              <Text style={{ color: 'white' }}>Đăng nhập để mua hàng và nhận ưu đãi</Text>
            </TouchableOpacity>}
          </View> : <View style={{ margin: sizeHeight(1) }} >
              {authUser.GROUPS === "3" ? (
                <View style={{ height: 50, width: '100%' }}>
                  <View style={{ height: sizeHeight(5), borderRadius: 5, backgroundColor: '#149CC6', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 16 }}>
                      Số đơn hàng đang chờ xử lý hiện tại
                </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    {loading === true ? <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Image
                        source={require('../../../assets/images/monney.png')}
                        style={{
                          height: 40,
                          width: 40
                        }}
                      />
                      <Text style={{ fontSize: 20, color: '#FF5C03', alignItems: 'center', fontWeight: 'bold', paddingTop: 8, paddingLeft: 5 }}>
                        {Data.length} đơn
                      </Text>
                    </View> : <Loading />}
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ loading: false }, async () => {
                            await this.handleLoad1();
                            this.setState({ loading: true })
                          })
                        }}
                      >
                        <Image
                          source={require('../../../assets/images/reload.png')}
                          style={{
                            height: 40,
                            width: 40
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>) : (
                  <View style={{ height: sizeHeight(6), width: '100%' }}>
                    <View
                      // onPress={() => this.props.navigation.navigate("rose")}
                      style={{ height: sizeHeight(4.5), borderRadius: 50, backgroundColor: '#149CC6', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                      <View>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: '500' }}>
                          Điểm tích luỹ
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                          <Image
                            source={require('../../../assets/images/monney.png')}
                            style={{
                              height: 20,
                              width: 20,
                              marginRight: 3
                            }}
                          />
                          {status === "" ? (<Text style={{ fontSize: 20, color: '#FF5C03', alignItems: 'center', fontWeight: '500' }}>0 đ</Text>) : (
                            <Text style={{ fontSize: 20, color: '#fff', alignItems: 'center', fontWeight: '500' }}>
                              {Rose.length == 0 ? 0 : numeral(Rose[0].BALANCE).format("0,0")} đ
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              <View style={{ height: 5, backgroundColor: '#F1F2F2' }}></View>

            </View>}
          {sphot.lenghth == 0 ? null : <View style={{ paddingLeft: 5, paddingRight: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text >SẢN PHẨM NỔI BẬT</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: sizeFont(4), color: '#166CEE' }}
                  onPress={() => this.props.navigation.navigate('FullItem', {
                    data: sphot,
                    name: 'SẢN PHẨM NỔI BẬT'
                  })}
                >Xem thêm</Text>
                <Image source={require('../../../assets/images/right.png')}
                  style={{ height: 15, width: 15, marginLeft: 7 }}
                />
              </View>
            </View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={sphot}
              horizontal={true}
              renderItem={({ item, index }) => {
                this.count = this.count + 1;
                return (
                  <TouchableOpacity
                    style={styles.touchFlatListChild}
                    onPress={() =>
                      navigation.navigate("DetailProducts", {
                        ID_PRODUCT: item.ID_PRODUCT,
                        NAME: "Home",
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
                        source={item.IMAGE_COVER == null ? require('../../../assets/images/emptypic.jpg') : { uri: item.IMAGE_COVER }}
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
          </View>}

          {sphot1.length == 0 ? null : <View>
            <View style={{ height: 5, backgroundColor: '#F1F2F2' }}></View>
            <View style={{ paddingLeft: 5, paddingRight: 5, marginTop: 5 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>SẢN PHẨM BÁN CHẠY</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: sizeFont(4), color: '#166CEE' }}
                    onPress={() => this.props.navigation.navigate('FullItem', {
                      data: sphot1,
                      name: 'SẢN PHẨM BÁN CHẠY'
                    })}
                  >Xem thêm</Text>
                  <Image source={require('../../../assets/images/right.png')}
                    style={{ height: 15, width: 15, marginLeft: 7 }}
                  />
                </View>
              </View>
              <FlatList
                data={sphot1}
                horizontal={true}
                renderItem={({ item, index }) => {
                  this.count = this.count + 1;
                  return (
                    <TouchableOpacity
                      style={styles.touchFlatListChild}
                      onPress={() =>
                        navigation.navigate("DetailProducts", {
                          ID_PRODUCT: item.ID_PRODUCT,
                          NAME: "Home",
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
                          source={item.IMAGE_COVER == null ? require('../../../assets/images/emptypic.jpg') : { uri: item.IMAGE_COVER }}
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
            </View></View>

          }
          {
            sphot2.length == 0 ? null : <View>
              <View style={{ height: 5, backgroundColor: '#F1F2F2' }}></View>
              <View style={{ paddingLeft: 5, paddingRight: 5, marginTop: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text>SẢN PHẨM MỚI</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: sizeFont(4), color: '#166CEE' }}
                      onPress={() => this.props.navigation.navigate('FullItem', {
                        data: sphot2,
                        name: 'SẢN PHẨM MỚI'
                      })}
                    >Xem thêm</Text>
                    <Image source={require('../../../assets/images/right.png')}
                      style={{ height: 15, width: 15, marginLeft: 7 }}
                    />
                  </View>
                </View>
                <FlatList
                  data={sphot2}
                  horizontal={true}
                  renderItem={({ item, index }) => {
                    this.count = this.count + 1;
                    return (
                      <TouchableOpacity
                        style={styles.touchFlatListChild}
                        onPress={() =>
                          navigation.navigate("DetailProducts", {
                            ID_PRODUCT: item.ID_PRODUCT,
                            NAME: "Home",
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
                            source={item.IMAGE_COVER == null ? require('../../../assets/images/emptypic.jpg') : { uri: item.IMAGE_COVER }}
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
            </View>
          }
          {sphot3.length == 0 ? null : <View>
            <View style={{ height: 5, backgroundColor: '#F1F2F2' }}></View>
            <View style={{ paddingLeft: 5, paddingRight: 5, marginTop: 5 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>SẢN PHẨM KHUYẾN MÃI</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: sizeFont(4), color: '#166CEE' }}
                    onPress={() => this.props.navigation.navigate('FullItem', {
                      data: sphot3,
                      name: 'SẢN PHẨM KHUYẾN MÃI'
                    })}
                  >Xem thêm</Text>
                  <Image source={require('../../../assets/images/right.png')}
                    style={{ height: 15, width: 15, marginLeft: 7 }}
                  />
                </View>
              </View>
              <FlatList
                data={sphot3}
                horizontal={true}
                renderItem={({ item, index }) => {
                  this.count = this.count + 1;
                  return (
                    <TouchableOpacity
                      style={styles.touchFlatListChild}
                      onPress={() =>
                        navigation.navigate("DetailProducts", {
                          ID_PRODUCT: item.ID_PRODUCT,
                          NAME: "Home",
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
                          source={item.IMAGE_COVER == null ? require('../../../assets/images/emptypic.jpg') : { uri: item.IMAGE_COVER }}
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
          </View>
          }
          <View style={{ height: 5, backgroundColor: '#F1F2F2' }}></View>
        </View> : null}
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            coverScreen={false}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', marginTop: sizeHeight(2), padding: 10 }}>
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>Chào mừng quý khách đã đến với {this.state.shopname}, vui lòng đổi mật khẩu và cập nhật một số thông tin để chúng tôi tiện liên hệ khi giao hàng</Text>
                  </View>
                  <View>
                    <View style={{ marginTop: 2 }}>
                      <Text style={{ color: '#000', fontSize: 14, marginBottom: 7, fontWeight: 'bold' }}>Họ và Tên <Text style={{ color: 'red' }}>*</Text></Text>
                      <View style={{
                        flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                        borderColor: COLOR.HEADER, borderRadius: 5, borderWidth: 1
                      }}>
                        <TextInput
                          placeholder="Họ và tên KH"
                          placeholderTextColor='#000'
                          onChangeText={(text) => this.setState({ nameText: text })}
                          style={{ width: sizeWidth(80), height: sizeHeight(6), color: '#000' }}
                        />
                      </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ color: '#000', fontSize: 14, marginBottom: 7, fontWeight: 'bold' }}>Số điện thoại <Text style={{ color: 'red' }}>*</Text></Text>
                      <View style={{
                        flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                        borderColor: COLOR.HEADER, borderRadius: 5, borderWidth: 1
                      }}>
                        <TextInput
                          placeholder="Nhập số điện thoại"
                          placeholderTextColor='#000'
                          onChangeText={(text) => this.setState({ phoneText: text })}
                          style={{ width: sizeWidth(80), height: sizeHeight(6), color: '#000' }}
                        />
                      </View>
                    </View>

                    <View style={{ marginTop: 10 }}>
                      <Text style={{ color: '#000', fontSize: 14, marginBottom: 7, fontWeight: 'bold' }}>Mã giới thiệu</Text>
                      <View style={{
                        flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                        borderColor: COLOR.HEADER, borderRadius: 5, borderWidth: 1
                      }}>
                        <TextInput
                          placeholder="Nhập mã giới thiệu ( nếu có )"
                          placeholderTextColor='#000'
                          onChangeText={(text) => this.setState({ codeinfo: text })}
                          style={{ width: sizeWidth(80), height: sizeHeight(6), color: '#000' }}
                        />
                      </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ color: '#000', fontSize: 14, marginBottom: 7, fontWeight: 'bold' }}>Mật khẩu mới <Text style={{ color: 'red' }}>*</Text></Text>
                      <View style={{
                        flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                        borderColor: COLOR.HEADER, borderRadius: 5, borderWidth: 1
                      }}>
                        <TextInput
                          placeholder="Nhập mât khẩu mới"
                          secureTextEntry={isdisvisi ? true : false}
                          placeholderTextColor='#000'
                          onChangeText={(text) => this.setState({ passWord: text })}
                          style={{ width: sizeWidth(80), height: sizeHeight(6), padding: 10, color: '#000' }}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({ isdisvisi: !isdisvisi })
                          }}
                          style={{ width: sizeWidth(7) }}
                        >
                          {
                            isdisvisi ? <Feather
                              name="eye-off"
                              color="grey"
                              size={20}

                            /> : <Feather
                                name="eye"
                                color="grey"
                                size={20}

                              />
                          }
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ color: '#000', fontSize: 14, marginBottom: 7, fontWeight: 'bold' }}>Nhắc lại mật khẩu <Text style={{ color: 'red' }}>*</Text></Text>
                      <View style={{
                        flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                        borderColor: COLOR.HEADER, borderRadius: 5, borderWidth: 1
                      }}>

                        <TextInput
                          placeholder="Nhập lại mật khẩu"
                          secureTextEntry={isdisvisi1 ? true : false}
                          placeholderTextColor='#000'
                          onChangeText={(text) => this.setState({ recoldPass: text })}
                          style={{ width: sizeWidth(80), height: sizeHeight(6), padding: 10, color: '#000' }}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({ isdisvisi1: !isdisvisi1 })

                          }}
                          style={{ width: sizeWidth(7) }}
                        >
                          {
                            isdisvisi1 ? <Feather
                              name="eye-off"
                              color="grey"
                              size={20}

                            /> : <Feather
                                name="eye"
                                color="grey"
                                size={20}

                              />
                          }
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.updateAaccout()
                        }}
                        style={{ width: sizeWidth(30), height: sizeHeight(5), backgroundColor: COLOR.HEADER, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}
                      >
                        <Text style={{ color: '#fff' }}>Xác nhận</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {/* <TouchableOpacity
                  style={styles.openButton}
                  onPress={() => {
                    this.setState({ modalVisible: !this.state.modalVisible });
                  }}
                >
                  <Text style={styles.textStyle}>X</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </Modal>
        </View>
        <View>
        </View>
        <View>
          {/* <Modal
            animationType="slide"
            backdropOpacity={0.90}
            visible={banner.LINK_ADS==null?true:modalVisible2}
          >
            <View style={styles.centeredView1}>
              <View style={styles.modalView3}>
                <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: sizeWidth(80), height: sizeHeight(40) }}>
                      {banner != '' && <Image
                        source={{ uri: banner.LINK_ADS }}
                        style={{ width: sizeWidth(98), height: sizeHeight(40), resizeMode: 'contain' }}
                      />}
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.openButton}
                  onPress={() => {
                    this.setState({ modalVisible2: false });
                  }}
                >
                  <Text style={styles.textStyle}>X</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal> */}
          {/* <Modal isVisible={true}>
        <View style={{ flex: 1 }}>
          <Text>I am the modal content!</Text>
        </View>
      </Modal> */}
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
    listItem: state.order.listItem,
    search: state.notify.searchproduct,
    idshop: state.product.database,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (text) => dispatch(addToCart(text)),
    LoginPhone: (data) => dispatch(LoginPhone(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListProducts);
