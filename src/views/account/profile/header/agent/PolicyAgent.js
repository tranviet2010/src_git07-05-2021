import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { GetInformation } from "../../../../../service/account";
import IconComponets from "../../../../../components/icon";
import {
  sizeFont,
  sizeWidth,
  sizeHeight,
} from "../../../../../utils/helper/size.helper";
import { COLOR } from "../../../../../utils/color/colors";
const data = [
  {
    id: 1,
    name: "Khách lẻ",
    percent: 30,
  },
  {
    id: 2,
    name: "Cửa hàng",
    percent: 20,
  },
  {
    id: 3,
    name: "Showroom",
    percent: 10,
  },
];
class PolicyAgent extends Component {
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
      IDSHOP: id.USER_CODE,
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
    return (
      <View style={styles.view}>
        <View style={styles.container}>
          <View style={styles.viewText}>
            <Text style={styles.textTitle}>Cấp đại lý</Text>
          </View>
          <View style={styles.viewText}>
            <Text style={styles.textTitle}>Phần trăm kênh giá</Text>
          </View>
          <View style={[styles.viewText, { flex: 0.7 }]}>
            <Text style={styles.textTitle}>Thao tác</Text>
          </View>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.container}>
                <Text style={styles.viewContent}>{item.name} </Text>
                <Text style={styles.viewContent}>{item.percent}% </Text>
                <View style={styles.viewIcon}>
                  <IconComponets name="pen" size={sizeFont(5)} color={"#999"} />
                  <IconComponets
                    name="times-circle"
                    size={sizeFont(5)}
                    color={COLOR.BUTTON}
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
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: sizeHeight(1),
  },
  textTitle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  viewContent: {
    flex: 1,
    textAlign: "center",
    fontSize: sizeFont(4),
  },
  viewText: {
    borderRightWidth: 2,
    flex: 1,
    backgroundColor: COLOR.BUTTON,
    borderRightColor: "#fff",
    paddingVertical: sizeHeight(1),
  },
  view: {
    width: sizeWidth(96),
    alignSelf: "center",
    marginVertical: sizeHeight(2),
  },
  viewIcon: {
    flex: 0.7,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PolicyAgent);
