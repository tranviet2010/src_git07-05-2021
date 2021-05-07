import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { GetProperties } from "../../../service/products";
import IconComponets from "../../../components/icon";
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../utils/helper/size.helper";
import { COLOR } from "../../../utils/color/colors";

class PropertiesItem extends Component {
  componentDidMount() {
    const { authUser } = this.props;
    GetProperties({
      USERNAME: authUser.USERNAME,
      LIST_PROPERTIES: null,
      ISSHOP: "BABU12",
    })
      .then((result) => {
        console.log("Result", result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <View style={{ width: sizeWidth(96), alignSelf: "center" }}>
        <View>
          <View
            style={{
              backgroundColor: COLOR.HEADER,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: sizeHeight(1),
              marginTop: sizeHeight(2),
              paddingHorizontal: sizeWidth(2.5),
            }}
          >
            <Text style={{ color: "#fff", fontSize: sizeFont(4) }}>Màu</Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#fff",
                paddingBottom: 4,
              }}
            >
              <IconComponets name="pencil" color="#fff" size={sizeFont(4)} />
            </View>
          </View>
          {[1, 2, 3].map((element, index) => {
            return (
              <View key={index}>
                <Text>{element} </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    authUser: state.authUser.authUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertiesItem);