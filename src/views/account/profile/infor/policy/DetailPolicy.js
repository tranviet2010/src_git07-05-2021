




import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity,ScrollView } from "react-native";
import { GetInformation } from "../../../../../service/account";
import { connect } from "react-redux";
import { ElementCustom } from "../../../../../components/error";
import Spinner from "react-native-loading-spinner-overlay";
import HTML from "react-native-render-html";
import IconComponets from "../../../../../components/icon";
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../../../utils/helper/size.helper";
import _ from "lodash";
class Tranning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
  }
  componentDidMount() {
    const { authUser } = this.props;
    GetInformation({
      USERNAME: authUser.USERNAME,
      TYPES: 2,
      IDSHOP: "F6LKFY",
    })
      .then((result) => {
        if (result.data.ERROR === "0000") {
          this.setState(
            {
              data: result.data.INFO,
            },
            () => this.setState({ loading: false })
          );
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }
  render() {
    const {loading,data}=this.state;
    const {item}=this.props.route.params;
    
    return loading ? (
      <Spinner
        visible={loading}
        animation="fade"
        customIndicator={<ElementCustom />}
      />
    ) : (
      <View>
        {data.map(value=>(
          <View>
              {value.ID==item?<View>
                <ScrollView style={{paddingLeft:10,paddingRight:10 }}>
                      <HTML
                        html={value.CONTENT}
                      />
                </ScrollView></View>:null}
          </View>
        ))}
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
const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: sizeHeight(2),
    paddingHorizontal: sizeWidth(2.5),
  },
  textTitle: {
    fontSize: sizeFont(4),
    color: "#000",
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tranning);
