import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { GetInformation } from "../../../../../service/account";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { ElementCustom } from "../../../../../components/error";
import { Image } from "react-native-elements";
import { sizeWidth, sizeHeight } from "../../../../../utils/helper/size.helper";
import HTML from "react-native-render-html";

// 1: gioi thieu; 2: chinh sach ;3 :dao tao; 4: tin tuc
//(danh mục chỉ trên TYPES =daotao thì có, ko thì trống)

class Introduction extends Component {
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
    const { loading, data } = this.state;
    console.log("this is data", data);
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
                <View>

                  {/* <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image
                      source={
                        item.IMAGE_COVER == null
                          ? require("../../../../../assets/images/logo.png")
                          : { uri: item.IMAGE_COVER }
                      }
                      resizeMode="center"
                      style={{ width: sizeWidth(30), height: sizeHeight(20), }}
                    />
                  </View> */}
                  <View>
                    <ScrollView style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
                      <Text>{item.CREATE_DATE}</Text>
                      <HTML
                        html={item.CONTENT}
                      />
                    </ScrollView>

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
    idshop: state.product.database,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Introduction);
