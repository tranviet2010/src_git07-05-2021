import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { GetListCTV } from "../../../../../service/account";
import { connect } from "react-redux";
import {
  sizeWidth,
  sizeFont,
  sizeHeight,
} from "../../../../../utils/helper/size.helper";
import IconComponets from "../../../../../components/icon";
import { COLOR } from "../../../../../utils/color/colors";
const data = [
  {
    id: 1,
    name: "Nguyễn Văn Dư",
    code: "ATHD90",
    phone: "0971606497",
  },
  {
    id: 2,
    name: "Nguyễn Văn Dư",
    code: "ATH890",
    phone: "0971606499",
  },
  {
    id: 3,
    name: "Nguyễn Văn Dư",
    code: "AT2890",
    phone: "0971607499",
  },
  {
    id: 4,
    name: "Nguyễn Văn Dư",
    code: "ATH890",
    phone: "0971606499",
  },
];
class MangeStore extends Component {
  constructor(props) {
    super(props);
    this.offset = 1;
    this.state = {
      search: "",
      cityID: "",
      search: "",
      loading: true,
    };
  }
  handleLoad = () => {
    const { authUser } = this.props;
    const { search, cityID } = this.state;
    GetListCTV({
      USERNAME: authUser.USERNAME,
      SEARCH: search,
      ID_CITY: cityID,
      I_PAGE: 10,
      NUMOFPAGE: this.offset,
      IDSHOP: "F6LKFY",
    })
      .then((result) => {
      })
      .catch((error) => {
      });
  };
  componentDidMount() {
    this.handleLoad();
  }
  render() {
    const { search } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.viewTextinput}>
          <TextInput
            style={{ width: sizeWidth(80), paddingVertical: sizeHeight(0.5) }}
            value={search}
            onChangeText={(text) => this.setState({ search: text })}
            placeholder="Tên/Mã/Số điện thoại"
          />
          <IconComponets name="search" size={sizeFont(6)} color="#999" />
        </View>

        <TouchableOpacity style={styles.touchSearch}>
          <Text style={styles.textSearch}>Tìm kiếm</Text>
        </TouchableOpacity>

        <View style={styles.viewCTV}>
          <View style={styles.viewChildCTV}>
            <Text style={styles.textChildCTV}>Tên kho</Text>
          </View>
          <View style={[styles.viewSubChildCTV, { flex: 0.6 }]}>
            <Text style={styles.textChildCTV}>Mã kho</Text>
          </View>
          <View style={styles.viewSubChildCTV}>
            <Text style={styles.textChildCTV}>Điện thoại</Text>
          </View>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.viewContent}
                onPress={() => this.props.navigation.navigate("DetailStore")}
              >
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text>{item.name} </Text>
                </View>
                <View style={{ flex: 0.6, alignItems: "center" }}>
                  <Text>{item.code} </Text>
                </View>
                <View style={{ flex: 0.7, alignItems: "center" }}>
                  <Text>{item.phone} </Text>
                </View>
              </TouchableOpacity>
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
const styles = StyleSheet.create({
  container: {
    width: sizeWidth(96),
    alignSelf: "center",
  },
  viewTextinput: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#999",
    marginTop: sizeHeight(2),
    paddingVertical: sizeHeight(1.5),
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: sizeWidth(2.5),
  },
  viewSearch: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: sizeHeight(2),
    paddingHorizontal: sizeWidth(2),
    alignItems: "center",
  },
  touchSearch: {
    backgroundColor: COLOR.BUTTON,
    paddingVertical: sizeHeight(1.5),
    borderRadius: 6,
    width: sizeWidth(30),
    marginTop: sizeHeight(2),
    alignSelf: "center",
  },
  textSearch: {
    color: "#fff",
    textAlign: "center",
    fontSize: sizeFont(4),
  },
  viewChild: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#999",
    marginHorizontal: sizeWidth(2),
  },
  text: {
    fontSize: sizeFont(4),
  },
  viewCTV: {
    flexDirection: "row",
    marginTop: sizeHeight(4),
  },
  viewChildCTV: {
    flex: 1,
    borderRightWidth: 2,
    borderRightColor: "#fff",
    backgroundColor: COLOR.BUTTON,
    paddingVertical: sizeHeight(1.5),
  },
  textChildCTV: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  viewSubChildCTV: {
    flex: 0.7,
    borderRightWidth: 2,
    borderRightColor: "#fff",
    backgroundColor: COLOR.BUTTON,
    paddingVertical: sizeHeight(1.5),
  },
  viewContent: {
    flexDirection: "row",
    marginTop: sizeHeight(2),
  },
});
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MangeStore);
