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

import _ from "lodash";
import { GetListCTV } from "../../service/account";
import Spinner from "react-native-loading-spinner-overlay";
import { ElementCustom } from "../error";
import {
  sizeHeight,
  sizeWidth,
  sizeFont,
} from "../../utils/helper/size.helper";
import Loading from "../loading";
import { COLOR } from "../../utils/color/colors";
import { connect } from "react-redux";
import IconComponets from "../icon";

class ListCTV extends Component {
  constructor(props) {
    super(props);
    this.offset = 1;
    this.onEndReachedCalledDuringMomentum = true;
    const { picked } = this.props.route.params;
    this.state = {
      search: "",
      cityID: "",
      search: "",
      loading: true,
      data: [],
      levelCTV: [],
      loadingSlow: false,
      loadingMore: false,
      picked: picked,
    };
  }
  handleLoad = () => {
    const { authUser } = this.props;
    const { search, cityID, picked } = this.state;
    GetListCTV({
      USERNAME: authUser.USERNAME,
      SEARCH: search,
      LEVEL_AGENCY: "",
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
      loadingMore,
      picked,
    } = this.state;
    const { onPicking } = this.props.route.params;
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
            ListHeaderComponent={() => {
              return (
                <TouchableOpacity
                  style={styles.viewContent}
                  onPress={() =>
                    onPicking({
                      USERNAME: "",
                    })
                  }
                >
                  <Text>Tất cả</Text>
                  <IconComponets
                    name="check"
                    size={sizeFont(6)}
                    color={picked.USERNAME === "" ? COLOR.BUTTON : "#fff"}
                  />
                </TouchableOpacity>
              );
            }}
            ListFooterComponent={() => (loadingMore ? <Loading /> : null)}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={styles.viewContent}
                  onPress={() => onPicking(item)}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text>{item.USERNAME} </Text>
                  </View>
                  <IconComponets
                    name="check"
                    size={sizeFont(6)}
                    color={
                      picked.USERNAME === item.USERNAME ? COLOR.BUTTON : "#fff"
                    }
                  />
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
    width: sizeWidth(100),
    alignSelf: "center",
    flex: 1,
    backgroundColor: "#fff",
  },

  viewContent: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#999",
    paddingVertical: sizeHeight(1),
    justifyContent: "space-between",
    width: sizeWidth(96),
    alignSelf: "center",
    paddingVertical: sizeHeight(1.5),
    alignItems: "center",
  },
});
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCTV);
