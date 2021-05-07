import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  getParentsItem,
  getListProducts,
  addProductCategory,
} from "../../../service/products";
import { ElementCustom, AlertCommon } from "../../../components/error";
import Spinner from "react-native-loading-spinner-overlay";
import IconComponets from "../../../components/icon";
import {
  sizeFont,
  sizeWidth,
  sizeHeight,
} from "../../../utils/helper/size.helper";
import Modal from "react-native-modal";
import ItemCategory from "./itemCategory";
import { COLOR } from "../../../utils/color/colors";
import { connect } from "react-redux";
import Loading from "../../../components/loading";
class NameItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      refreshing: false,
      show_Modal: false,
      valueName: "",
      valueParent: {
        NAME: "Không chọn",
      },
      showParsent: false,
      loadingAdd: false,
    };
    this.offset = 1;
    this.message = "";
  }
  componentDidMount() {
    const { navigation, status, authUser } = this.props;
    getListProducts({
      ID_PARENT: 0,
      IDSHOP: "F6LKFY",
      IDUSER: "F6LKFY",
    })
      .then((result) => {
        if (result.data.ERROR == "0000") {
          this.setState(
            {
              data: result.data.DETAIL,
            },
            () => {
              this.setState({
                loading: false,
              });
            }
          );
        } else {
          this.setState(
            {
              loading: false,
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
        this.setState({
          loading: false,
        });
      });

    navigation.setParams({
      showModal: () => this.setState({ show_Modal: !this.state.show_Modal }),
    });
  }
  handleLoad = () => {
    getListProducts({
      ID_PARENT: 0,
      IDSHOP: "F6LKFY",
      IDUSER: "F6LKFY",
    })
      .then((result) => {
        if (result.data.ERROR == "0000") {
          this.setState({
            data: result.data.DETAIL,
          });
        } else {
        }
      })
      .catch((error) => {
      });
  };
  handleAddItem = () => {
    const { authUser } = this.props;
    const { valueParent, valueName } = this.state;
    this.setState({ loadingAdd: true }, () => {
      addProductCategory({
        NAME: valueName,
        PARENTID: valueParent.ID,
        USERNAME: authUser.USERNAME,
        USER_CODE: authUser.USER_CODE,
        IDSHOP: "F6LKFY",
      })
        .then((result) => {
          this.setState({ loadingAdd: false }, () => {
            this.message = setTimeout(() => {
              AlertCommon("Thông báo", result.data.RESULT, () =>
                this.setState({ show_Modal: false })
              );
            }, 100);
          });
        })
        .catch((error) => {
          this.setState({ loadingAdd: false });
        });
    });
  };
  componentWillUnmount() {
    clearTimeout(this.message);
  }
  render() {
    const {
      loading,
      data,
      refreshing,
      show_Modal,
      valueName,
      valueParent,
      showParsent,
      loadingAdd,
    } = this.state;
    return loading ? (
      <Spinner
        visible={loading}
        customIndicator={<ElementCustom />}
        //overlayColor="#ddd"
      />
    ) : (
      <View>
        <Spinner
          visible={loadingAdd}
          customIndicator={<ElementCustom />}
          //overlayColor="#ddd"
        />
        <Modal
          isVisible={show_Modal}
          onBackButtonPress={() => this.setState({ show_Modal: !show_Modal })}
          onBackdropPress={() => this.setState({ show_Modal: !show_Modal })}
          backdropOpacity={0.5}
        >
          <View style={styles.viewModal}>
            <View style={styles.viewModalTitle}>
              <Text />
              <Text style={styles.textTitle}>Thêm danh mục</Text>
              <IconComponets
                name="times"
                size={sizeFont(6)}
                color={"#fff"}
                onPress={() => this.setState({ show_Modal: !show_Modal })}
              />
            </View>
            <View style={styles.viewChild}>
              <Text style={styles.textChild}>Tên danh mục</Text>
              <TextInput
                value={valueName}
                style={styles.textInput}
                onChangeText={(text) => this.setState({ valueName: text })}
              />
            </View>
            <View style={styles.viewChild}>
              <Text style={styles.textChild}>Chọn danh mục cha</Text>
              <TouchableOpacity
                style={styles.touchParent}
                onPress={() => this.setState({ showParsent: true })}
              >
                <Text>{valueParent.NAME}</Text>
                <IconComponets
                  name="angle-down"
                  size={sizeFont(6)}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.touchAdd}
              onPress={this.handleAddItem}
            >
              <Text style={styles.textTitle}>Thêm mới</Text>
            </TouchableOpacity>
            {loadingAdd ? <Loading /> : null}
          </View>
          <Modal
            isVisible={showParsent}
            onBackButtonPress={() =>
              this.setState({ showParsent: !showParsent })
            }
            onBackdropPress={() => this.setState({ showParsent: !showParsent })}
            backdropOpacity={0.5}
          >
            <View style={styles.viewModalChild}>
              <FlatList
                data={data}
                keyExtractor={(item) => item.ID}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={styles.touchModalChild}
                      onPress={() => {
                        this.setState({
                          showParsent: !showParsent,
                          valueParent: item,
                        });
                      }}
                    >
                      <Text style={styles.textModalChild}>{item.NAME} </Text>
                      <IconComponets
                        name="check"
                        size={sizeFont(6)}
                        color={
                          item.NAME === valueParent.NAME ? COLOR.BUTTON : "#fff"
                        }
                      />
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
          </Modal>
        </Modal>

        <FlatList
          data={data}
          keyExtractor={(item) => item.ID}
          renderItem={({ item, index }) => {
            return (
              <ItemCategory
                item={item}
                navigation={this.props.navigation}
                handleLoad={this.handleLoad}
              />
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
)(NameItems);
const styles = StyleSheet.create({
  viewModal: {
    backgroundColor: "#fff",
    width: sizeWidth(101),
    alignSelf: "center",
    paddingBottom: sizeHeight(4),
  },
  viewModalTitle: {
    backgroundColor: COLOR.HEADER,
    flexDirection: "row",
    paddingVertical: sizeHeight(2),
    //alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: sizeWidth(3),
  },
  textTitle: {
    color: "#fff",
    fontSize: sizeFont(4),
    textAlign: "center",
  },
  touchAdd: {
    backgroundColor: COLOR.BUTTON,
    paddingVertical: sizeHeight(1.5),
    alignSelf: "center",
    width: sizeWidth(30),
    borderRadius: 6,
    marginTop: sizeHeight(4),
  },
  textInput: {
    borderWidth: 1,
    paddingVertical: sizeHeight(2),
    paddingHorizontal: sizeWidth(2.5),
    borderColor: "#ddd",
    borderRadius: 2,
  },
  viewChild: {
    width: sizeWidth(90),
    alignSelf: "center",
    paddingTop: sizeHeight(2),
  },
  textChild: {
    fontSize: sizeFont(4),
    paddingBottom: sizeHeight(1),
  },
  touchParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: sizeHeight(2),
    paddingHorizontal: sizeWidth(2.5),
    borderRadius: 2,
  },
  viewModalChild: {
    backgroundColor: "#fff",
    width: sizeWidth(101),
    alignSelf: "center",
    flex: 1,
    marginTop: sizeHeight(20),
  },
  touchModalChild: {
    paddingHorizontal: sizeWidth(2.5),
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: sizeHeight(2),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textModalChild: {
    fontSize: sizeFont(4),
  },
});
