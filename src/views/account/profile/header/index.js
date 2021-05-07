import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import IconComponets from "../../../../components/icon";
import { sizeFont } from "../../../../utils/helper/size.helper";
import { COLOR } from "../../../../utils/color/colors";
import styles from "../style";
import { connect } from "react-redux";

class ComponentAddFunction extends Component {
  navigationNavigate = (item) => {
    const { authUser, navigation } = this.props;
    navigation.navigate(item);
  };
  render() {
    const { authUser, navigation } = this.props;
    return authUser.GROUPS === "3" ? (
      <View style={{}}>
        {/**<Text style={styles.textTitle}>Tiện ích</Text> */}
        <TouchableOpacity
          style={styles.touchCommon}
          onPress={() => this.navigationNavigate("PolicyAgent")}
        >
          <Text style={styles.textContent}>Chính sách đại lý</Text>
          <IconComponets
            name="chevron-right"
            size={sizeFont(4)}
            color={COLOR.COLOR_RIGHT}
            light
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchCommon}
          onPress={() => this.navigationNavigate("MangeStore")}
        >
          <Text style={styles.textContent}>Quản lý kho</Text>
          <IconComponets
            name="chevron-right"
            size={sizeFont(4)}
            color={COLOR.COLOR_RIGHT}
            light
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchCommon}
          onPress={() => this.navigationNavigate("MangeAgent")}
        >
          <Text style={styles.textContent}>Quản lý Đại lý</Text>
          <IconComponets
            name="chevron-right"
            size={sizeFont(4)}
            color={COLOR.COLOR_RIGHT}
            light
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.touchCommon]}
          onPress={() => this.navigationNavigate("Report")}
        >
          <Text style={styles.textContent}>Báo cáo</Text>
          <IconComponets
            name="chevron-right"
            size={sizeFont(4)}
            color={COLOR.COLOR_RIGHT}
            light
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.touchCommon, { borderBottomWidth: 0 }]}
          onPress={() => this.navigationNavigate("Debt")}
        >
          <Text style={styles.textContent}>Công nợ</Text>
          <IconComponets
            name="chevron-right"
            size={sizeFont(4)}
            color={COLOR.COLOR_RIGHT}
            light
          />
        </TouchableOpacity>
      </View>
    ) : (
      <View style={{}}>
        <Text style={styles.textTitle}>Tiện ích</Text>
        <TouchableOpacity
          style={styles.touchCommon}
          onPress={() => this.navigationNavigate("Report")}
        >
          <Text style={styles.textContent}>Báo cáo</Text>
          <IconComponets
            name="chevron-right"
            size={sizeFont(4)}
            color={COLOR.BUTTON}
            light
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchCommon}
          onPress={() => this.navigationNavigate("Tranning")}
        >
          <Text style={styles.textContent}>Đào tạo</Text>
          <IconComponets
            name="chevron-right"
            size={sizeFont(4)}
            color={COLOR.BUTTON}
            light
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchCommon}>
          <Text style={styles.textContent}>Chính sách</Text>
          <IconComponets
            name="chevron-right"
            size={sizeFont(4)}
            color={COLOR.BUTTON}
            light
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentAddFunction);
