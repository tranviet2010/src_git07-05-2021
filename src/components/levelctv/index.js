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

export default class LevelCTV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingSlow: true,
      levelCTV: [],
    };
  }
  handleLevelCTV = () => {
    GetLevelCTV({
      IDSHOP: "F6LKFY",
    })
      .then((result) => {
        if (result.data.ERROR === "0000") {
          this.setState({ levelCTV: result.data.INFO }, () =>
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
  render() {
    const { loadingSlow, levelCTV } = this.state;
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
          data={levelCTV}
          keyExtractor={(item) => item.VALUE}
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
                    color={picked.NAME_LEVEL === "" ? COLOR.BUTTON : "#fff"}
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
                <Text>{item.NAME_LEVEL} </Text>
                <IconComponets
                  name="check"
                  size={sizeFont(6)}
                  color={picked.VALUE === item.VALUE ? COLOR.BUTTON : "#fff"}
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
