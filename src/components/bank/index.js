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
import {bank} from "../../views/account/profile/update/bank/listbank";

export default class ListDistrictChild extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: bank,
      loading: true,
      messsage: "",
      search: "",
      nameCity: [],
    };
    //this.nameCity = [];
  }
  handleSearch = () => {
    const arry=bank.filter(el=>el.vn_name.indexOf(this.state.search)!=-1)
    this.setState({
        data:arry
    })
};
  render() {
    const { loading, data, search, nameCity } = this.state;
    const { onSetDistrictChild } = this.props.route.params;
    
    return (
      <View style={styles.viewTouchCommon}>
        <SearchComponent
          name="search"
          color="#999"
          size={sizeFont(4)}
          value={search}
          placeholder={"Tìm kiếm"}
          onSubmitEditing={()=>this.handleSearch()}
          onChangeText={(text) => {
            this.setState({ search: text }, () => {
              this.handleSearch();
            });
          }}
          isIcon={false}
          onSearch={this.SearchCity}
        />
        <View
          style={{ marginTop: sizeHeight(2), marginBottom: sizeHeight(15) }}
        >
          <FlatList
            data={data}
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
                  title={item.vn_name}
                  name="chevron-right"
                  onPress={() => {
                    onSetDistrictChild(item.vn_name);
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
