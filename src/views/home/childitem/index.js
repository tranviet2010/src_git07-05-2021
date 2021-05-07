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
} from "react-native";

var numeral = require("numeral");
import {
  getListSubChildProducts,
  getListDetailChildProducts,
  getListProducts,
  getListSubProducts,
} from "../../../service/products";
import { _retrieveData } from "../../../utils/asynStorage";
import { connect } from "react-redux";
import { ElementCustom, AlertCommon } from "../../../components/error";
import Spinner from "react-native-loading-spinner-overlay";
import ListProducts from "../listItem";
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

class ChildListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      refreshing: false,
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
                          {item.PRODUCT_NAME}{" "}
                        </Text>
                        <Text style={styles.textCode}>
                          {item.MODEL_PRODUCT}{" "}
                        </Text>
                        <Text style={styles.textPrice}>
                          {numeral(handleMoney(status, item, authUser)).format(
                            "0,0"
                          )}
                          VNĐ
                        </Text>
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
                    SUB_ID_PAR: this.props.route.params.ID,
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
    idshop: state.product.database,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChildListItem);
