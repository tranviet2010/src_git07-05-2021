import React, { Component, PureComponent } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Image,
} from "react-native";
var numeral = require("numeral");
import styles from "./style";
import IconComponets from "../../../components/icon";
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../utils/helper/size.helper";
import { COLOR } from "../../../utils/color/colors";
import { TextInput, ActivityIndicator } from "react-native-paper";
import { isIphoneX } from "react-native-iphone-x-helper";
import moment from "moment";
export default class ListOrdered extends PureComponent {
  state = {
    refreshing: false,
  };
  render() {
    const {
      data,
      navigation,
      onEndReached,
      loading,
      onMomentumScrollBegin,
      onRefresh,
      authUser,
      TYPE,
      name,
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          keyboardShouldPersistTaps="handled"
          data={data.length == 0 ? null : data}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: sizeHeight(5),
              }}
            >
              <Text>Chưa có đơn hàng</Text>
            </View>
          )}
          keyExtractor={(item) => item.ID}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={onRefresh}
            />
          }
          contentContainerStyle={{ paddingBottom: sizeHeight(5) }}
          scrollToOverflowEnabled={0.5}
          onEndReached={onEndReached}
          onMomentumScrollBegin={onMomentumScrollBegin}
          extraData={this.props}
          ListFooterComponent={() => {
            return loading ? (
              <ActivityIndicator size={sizeFont(7)} color="red" />
            ) : null;
          }}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.touchView}
                onPress={() =>
                  navigation.navigate("DetailsOrdered", {
                    CODE_ORDER: item.CODE_ORDER,
                    TYPE: TYPE,
                    NAME: name,
                  })
                }
              >
                <View
                  style={[
                    styles.viewChild,
                    { justifyContent: "space-between" },
                  ]}
                >
                  <Text style={styles.textCode}>Mã ĐH: {item.CODE_ORDER} </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    <IconComponets
                      name="stopwatch"
                      size={sizeFont(5)}
                      color={"#666"}
                    />
                    <Text style={styles.textStatus}>
                      {moment(item.CREATE_DATE, "DD/MM/YYYY h:mm:ss").format(
                        "H:mm"
                      ) +
                        " " +
                        moment(item.CREATE_DATE, "DD/MM/YYYY").format(
                          "DD/MM/YYYY"
                        )}
                    </Text>
                  </View>
                </View>

                {authUser.GROUPS !== "3" ? (
                  <View
                    style={{ borderBottomColor: "#DDD", borderBottomWidth: 2 }}
                  />
                ) : (
                  <View
                    style={{
                      borderBottomColor: "#DDD",
                      borderBottomWidth: 2,
                      paddingBottom: sizeHeight(1),
                      flexDirection: "row",
                    }}
                  >
                    <Text style={styles.textCommonTitle}>ĐL:</Text>
                    <Text style={[styles.textCommon]}>
                      {item.FULL_NAME_CTV}{" "}
                    </Text>
                  </View>
                )}

                <View style={styles.viewChildInfor}>
                  <View style={styles.viewSubChildInfor}>
                    <IconComponets
                      name={"user-alt"}
                      size={sizeFont(5)}
                      color={COLOR.BUTTON}
                      soild
                    />
                    <Text style={styles.textChildInfor}>
                      {item.FULLNAME_RECEIVER}{" "}
                    </Text>
                  </View>
                  <View style={styles.viewSubChildInfor}>
                    <IconComponets
                      name={"mobile"}
                      size={sizeFont(5)}
                      color={COLOR.BUTTON}
                    />
                    <Text style={styles.textChildInfor}>
                      {item.MOBILE_RECCEIVER}{" "}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomColor: "#DDD",
                    borderBottomWidth: 2,
                    flexDirection: "row",
                    //paddingVertical: sizeHeight(1),
                  }}
                >
                  <FlatList
                    data={item.DETAIL_ORDER}
                    renderItem={({ item, index }) => {
                      return (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            alignContent: "center",
                            width: sizeWidth(93),
                          }}
                        >
                          <Image
                            source={{ uri: item.img }}
                            style={{
                              width: sizeWidth(15),
                              height: sizeHeight(10),
                            }}
                            resizeMode="contain"
                          />
                          <View style={{ marginLeft: sizeWidth(2.5) }}>
                            <Text style={{ fontSize: sizeFont(3.7) }}>
                              {item.name}{" "}
                            </Text>
                            <Text
                              style={{
                                fontWeight: "bold",
                                fontSize: sizeFont(4),
                              }}
                            >
                              {item.model}{" "}
                            </Text>
                          </View>
                          <View style={{ position: "absolute", right: 0 }}>
                            <Text
                              style={{
                                color: "rgb(243,116,29)",
                                fontSize: sizeFont(4),
                              }}
                            >
                              x{item.num}{" "}
                            </Text>
                          </View>
                        </View>
                      );
                    }}
                    keyExtractor={(item) => item.model}
                  />
                </View>
                <View style={styles.viewChild}>
                  <Text style={styles.textCommonTitle}>Tổng tiền dự kiến</Text>
                  <Text style={styles.textMoney}>
                    {numeral(item.TOTAL_MONEY).format("0,0")}VNĐ{" "}
                  </Text>
                </View>
                {TYPE === 2 && authUser.GROUPS === "3" ? (
                  <View>
                    <Text
                      style={styles.textStore}
                      onPress={() => {
                        navigation.navigate("ListStores", {
                          NAME: "OrderUser",
                          item: item,
                          authUser: authUser,
                        });
                      }}
                    >
                      Tình trạng kho
                    </Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}
