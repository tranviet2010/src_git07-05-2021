import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { GetDistrictChild } from "../../service/countries";
import { searchByText } from "../../utils/helper/common.helper";
import SearchComponent from "../search";
import Spinner from "react-native-loading-spinner-overlay";
import { sizeHeight, sizeFont } from "../../utils/helper/size.helper";
import styles from "../../views/orders/style";
import ItemCommon from "../itemFlat";
import { ElementCustom } from "../error";

export default class ListDistrictChild extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      messsage: "",
      search: "",
      nameCity: [],
    };
    //this.nameCity = [];
  }
  async componentDidMount() {
    const { GHN_TINHID } = this.props.route.params;
    await GetDistrictChild({ ID_DISTRICT: GHN_TINHID })
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
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });

    // for (let i = 0; i < this.state.data.length; i++) {
    //   this.nameCity.push(this.state.data[i].NAME);
    // }
  }
  SearchCity = () => {
    const { data, search } = this.state;
    if (search == "") {
      this.setState({ nameCity: [] });
    } else {
      let nameCity = searchByText(data, search);
      this.setState({ nameCity: nameCity });
    }
    //return this.nameCity;
  };
  render() {
    const { loading, data, search, nameCity } = this.state;
    const { onSetDistrictChild } = this.props.route.params;

    return loading ? (
      <Spinner visible={loading} customIndicator={<ElementCustom />} />
    ) : (
      <View style={styles.viewTouchCommon}>
        <SearchComponent
          name="search"
          color="#999"
          size={sizeFont(4)}
          value={search}
          placeholder={"Tìm kiếm"}
          onChangeText={(text) => {
            this.setState({ search: text }, () => {
              this.SearchCity(search);
            });
          }}
          isIcon={false}
          onSearch={this.SearchCity}
        />
        <View
          style={{ marginTop: sizeHeight(2), marginBottom: sizeHeight(15) }}
        >
          <FlatList
            data={nameCity.length == 0 ? data : nameCity}
            showsVerticalScrollIndicator={false}
            extraData={this.state}
            ListHeaderComponent={() => {
              return (
                <ItemCommon
                  title="- None -"
                  name="chevron-right"
                  onPress={() => {
                    onSetDistrictChild("- tất cả -");
                    this.props.navigation.goBack();
                  }}
                />
              );
            }}
            renderItem={({ item, index }) => {
              return (
                <ItemCommon
                  title={item.NAME}
                  name="chevron-right"
                  onPress={() => {
                    onSetDistrictChild(item);
                    this.props.navigation.goBack();
                  }}
                />
              );
            }}
            keyExtractor={(item) => item.GHN_XAID}
          />
        </View>
      </View>
    );
  }
}
