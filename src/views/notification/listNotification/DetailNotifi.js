
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
class DetailNotifi extends Component {
  render() {
    const {DATA} =this.props.route.params;
    
    return (
        <View style={{padding:10}}>
            <Text style={{marginBottom:10,color:COLOR.MAIN}}>{DATA.SENT_TIME}</Text>
            <Text>{DATA.CONTENT}</Text>
        </View>
    )
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
  return {
    countNotify: (text) => dispatch(countNotify(text)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailNotifi);
