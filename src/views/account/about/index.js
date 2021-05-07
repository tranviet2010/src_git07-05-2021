import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
import HTML from "react-native-render-html";
import { GetInformation } from "../../../service/account";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { ElementCustom } from "../../../components/error";
import moment from "moment";
import {
  sizeHeight,
  sizeWidth,
  sizeFont,
} from "../../../utils/helper/size.helper";
import IconComponets from "../../../components/icon";
class About extends Component {
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
      TYPES: 1,
      CATEGORY: "",
      IDSHOP: 'F6LKFY',
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
    const { loading, data } = this.state;
    return loading ? (
      <Spinner
        visible={loading}
        animation="fade"
        customIndicator={<ElementCustom />}
      />
    ) : (
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.ID}
          ListEmptyComponent={() => (
            <View>
              <Text>Không có dữ liệu</Text>
            </View>
          )}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  width: sizeWidth(96),
                  alignSelf: "center",
                  marginTop: sizeHeight(2),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignContent: "center",
                    position: "absolute",
                    right: 0,
                  }}
                >
                  <IconComponets
                    name={"stopwatch"}
                    size={sizeFont(6)}
                    color="#999"
                  />
                  <Text style={{ fontSize: sizeFont(4), color: "#999" }}>
                    {moment(item.CREATE_DATE, "YYYY-MM-DD HH:mm:ss").format(
                      "hh:mm DD/MM/YYYY"
                    )}{" "}
                  </Text>
                </View>
                <View style={{ marginTop: sizeHeight(4) }}>
                  <HTML html={item.CONTENT} />
                  <Image
                    PlaceholderContent={<ActivityIndicator />}
                    source={
                      item.IMAGE_COVER == null
                        ? require("../../../assets/images/camera.png")
                        : { uri: item.IMAGE_COVER }
                    }
                    resizeMode="contain"
                    style={{ width: sizeWidth(90), height: sizeHeight(35) }}
                  />
                </View>
              </View>
            );
          }}
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
)(About);
