import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { ElementCustom } from "../error";
import { GetLevelCTV } from "../../service/account";
import IconComponets from "../icon";
import {
  sizeFont,
  sizeWidth,
  sizeHeight,
} from "../../utils/helper/size.helper";
import { COLOR } from "../../utils/color/colors";
import { StyleSheet } from "react-native";
import { GetListStore } from "../../service/order";
import Loading from "../loading";
import _ from "lodash";
import listctv from "../listctv";
export default class ListNameStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingSlow: true,
      listStore: [],
      loadingMore: false,
    };
    this.offset = 1;
    this.onEndReachedCalledDuringMomentum = true;
  }
  handleLevelCTV = () => {
    GetListStore({
      IDSHOP: "F6LKFY",
      USERNAME: "babu",
      INDEXPAGE: this.offset,
      NUMOFPAGE: 20,
    })
      .then((result) => {
        if (result.data.ERROR === "0000") {
          this.setState({ listStore: result.data.INFO }, () =>
            this.setState({ loadingSlow: false })
          );
        } else {
          this.setState({ loadingSlow: false });
        }
      })
      .catch((error) => {
        this.setState({ loadingSlow: false });
      });
  };
  componentDidMount() {
    this.handleLevelCTV();
  }
  onMomentumScrollBegin = () => {
    this.onEndReachedCalledDuringMomentum = false;
  };
  onEndReached = ({ distanceFromEnd }) => {
    const { listStore } = this.state;
    if (!this.onEndReachedCalledDuringMomentum) {
      this.offset = this.offset + 1;
      this.setState({ loadingMore: true }, () => {
        GetListStore({
          IDSHOP: "F6LKFY",
          USERNAME: "babu",
          INDEXPAGE: this.offset,
          NUMOFPAGE: 20,
        })
          .then((result) => {
            if (result.data.ERROR === "0000") {
              this.setState(
                { listStore: _.concat(listStore, result.data.INFO) },
                () => this.setState({ loadingMore: false })
              );
            } else {
              this.setState({ loadingMore: false });
            }
          })
          .catch((error) => {
            this.setState({ loadingMore: false });
          });
      });
      this.onEndReachedCalledDuringMomentum = true;
    }
  };
  render() {
    const { loadingSlow, listStore, loadingMore } = this.state;
    const { picked, onPicking } = this.props.route.params;
    return loadingSlow ? (
      <Spinner
        visible={loadingSlow}
        animation="fade"
        customIndicator={<ElementCustom />}
      />
    ) : (
      <View style={styles.container}>
        <FlatList
          data={listStore}
          keyExtractor={(item) => item.ID}
          onMomentumScrollBegin={this.onMomentumScrollBegin}
          onEndReached={this.onEndReached}
          scrollEventThrottle={0.5}
          ListFooterComponent={() => (loadingMore ? <Loading /> : null)}
          ListHeaderComponent={() => {
            return (
              <TouchableOpacity>
                <TouchableOpacity
                  style={styles.touch}
                  onPress={() =>
                    onPicking({
                      VALUE: "",
                      LEVEL_USER: "",
                      NAME_LEVEL: "",
                    })
                  }
                >
                  <Text>Tất cả </Text>
                  <IconComponets
                    name="check"
                    size={sizeFont(6)}
                    color={picked.USERNAME === "" ? COLOR.BUTTON : "#fff"}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          }}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.touch}
                onPress={() => onPicking(item)}
              >
                <Text>{item.USERNAME} </Text>
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
    );
  }
}

const styles = StyleSheet.create({
  touch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#999",
    borderBottomWidth: 1,
    paddingVertical: sizeHeight(1.5),
    width: sizeWidth(96),
    alignSelf: "center",
  },
  container: {
    width: sizeWidth(100),
    backgroundColor: "#fff",
    height: sizeHeight(100),
  },
});
