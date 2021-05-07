import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { searchByText } from "../../../utils/helper/common.helper";
import Spinner from "react-native-loading-spinner-overlay";
import { sizeHeight, sizeFont } from "../../../utils/helper/size.helper";
import ItemCommon from "../../../components/itemFlat";
import { ElementCustom } from "../../../components/error";
import { GetProduct } from '../../../service/giaovat';

export default class TypeProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ ID: 'sell', NAME: 'Cần bán' }, { ID: 'buy', NAME: 'Cần mua' }],
      loading: true,
      messsage: "",
      search: "",
      nameCity: [],

    };
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
    const { typeinfo } = this.props.route.params;
    return (
      <View>
        <View
          style={{ marginTop: sizeHeight(2), marginBottom: sizeHeight(15),paddingLeft:10,paddingRight:10 }}
        >
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            extraData={this.state}

            renderItem={({ item, index }) => {
              return (
                <ItemCommon
                  title={item.NAME}
                  name="chevron-right"
                  onPress={() => {
                    typeinfo(item);
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
