import React, { Component } from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { GetCity } from "../../../../service/countries";
import { ActivityIndicator, Colors } from "react-native-paper";

import { COLOR } from "../../../../utils/color/colors";
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../../utils/helper/size.helper";
import styles from "../../style";
import IconComponets from "../../../../components/icon";
import SearchComponent from "../../../../components/search";
import { searchByText } from "../../../../utils/helper/common.helper";
import ItemCommon from "../../../../components/itemFlat";
import { ElementCustom } from "../../../../components/error";

export default class ListCountries extends Component {
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
    await GetCity()
      .then((result) => {
        console.log(result.data, "city");
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
        console.log(error);
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
    const { onSetCity } = this.props.route.params;

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
                    onSetCity("- tất cả -");
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
                    onSetCity(item);
                    this.props.navigation.goBack();
                  }}
                />
              );
            }}
            keyExtractor={(item) => item.MATP}
          />
        </View>
      </View>
    );
  }
}
