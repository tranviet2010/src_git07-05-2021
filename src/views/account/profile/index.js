import React, { Component } from "react";
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import ComponentAddFunction from "./header";
import Information from "./infor";
import Contact from "./contact";
import { COLOR } from "../../../utils/color/colors";
import { sizeHeight, sizeWidth } from "../../../utils/helper/size.helper";
import { Provider } from "react-native-paper";
import { _removeData } from "../../../utils/asynStorage";
import { TOKEN } from "../../../utils/asynStorage/store";
import { connect } from "react-redux";
import { LogOut } from "../../../action/authAction";
import { countNotify } from "../../../action/notifyAction";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlertOption: false,
    };
  }
  show = () => {
    return Alert.alert(
      "Đăng xuất",
      "Bạn chắc chắn muốn đăng xuất?",
      [
        {
          text: "Cancel",
          style: "destructive",
        },
        {
          text: "OK",
          onPress: () => {
            Promise.all(_removeData(TOKEN));
            this.props.countNotify(0);
            this.props.LogOut();
          },
          style: "default",
        },
      ],
      { cancelable: false }
    );
  };
  render() {
    const { showAlertOption } = this.state;
    const { navigation, authUser } = this.props;
    return (
      <Provider>
        <ScrollView contentContainerStyle={{ paddingBottom: sizeHeight(5) }}>
          <ComponentAddFunction navigation={navigation} />
          <Information navigation={navigation} />
          {this.props.authUser.GROUPS === "3" ? null : (
            <Contact authUser={authUser} />
          )}
          <TouchableOpacity
            style={{ marginTop: sizeHeight(2) }}
            onPress={() => {
              this.setState({ showAlertOption: true });
              this.show();
            }}
          >
            <Text style={{ textAlign: "center", color: COLOR.BUTTON }}>
              Đăng xuất
            </Text>
          </TouchableOpacity>
          {/**<AlertOption
            showAlertOption={showAlertOption}
            onClose={() => this.setState({ showAlertOption: false })}
            title="Đăng xuất"
            message="Bạn chắc chắn muốn đăng xuất?"
            onCloseContinue={() => this.setState({ showAlertOption: false })}
            Cancel="Huỷ bỏ"
            Continue="Đồng ý"
          /> */}
        </ScrollView>
      </Provider>
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
  return {
    LogOut: (data) => dispatch(LogOut(data)),
    countNotify: (text) => dispatch(countNotify(text)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
