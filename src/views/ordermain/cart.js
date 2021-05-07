import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import {
  sizeHeight,
  sizeFont,
  sizeWidth,
} from "../../utils/helper/size.helper";
import { COLOR } from "../../utils/color/colors";
import { connect } from "react-redux";
import { addToCart, removeAllToCart } from "../../action/orderAction";
import { AlertCommonLogin } from "../../components/error";
import styles from "./style";
import IconComponets from "../../components/icon";
import { handleMoney } from "../../components/money";
var numeral = require("numeral");
class Carts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      loading: true,
      SUM: 0,
      ok: false,
    };
  }
  countPlus = (item) => {
    const { status, authUser } = this.props;
    item.COUNT = item.COUNT + 1;
    this.setState({
      SUM: this.state.SUM + parseInt(handleMoney(status, item, authUser)),
    });

    //this.setState({ count: this.state.count + 1 });
  };
  countNagative = (item) => {
    const { status, authUser } = this.props;
    if (item.COUNT == 1) {
      return;
    } else {
      item.COUNT = item.COUNT - 1;
      this.setState({
        SUM: this.state.SUM - parseInt(handleMoney(status, item, authUser)),
      });
    }
  };
  componentDidMount() {
    const {
      navigation,
      removeAllToCart,
      listItem,
      authUser,
      status,
    } = this.props;
    var Sum = 0;
    for (let i = 0; i < listItem.length; i++) {
      listItem[i].COUNT = 1;
      Sum += parseInt(handleMoney(status, listItem[i], authUser));
    }
    this.setState({
      SUM: Sum,
    });
  }
  render() {
    const { listItem, authUser, status } = this.props;
    const { count, SUM } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1.2 }}>
          <FlatList
            data={listItem.length == 0 ? null : listItem}
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
                    <Text
                      style={{
                        fontSize: sizeFont(4),
                        marginLeft: sizeWidth(2),
                        paddingBottom: sizeHeight(1),
                        fontWeight: "bold",
                      }}
                    >
                      {item.PRODUCT_NAME}
                    </Text>
                    <View style={styles.viewChildDetail}>
                      <Text style={styles.textTitle}>Thuộc tính:</Text>
                      <IconComponets
                        name="edit"
                        size={sizeFont(6)}
                        color={COLOR.BUTTON}
                        onPress={()=>{console.log('gio hang')}}
                      />
                    </View>
                    <View style={styles.viewChildDetail}>
                      <Text style={styles.textTitle}>Đơn giá:</Text>
                      <Text
                        style={{ fontSize: sizeFont(4), color: "#F90000",fontWeight:"bold" }}
                      >
                        {numeral(handleMoney(status, item, authUser)).format(
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
                          {item.COUNT == undefined ? 1 : item.COUNT}{" "}
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
            flex: 0.3,
            borderTopWidth: 4,
            borderTopColor: "#ddd",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: sizeHeight(2),
              paddingHorizontal: sizeWidth(2),
            }}
          >
            <Text style={{ fontSize: sizeFont(4), fontWeight: "bold" }}>
              Tổng tiền
            </Text>
            <Text style={{ fontSize: sizeFont(4), fontWeight: "bold",color: "#F90000" }}>
              {numeral(listItem.length === 0 ? 0 : SUM).format("0,0")} VNĐ
            </Text>
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
    addToCart: (text) => dispatch(addToCart(text)),
    removeAllToCart: (text) => dispatch(removeAllToCart()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Carts);
