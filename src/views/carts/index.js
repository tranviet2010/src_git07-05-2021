import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image
} from "react-native";
import {
  sizeHeight,
  sizeFont,
  sizeWidth,
} from "../../utils/helper/size.helper";
import { _retrieveData, _storeData } from "../../utils/asynStorage";
// import AsyncStorage from '@react-native-community/async-storage';
import { DATAITEM } from "../../utils/asynStorage/store";
import { connect } from "react-redux";
import { addToCart, removeAllToCart, removeToCart } from "../../action/orderAction";
import { AlertCommonLogin } from "../../components/error";
import styles from "./style";
import { handleMoney } from "../../components/money";
import RoseSum from "./addresscart/RoseSum";
var numeral = require("numeral");
class Carts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      loading: true,
      SUM: '',
      ok: false,
      rose: 0,
      sumall: '',
      moneyAll: 0,
      tramtong: '',
      dataList: [],
      datamain: [],
    };
  }
  checkTime = (a, b) => {
    var start = a;
    var end = b;
    var datePart1 = start.split("/");
    var datePart2 = end.split("/");
    var dateObject1 = new Date(+datePart1[2], datePart1[1] - 1, +datePart1[0]);
    var dateObject2 = new Date(+datePart2[2], datePart2[1] - 1, +datePart2[0]);
    return dateObject2 - dateObject1;
  }
  countPlus = (item) => {
    const { status, authUser } = this.props;
    const { datamain } = this.state;
    item.qualyty = item.qualyty + 1;
    if (item.END_PROMOTION && this.checkTime(item.START_PROMOTION, item.END_PROMOTION) > 0) {
      this.setState({
        SUM: this.state.SUM + parseInt(item.PRICE_PROMOTION),
      });
    } else {
      this.setState({
        SUM: this.state.SUM + parseInt(handleMoney(status, item, authUser)),
      });
    }
    this.setData(datamain);
  };
  checkButton = () => {
    const { listItem, authUser, status, datamain } = this.props;
    const { SUM } = this.state;
    if (datamain.length == 0 || SUM < 50000) {
      return true;
    } else {
      return false;
    }
  }
  countNagative = (item) => {
    const { status, authUser } = this.props;
    const { datamain } = this.state;
    if (item.qualyty == 1) {
      return;
    } else if (item.END_PROMOTION && this.checkTime(item.START_PROMOTION, item.END_PROMOTION) > 0) {
      item.qualyty = item.qualyty - 1;
      this.setState({
        SUM: this.state.SUM - parseInt(item.PRICE_PROMOTION),
      });
    } else {
      item.qualyty = item.qualyty - 1;
      this.setState({
        SUM: this.state.SUM - parseInt(item.PRICE),
      });
    }
    this.setData(datamain);
  }
  removeToCartMoth = (a) => {
    const { datamain } = this.state;
    console.log("datamain===", datamain)
    var list = datamain.filter(
      (element, index) => element.CODE_PRODUCT != a.CODE_PRODUCT
    )
    console.log("listcart", list);
    AlertCommonLogin(
      "Xác nhận",
      "Bạn có chắc chắn muốn xoá mặt hàng này trong giỏ hàng không ?",
      async () => { await this.props.removeToCart(list); await this.setData(list); await this.getData(); await this.tinhtoan() },
      () => null,
      "Xoá",
      "Huỷ"
    )
  }
  tinhtoan = () => {
    const {
      navigation,
      removeAllToCart,
      datamain,
      authUser,
      status,
    } = this.state;
    var sum1 = 0;
    var sum2 = 0;
    var rose1 = 0;
    var rose2 = 0;
    var idsum1 = "";
    var idsum2 = "";
    if (datamain != []) {
      for (let i = 0; i < datamain.length; i++) {
        if (datamain[i].END_PROMOTION && this.checkTime(datamain[i].START_PROMOTION, datamain[i].END_PROMOTION) > 0) {
          sum1 += parseInt(datamain[i].PRICE_PROMOTION) * parseInt(datamain[i].qualyty);
          idsum1 += parseInt(datamain[i].PRICE_PROMOTION) + '#';
        } else {
          sum2 += parseInt(datamain[i].PRICE) * parseInt(datamain[i].qualyty);
          idsum2 += parseInt(datamain[i].PRICE) + '#';
        }
      }
      this.setState({
        SUM: sum1 + sum2,
        rose: rose1 + rose2,
        sumall: idsum1 + idsum2,
      });
    } else {
    }
  }
  setData = async (data) => {
    await _storeData(DATAITEM, [...data])
  }
  getData = async () => {
    try {
      let dataCart = await _retrieveData(DATAITEM);
      console.log({ dataCart })
      let cart = JSON.parse(dataCart);
      cart.map((val) => {
        return true
      })
      this.setState({
        datamain: cart
      })
    } catch (error) {
      console.log("err========");
    }
  }
  async componentDidMount() {
    const { navigation, listItem } = this.props;
    await this.getData();
    this.tinhtoan();
    navigation.setParams({
      onDelete: () =>
        AlertCommonLogin(
          "Xác nhận",
          "Bạn có chắc chắn muốn xoá toàn bộ hàng hoá trong giỏ hàng ?",
          () => { this.props.removeAllToCart(), this.tinhtoan(), this.getData() },
          () => null,
          "Xoá tất cả",
          "Huỷ"
        ),
    });
  }
  render() {
    const { listItem, authUser, status } = this.props;
    const { count, SUM, rose, sumall, moneyAll, tramtong, dataList, datamain } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1.2 }}>
          <FlatList
            data={datamain.length == 0 ? null : datamain}
            keyExtractor={(item) => item.CODE_PRODUCT}
            extraData={this.state}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    borderBottomColor: "#ddd",
                    borderBottomWidth: 1,
                    flexDirection: "row",
                    width: sizeWidth(96),
                    alignSelf: "center",
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Image
                      resizeMode="contain"
                      source={{ uri: item.IMAGE_COVER }}
                      style={{ width: sizeWidth(20), height: sizeHeight(20) }}
                    />
                  </View>
                  <View style={{ marginTop: sizeHeight(3), flex: 3 }}>
                    <View >
                      <TouchableOpacity
                        onPress={() => this.removeToCartMoth(item)}
                        style={{ position: 'absolute', right: 0, top: -15, color: 'red' }}>
                        <Image
                          source={require('../../assets/images/daux.png')}
                          style={{ width: 20, height: 20 }}
                        />
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={{
                        fontSize: sizeFont(4),
                        marginLeft: sizeWidth(2),
                        width: sizeWidth(60),
                        paddingBottom: sizeHeight(1),
                        fontWeight: "bold",
                      }}
                    >
                      {item.PRODUCT_NAME}
                    </Text>
                    <View style={styles.viewChildDetail}>
                      <Text style={styles.textTitle}>Đơn giá:</Text>
                      <Text
                        style={{ fontSize: sizeFont(4), color: "#F90000", fontWeight: "bold" }}
                      >
                        {/* {numeral().format(
                          "0,0"
                        )} */}
                        {item.END_PROMOTION && this.checkTime(item.START_PROMOTION, item.END_PROMOTION) > 0 ? numeral(item.PRICE_PROMOTION).format(
                          "0,0"
                        ) : numeral(item.PRICE).format(
                          "0,0"
                        )}
                        VNĐ
                      </Text>
                    </View>
                    <View style={styles.viewChildDetail}>
                      <Text style={styles.textTitle}>Số lượng:</Text>
                      <View style={styles.viewCount}>
                        <Text
                          onPress={() => this.countNagative(item)}
                          style={styles.textCount}
                        >
                          -
                        </Text>
                        <Text
                          style={{
                            paddingHorizontal: sizeWidth(6),
                            paddingVertical: sizeHeight(1),
                            textAlign: "center",
                          }}
                        >
                          {item.qualyty == undefined ? 1 : item.qualyty}{" "}
                        </Text>
                        <Text
                          onPress={() => this.countPlus(item)}
                          style={styles.textCount}
                        >
                          +
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>

        <SafeAreaView
          style={{
            flex: 0.7,
            borderTopWidth: 4,
            borderTopColor: "#ddd",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: sizeHeight(2),
              paddingHorizontal: sizeWidth(2),
            }}
          >
            <Text style={{ fontSize: sizeFont(4), fontWeight: "bold" }}>
              Tổng tiền hàng
            </Text>
            <Text style={{ fontSize: sizeFont(4), fontWeight: "bold", color: "#F90000" }}>
              {numeral(datamain.length == 0 ? 0 : SUM).format("0,0")} VNĐ
            </Text>
          </View>
          <RoseSum data={SUM} rose={rose} />
          <View style={{ alignSelf: "center", marginTop: sizeHeight(2) }}>
            <TouchableOpacity
              style={{
                backgroundColor: datamain.length == 0 || SUM < 50000 ? "#ddd" : "#149CC6",
                paddingVertical: sizeHeight(1),
                height: sizeHeight(5),
                borderRadius: 4,
                width: sizeWidth(80),
                justifyContent: 'center',
                alignItems: 'center'
              }}
              disabled={datamain.length == 0 || SUM < 50000 ? true : false}
              onPress={() => {
                this.props.navigation.navigate("DetailAddressCart", {
                  SUM: this.state.SUM,
                  NAME: "Carts",
                  NUM: this.state.count,
                  listItem: datamain,
                  ROSE: rose,
                  PRICEALL: sumall.substring(0, sumall.length - 1)
                });
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontSize: sizeFont(4),
                }}
              >
                TẠO ĐƠN HÀNG
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={this.getData}

            >
              <Text>get cart</Text>
            </TouchableOpacity> */}
          </View>


          <View style={{ alignSelf: "center", marginTop: sizeHeight(2) }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.popToTop();
                this.props.navigation.navigate("product")
              }}
              style={{
                backgroundColor: "#149CC6",
                paddingVertical: sizeHeight(1),
                height: sizeHeight(5),
                borderRadius: 4,
                width: sizeWidth(80),
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={{ color: '#fff' }}>TIẾP TỤC MUA HÀNG</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeToCart: (text) => dispatch(removeToCart(text)),
    addToCart: (text) => dispatch(addToCart(text)),
    removeAllToCart: (text) => dispatch(removeAllToCart()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Carts);
