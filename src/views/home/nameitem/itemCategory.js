import React, { PureComponent } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  TextInput,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { COLOR } from "../../../utils/color/colors";
import {
  getParentsItem,
  getListSubProducts,
  updateProductCategory,
  addProductCategory,
} from "../../../service/products";
import { ElementCustom, AlertCommon } from "../../../components/error";
import Spinner from "react-native-loading-spinner-overlay";
import {
  getListSubChildProducts,
  deleteProductCategory,
} from "../../../service/products";
import {
  sizeHeight,
  sizeFont,
  sizeWidth,
} from "../../../utils/helper/size.helper";
import { connect } from "react-redux";
import IconComponets from "../../../components/icon";
import Modal from "react-native-modal";
import styles from "./style";
import Loading from "../../../components/loading";
class Item extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expand_child: false,
      loading: false,
      data: [],
    };
  }
  handleLoad = (item) => {
    const { expand_child } = this.state;
    const { status, authUser } = this.props;
    this.setState({ expand_child: !expand_child, loading: true }, () => {
      getParentsItem({
        ID_PARENT: item.ID,
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
                this.setState({ loading: false });
              }
            );
          } else {
            this.setState(
              {
                loading: false,
              },
              () => {
                this.message = setTimeout(
                  () =>
                    AlertCommon("Thông báo", result.data.RESULT, () => null),
                  10
                );
              }
            );
          }
        })
        .catch((err) => {
          this.setState({ loading: false });
        });
    });

    //this.loadChild(item);
  };
  componentWillUnmount() {
    clearTimeout(this.message);
  }
  render() {
    const { expand_child, loading } = this.state;
    const { item, expand, navigation } = this.props;
    return (
      <View>
        <Spinner
          visible={loading}
          customIndicator={<ElementCustom />}
          //overlayColor="#ddd"
        />
        {expand ? (
          <View>
            <View style={styles.item_child}>
              <Text style={{ fontSize: sizeFont(4) }}>{item.NAME} </Text>
              <TouchableOpacity
                style={{
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  this.handleLoad(item);
                }}
              >
                <FontAwesome
                  name={expand_child ? "chevron-right" : "chevron-down"}
                  size={sizeFont(6)}
                  style={{ color: COLOR.HEADER }}
                  light
                />
              </TouchableOpacity>
            </View>

            {/* child  */}
            {expand_child ? (
              <FlatList
                data={this.state.data}
                keyExtractor={(item) => item.ID}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("SubChildItem", {
                          name: item.NAME,
                          ID: item.ID,
                          SUB_ID_PARENT: item.ID_PARENT,
                          NAME: "NameItems",
                        });
                      }}
                    >
                      <Text
                        style={{
                          fontSize: sizeFont(4),
                          marginLeft: 60,
                          marginBottom: 10,
                        }}
                      >
                        {item.NAME}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            ) : null}
          </View>
        ) : null}
      </View>
    );
  }
}
class ItemCategory extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      expand_child: false,
      data: [],
      loading: false,
      showOption: false,
      show_Modal: false,
      name: "",
      loadingUpdate: false,
    };
    this.message;
  }
  componentDidMount() {}
  loadChild = (item) => {
    const { status, authUser } = this.props;
    this.setState({ loading: true }, () => {
      getParentsItem({
        ID_PARENT: item.ID,
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
                  () =>
                    AlertCommon("Thông báo", result.data.RESULT, () => null),
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
    });
  };
  componentWillUnmount() {
    clearTimeout(this.message);
  }
  handleEdit = () => {
    const { item, navigation, status, authUser, handleLoad } = this.props;
    const { name } = this.state;
    this.setState({ loadingUpdate: true }, () => {
      updateProductCategory({
        ID: item.ID,
        NAME: name,
        PARENTID: item.ID_PARENT,
        USERNAME: authUser.USERNAME,
        USER_CODE: authUser.USER_CODE,
        IDSHOP: "F6LKFY",
      })
        .then(async (result) => {
          if (result.data.ERROR === "0000") {
            await handleLoad();
            this.setState({ loadingUpdate: false, show_Modal: false });
          }
        })
        .catch((error) => {
          this.setState({ loadingUpdate: false, show_Modal: false });
        });
    });
  };

  deleteCategory = () => {
    const { item, navigation, status, authUser } = this.props;
    deleteProductCategory({
      USERNAME: authUser.USERNAME,
      USER_CODE: authUser.USER_CODE,
      IDSHOP: "F6LKFY",
      ID: null,
    })
      .then((result) => {
      })
      .catch((error) => {
      });
  };

  render() {
    const {
      expand,
      expand_child,
      loading,
      data,
      showOption,
      show_Modal,
    } = this.state;
    const { item, navigation, status, authUser } = this.props;
    return (
      <View style={{ marginBottom: 5 }}>
        <Spinner
          visible={loading}
          customIndicator={<ElementCustom />}
          //overlayColor="#ddd"
        />
        <TouchableOpacity
          style={expand ? styles.item_active : styles.item}
          onPress={() => {
            this.setState({ showOption: false });
          }}
          onLongPress={() => {
            this.setState({ showOption: true });
          }}
        >
          <Text style={expand ? styles.text_active : styles.text}>
            {item.NAME}{" "}
          </Text>
          {showOption ? (
            <View style={styles.viewOption}>
              <TouchableOpacity
                style={styles.touchTrash}
                onPress={this.deleteCategory}
              >
                <IconComponets
                  name="trash-alt"
                  size={sizeFont(6)}
                  color="#888"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ show_Modal: true })}
                style={[
                  styles.touchTrash,
                  {
                    borderBottomColor: "#999",
                    borderBottomWidth: 1,
                    paddingBottom: 2,
                  },
                ]}
              >
                <IconComponets
                  name="pencil-alt"
                  size={sizeFont(5)}
                  color="#888"
                />
              </TouchableOpacity>
              <View style={styles.viewChose} />
            </View>
          ) : null}

          <Modal
            isVisible={show_Modal}
            onBackButtonPress={() => this.setState({ show_Modal: !show_Modal })}
            onBackdropPress={() => this.setState({ show_Modal: !show_Modal })}
            backdropOpacity={0.5}
          >
            <View style={styles.viewEdit}>
              <TextInput
                placeholder={item.NAME}
                value={this.state.name}
                style={styles.textInputEdit}
                onChangeText={(text) => this.setState({ name: text })}
              />
              <TouchableOpacity
                style={styles.touchEdit}
                onPress={this.handleEdit}
              >
                <Text style={styles.textEdit}>Cập nhật</Text>
              </TouchableOpacity>

              {this.state.loadingUpdate ? <Loading /> : null}
            </View>
          </Modal>
          <TouchableOpacity
            style={expand ? styles.icon_expand_active : styles.icon_expand}
            onPress={() => {
              this.loadChild(item);
              this.setState({ expand: !expand });
            }}
          >
            <FontAwesome
              name={expand ? "minus" : "plus"}
              size={sizeFont(6)}
              style={{ color: expand ? "#ffffff" : "rgb(72,72,72)" }}
              light
            />
          </TouchableOpacity>
        </TouchableOpacity>
        {data.length == 0 ? null : (
          <FlatList
            data={data}
            extraData={this.state.data}
            keyExtractor={(item) => item.ID}
            renderItem={({ item, index }) => {
              return (
                <Item
                  item={item}
                  expand={expand}
                  navigation={navigation}
                  status={status}
                  authUser={authUser}
                />
              );
            }}
          />
        )}
        {/* child */}
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
)(ItemCategory);
