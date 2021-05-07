import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import SearchComponent from "../../../../components/search";
import {
  sizeFont,
  sizeWidth,
  sizeHeight,
} from "../../../../utils/helper/size.helper";
import styles from "../../style";
import IconComponets from "../../../../components/icon";
import { COLOR } from "../../../../utils/color/colors";
import ItemCommon from "../../../../components/itemFlat";
import {
  getCollorator,
  getListCTVChild,
} from "../../../../service/collaborator";
import Spinner from "react-native-loading-spinner-overlay";
import { ElementCustom } from "../../../../components/error";
import { connect } from "react-redux";
class LevelCollaborator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loading: true,
      data: [],
    };
    this.offset = 1;
  }
  componentDidMount() {
    const {} = this.props;
    getListCTVChild({
      USERNAME: "",
      SEARCH: "",
      ID_CITY: "",
      I_PAGE: this.offset,
      NUMOFPAGE: 10,
      LEVEL: "",
      IDSHOP: "F6LKFY",
    })
      .then((result) => {})
      .catch((error) => {
      });
    getCollorator({ IDSHOP: "F6LKFY" })
      .then((result) => {
        if (result.data.ERROR == "0000") {
          this.setState(
            {
              data: result.data.INFO,
            },
            () => {
              this.setState({ loading: false });
            }
          );
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }
  render() {
    const { search, loading, data } = this.state;
    const { onSetLevel } = this.props.route.params;
    return loading ? (
      <Spinner visible={loading} customIndicator={<ElementCustom />} />
    ) : (
      <View
        style={{
          marginTop: sizeHeight(1),
          width: sizeWidth(95),
          alignSelf: "center",
        }}
      >
        <SearchComponent
          name="search"
          color="#999"
          size={sizeFont(6)}
          value={search}
          placeholder={"Tìm kiếm"}
          onChangeText={(text) => this.setState({ search: text })}
          isIcon={false}
        />
        <FlatList
          ListHeaderComponent={() => {
            return (
              <ItemCommon
                title="- None -"
                name="chevron-right"
                onPress={() => {
                  onSetLevel("- tất cả -");
                  this.props.navigation.goBack();
                }}
              />
            );
          }}
          data={data.length == 0 ? null : data}
          keyExtractor={(item) => item.LEVEL_USER.toString()}
          renderItem={({ item, index }) => {
            return (
              <ItemCommon
                title={item.NAME_LEVEL}
                name="chevron-right"
                onPress={() => {
                  onSetLevel(item.NAME_LEVEL);
                  this.props.navigation.goBack();
                }}
              />
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
)(LevelCollaborator);
