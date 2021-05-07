import React, { Component } from "react";
import {
  sizeHeight,
  sizeWidth,
  sizeFont,
} from "../../../utils/helper/size.helper";
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  RefreshControl,
  Image
} from "react-native";
import { COLOR } from "../../../utils/color/colors";
import moment from "moment";
import { updateNotify, getListNotify } from "../../../service/notify";
import { connect } from "react-redux";
import { countNotify } from "../../../action/notifyAction";
import { size } from "lodash";
import { SafeAreaView } from "react-native";
class ListNotification extends Component {
  state = {
    refreshing: false,
    count:0
  };
  handleType = (item) => {
    if (item.TYPE === 1 || item.TYPE === 6) {
      return "Chính sách";
    } else if (item.TYPE === 3) {
      return "DetailOrder";
    } else if (item.TYPE === 5) {
      return "";
    } else if (item.TYPE === 2) {
      return "";
    } else if (item.TYPE === 8) {
      return "";
    } else if (item.TYPE === 9) {
      return "";
    }
  };
  chonseAll=()=>{
    const {data}=this.props;
    console.log("data====",data);

  }
  handleUpdate = async (item) => {
    const { authUser } = this.props;
    await updateNotify({
      USERNAME: authUser.USERNAME,
      ID_NOTIFY: item.ID,
      IDSHOP: 'F6LKFY',
    })
      .then((result) => {
        console.log("updateNotify", result)
      })
      .catch((error) => {
        console.log(error);
      });
    await getListNotify({
      USERNAME: authUser.USERNAME,
      PAGE: 1,
      NUMOFPAGE: 1000,
      IDSHOP: 'F6LKFY',
    })
      .then((result) => {
        console.log("getListNotify", result.data.SUM_NOT_READ);
        if (result.data.ERROR === "0000") {
          this.props.countNotify(result.data.SUM_NOT_READ);
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidUpdate() {
    console.log("hí anh em")
  }
  render() {
    const {
      data,
      handleLoad,
      onMomentumScrollBegin,
      loadMore,
      onRefresh,
      navigation,
    } = this.props;
    return (
      <FlatList
        initialNumToRender={5}
        ListEmptyComponent={() => (
          <View>
            <Text>Không có thông báo</Text>
          </View>
        )}
        data={data}
        onEndReached={handleLoad}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={onRefresh}
          />
        }
        onEndReachedThreshold={0.5}
        keyboardShouldPersistTaps="handled"
        onMomentumScrollBegin={onMomentumScrollBegin}
        extraData={data}
        keyExtractor={(item) => item.ID}
        // ListFooterComponent={() =>
        //   loadMore === true ? (
        //     <View style={{ marginTop: sizeHeight(2) }}>
        //       <ActivityIndicator
        //         // color={COLOR.BUTTON}
        //         size={"large"}
        //       />
        //     </View>
        //   ) : null
        // }
        renderItem={({ item, index }) => {
          return (
            <SafeAreaView>
              <TouchableOpacity
                style={[
                  styles.touch,
                  {
                    backgroundColor:
                      item.IS_READ === 0 ? "#edf2fa" : "#FFFFFF",
                  },
                ]}
              // onPress={() => {
              //   this.handleUpdate(item);
              //   navigation.navigate("chitiet", {
              //     DATA: item
              //   });
              // }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require("../../../assets/images/logo.png")}
                      style={{ width: 40, height: 40, marginRight: 10 }}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(`${this.handleType(item)}`, {
                        ID: item.CONTENT.substr(9, 8),
                        NAME: 'infomation'
                      }), this.handleUpdate(item);
                    }}
                  >
                    <View style={styles.viewHeader}>
                      <Text style={{ fontStyle: 'italic', color: 'gray' }}>
                        {item.SENT_TIME}
                      </Text>
                      <Text style={{ fontWeight: "bold", fontSize: sizeFont(4) }}>
                        {/* {this.handleType(item)} */}
                      </Text>
                    </View>
                    <View style={{ width: sizeWidth(85) }}>
                      <Text>
                        {item.CONTENT}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </SafeAreaView>
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  touch: {
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    paddingVertical: sizeHeight(1),
    paddingHorizontal: sizeWidth(2)
  },
  viewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: sizeHeight(1),
  },
});
const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    username: state.authUser.username,
    idshop: state.product.database,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    countNotify: (text) => dispatch(countNotify(text)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListNotification);
