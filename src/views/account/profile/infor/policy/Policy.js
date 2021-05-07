import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { GetInformation } from "../../../../../service/account";
import { ElementCustom } from "../../../../../components/error";
import Spinner from "react-native-loading-spinner-overlay";
import IconComponets from "../../../../../components/icon";
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../../../utils/helper/size.helper";

class Policy extends Component {
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
    console.log("data chính sách",data)
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
              <TouchableOpacity
                style={styles.touch}
                onPress={() =>
                  this.props.navigation.navigate("Chi tiết chính sách", {
                    item: item.ID,
                  })
                }
              >
                <Text style={styles.text}>{item.TITLE} </Text>
                <IconComponets
                  name="chevron-right"
                  size={sizeFont(5)}
                  color={"#999"}
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
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingVertical: sizeHeight(2),
    paddingHorizontal: sizeWidth(2.5),
    paddingLeft: sizeWidth(5),
  },
  text: {
    fontSize: sizeFont(4),
  },
});
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
)(Policy);
