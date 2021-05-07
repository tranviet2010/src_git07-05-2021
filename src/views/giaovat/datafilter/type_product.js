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
            data: [],
            loading: true,
            messsage: "",
            search: "",
            nameCity: [],
        };
    }
    async componentDidMount() {
        await GetProduct({})
            .then((result) => {
                console.log("this iss result====", result);
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
    }
    render() {
        const { loading, data, search, nameCity } = this.state;
        const { onSetDistrictChild, text } = this.props.route.params;

        return loading ? (
            <Spinner visible={loading} customIndicator={<ElementCustom />} />
        ) : (
                <View>
                    <View
                        style={{ marginTop: sizeHeight(2), marginBottom: sizeHeight(15), paddingLeft: 10, paddingRight: 10 }}
                    >
                        <FlatList
                            data={nameCity.length == 0 ? data : nameCity}
                            showsVerticalScrollIndicator={false}
                            extraData={this.state}
                            ListHeaderComponent={() => {
                                return (
                                    <View>
                                        {!text ? <ItemCommon
                                            title="- Tất cả -"
                                            onPress={() => {
                                                onSetDistrictChild("- tất cả -");
                                                this.props.navigation.goBack();
                                            }}
                                        /> : null}
                                    </View>
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
