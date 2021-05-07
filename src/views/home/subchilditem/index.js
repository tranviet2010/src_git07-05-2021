import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { connect } from "react-redux";
import { ElementCustom, AlertCommon } from "../../../components/error";
import Spinner from "react-native-loading-spinner-overlay";
import { getListProductDetails } from "../../../service/products";
import { Image } from "react-native-elements";

import { COLOR } from "../../../utils/color/colors";
import {
  sizeHeight,
  sizeFont,
  sizeWidth,
} from "../../../utils/helper/size.helper";
import { handleMoney } from "../../../components/money";
var numeral = require("numeral");
class SubChildItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      refreshing: false,
      loadingMore: false,
    };
    this.message;
    this.offset = 1;
    this.onEndReachedCalledDuringMomentum = true;
  }
  onMomentumScrollBegin = () => {
    this.onEndReachedCalledDuringMomentum = false;
  };

  onEndReached = ({ distanceFromEnd }) => {
    const { loadingMore } = this.state;
    const { ID, SUB_ID_PAR } = this.props.route.params;

    if (!this.onEndReachedCalledDuringMomentum) {
      this.offset = this.offset + 1;
      this.setState(
        {
          loadingMore: true,
        },
        () => {
          getListProductDetails({
            USERNAME: null,
            SUB_ID_PARENT: SUB_ID_PAR,
            SUB_ID: ID,
            PAGE: this.offset,
            NUMOFPAGE: 10,
            IDSHOP: "F6LKFY",
          })
            .then((result) => {
              if (result.data.ERROR === "0000") {
                this.setState(
                  { data: [...this.state.data, ...result.data.INFO] },
                  () => {
                    this.setState({ loadingMore: false });
                  }
                );
              } else {
                this.setState({ loadingMore: false }, () => {
                  this.message = setTimeout(() => {
                    AlertCommon("Thông báo", result.data.RESULT, () => null);
                  }, 10);
                });
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
  onRefresh = () => {
    const { ID, SUB_ID_PARENT } = this.props.route.params;
    this.offset = 1;
    getListProductDetails({
      USERNAME: null,
      SUB_ID_PARENT:"",
      SUB_ID: ID,
      PAGE: this.offset,
      NUMOFPAGE: 10,
      IDSHOP: "F6LKFY",
    })
      .then((result) => {
        if (result.data.ERROR === "0000") {
          this.setState({ data: result.data.INFO }, () => {});
        } else {
          this.setState({ loading: false }, () => {
            this.message = setTimeout(() => {
              AlertCommon("Thông báo", result.data.RESULT, () => null);
            }, 10);
          });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  componentDidMount() {
    const { ID, SUB_ID_PARENT } = this.props.route.params;
    getListProductDetails({
      USERNAME: null,
      SUB_ID_PARENT: SUB_ID_PARENT,
      SUB_ID: ID,
      PAGE: this.offset,
      NUMOFPAGE: 10,
      IDSHOP: "F6LKFY",
    })
      .then((result) => {
        if (result.data.ERROR === "0000") {
          this.setState({ data: result.data.INFO }, () => {
            this.setState({ loading: false });
          });
        } else {
          this.setState({ loading: false }, () => {
            this.message = setTimeout(() => {
              AlertCommon("Thông báo", result.data.RESULT, () => null);
            }, 10);
          });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }
  render() {
    const { data, loading, refreshing } = this.state;
    const { navigation, authUser, status } = this.props;
    return loading ? (
      <Spinner
        visible={loading}
        customIndicator={<ElementCustom />}
        //overlayColor="#ddd"
      />
    ) : (
      <View style={{ width: sizeWidth(96), alignSelf: "center" }}>
        <FlatList
          numColumns={2}
          data={data}
          keyExtractor={(item) => item.SUB_ID}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          contentContainerStyle={{ paddingBottom: sizeHeight(5) }}
          scrollToOverflowEnabled={0.5}
          onEndReached={this.onEndReached}
          onMomentumScrollBegin={this.onMomentumScrollBegin}
          extraData={this.state}
          ListFooterComponent={() => {
            return loading ? (
              <ActivityIndicator size={sizeFont(7)} color="red" />
            ) : null;
          }}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.touchFlatListChild}
                onPress={() =>
                  navigation.navigate("DetailProducts", {
                    data: item,
                    ID_PRODUCT: item.ID_PRODUCT,
                    NAME: "SubChildItem",
                  })
                }
              >
                <Image
                  source={{ uri: item.IMAGE_COVER }}
                  PlaceholderContent={<ActivityIndicator />}
                  resizeMode="cover"
                  style={styles.imageSize}
                />
                <Text style={styles.textName}>{item.MODEL_PRODUCT} </Text>
                <Text style={styles.textCode}>{item.MODEL_PRODUCT} </Text>
                <Text style={styles.textPrice}>
                  {numeral(handleMoney(status, item, authUser)).format("0,0")}
                  USD
                </Text>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={() => (
            <View>
              <Text>Không có dữ liệu</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  touchFlatListChild: {
    borderRadius: 6,
    borderColor: COLOR.BUTTON,
    borderWidth: 0.5,
    marginVertical: sizeHeight(1),
    width: sizeWidth(47),
    overflow: "hidden",
    marginRight: sizeWidth(2),
    justifyContent:'center',
    alignItems:'center',
  },
  imageSize: {
    width: sizeWidth(45),
    justifyContent:'center',
    alignItems:'center',
    // width: sizeWidth(30),
    height: sizeHeight(20),
    
    //height: sizeHeight(20),
    overflow: "visible",
  },
  textName: {
    fontSize: sizeFont(4),
    paddingVertical: sizeHeight(3.5),
    paddingHorizontal: sizeWidth(2),
    paddingTop: sizeHeight(4.5),
    paddingVertical: sizeHeight(1),
  },
  textCode: {
    fontSize: sizeFont(4),
    fontWeight: "bold",
    paddingHorizontal: sizeWidth(2),
  },
  textPrice: {
    color: COLOR.BUTTON,
    fontSize: sizeFont(3.8),
    paddingVertical: sizeHeight(1),
    paddingHorizontal: sizeWidth(2),
  },
});
const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    username: state.authUser.username,
    idshop:state.product.database,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubChildItem);
