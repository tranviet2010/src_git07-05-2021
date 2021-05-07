import React, { Component } from "react";
import {
    View,
    TextInput,
    Text,
    SectionList,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
    Image,
    Alert,
    StyleSheet,
} from "react-native";
import _ from "lodash";

import { addToCart } from "../../../../action/orderAction";

var numeral = require("numeral");

import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import {
    sizeHeight,
    sizeFont,
    sizeWidth,
} from "../../../../utils/helper/size.helper";
import {
    AlertCommon,
    AlertCommonLogin,
    ElementCustom,
} from "../../../../components/error";
import { _retrieveData } from "../../../../utils/asynStorage";
import { DATAITEM } from '../../../../utils/asynStorage/store';
import { COLOR } from "../../../../utils/color/colors";

class FullItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.route.params.data,
            loading: true,
            refreshing: false,
            search: "",
            loadingSearch: false,
            cartLength: this.props.listItem.length
        };
        this.see = false;
    }
    handleSearch = () => {
        const arry = this.state.data.filter(el => el.PRODUCT_NAME.indexOf(this.state.search) != -1)
        this.setState({
            data: arry
        })
    };
    checkTime = (a, b) => {
        var start = a;
        var end = b;
        var datePart1 = start.split("/");
        var datePart2 = end.split("/");
        var dateObject1 = new Date(+datePart1[2], datePart1[1] - 1, +datePart1[0]);
        var dateObject2 = new Date(+datePart2[2], datePart2[1] - 1, +datePart2[0]);
        var currentDate = new Date();

        return (dateObject1 < currentDate && currentDate < dateObject2) ? 1 : -1
    }
    handleTouchAdd = async (data) => {
        const { count, activeTab, cartLength, loading, properties } = this.state;
        const { status, navigation } = this.props;
        data.qualyty = 1;
        if (status == "") {
            return AlertCommonLogin(
                "Thông báo",
                "Vui lòng đăng nhập trước khi đặt hàng",
                () => null,
                () => {
                    navigation.popToTop();
                    navigation.navigate("SignIn");
                },
                "Huỷ bỏ",
                "Đăng nhập"
            );
        }
        let dataCart = await _retrieveData(DATAITEM);
        let cart = JSON.parse(dataCart);
        await this.props.addToCart({ cart, data });
        if (cartLength == this.props.listItem.length) {
            AlertCommon("Thông báo", "Sản phẩm đã có trong giỏ hàng", () => null);
        } else {
            Alert.alert(
                "Thông báo",
                "Thêm sản phẩm vào giỏ hàng thành công",
                [
                    {
                        text: "Vào giỏ hàng",
                        onPress: () => {
                            navigation.navigate("CartHome", {
                                NAME: "HomePay",
                            })
                        },
                        style: "default",
                    },
                    {
                        text: "Tiếp tục mua",
                        style: "destructive",
                    }
                ],
                { cancelable: false }
            );
            this.setState({
                cartLength: cartLength + 1,
            });
        }
    };
    render() {
        const { loading, refreshing, search, data } = this.state;
        const { navigation, authUser, status } = this.props;

        console.log("this is data", data);
        return (
            <View style={{ backgroundColor: "#fff", height: sizeHeight(100) }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignContent: "center",
                        alignItems: "center",
                        borderRadius: 6,
                        borderWidth: 1,
                        borderColor: "#ddd",
                        paddingHorizontal: sizeWidth(2),
                        marginTop: sizeHeight(2),
                        width: sizeWidth(94),
                        alignSelf: "center",
                        backgroundColor: "#fff",
                        marginBottom: sizeHeight(1),
                    }}
                >
                    <TextInput
                        placeholder="Tìm kiếm"
                        value={search}
                        returnKeyType="search"
                        onFocus={() => (this.see = true)}
                        onBlur={() => (this.see = false)}
                        onChangeText={(text) => this.setState({ search: text })}

                        onSubmitEditing={() => this.handleSearch()}
                        style={{
                            width: sizeWidth(85),
                            paddingVertical: sizeHeight(1.5),
                        }}
                    />
                </View>
                <View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 7 }}>
                        <FlatList
                            numColumns={2}
                            data={data}
                            keyExtractor={(item) => item.SUB_ID}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                />
                            }
                            contentContainerStyle={{ paddingBottom: sizeHeight(5) }}
                            scrollToOverflowEnabled={0.5}
                            onEndReached={this.onEndReached}
                            onMomentumScrollBegin={this.onMomentumScrollBegin}
                            extraData={this.state}
                            // ListFooterComponent={() => {
                            //     return loading ? ( 
                            //         <ActivityIndicator size={sizeFont(7)} color="red" />
                            //     ) : null;
                            // }}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        style={styles.touchFlatListChild}
                                        onPress={() =>
                                            navigation.navigate("DetailProducts", {
                                                data: item,
                                                ID_PRODUCT: item.ID_PRODUCT,
                                                NAME: "SubChildItem",
                                            })
                                        }
                                    >
                                        {item.END_PROMOTION && this.checkTime(item.START_PROMOTION, item.END_PROMOTION) >= 0 ?
                                            <View style={{ position: 'absolute', right: 5, top: 5, width: sizeWidth(10), height: sizeHeight(2.5), backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', zIndex: 100, borderRadius: 2 }}>
                                                <Text style={{ fontSize: sizeFont(3), color: '#fff', fontSize: sizeFont(2) }}>-{numeral((item.PRICE - item.PRICE_PROMOTION) / item.PRICE * 100).format('0.00')}%</Text>
                                            </View> : null}
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Image
                                                source={{ uri: item.IMAGE_COVER }}
                                                PlaceholderContent={<ActivityIndicator />}
                                                resizeMode="cover"
                                                style={styles.imageSize}
                                            />
                                        </View>

                                        <Text style={styles.textCode}>
                                            {_.truncate(item.PRODUCT_NAME, {
                                                length: 20,
                                            })}{" "}
                                        </Text>
                                        {item.END_PROMOTION && this.checkTime(item.START_PROMOTION, item.END_PROMOTION) >= 0 ? <View>
                                            <View style={styles.textPrice1}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', alignItems: 'center' }}>
                                                    <Text style={styles.textPrice}>{numeral(item.PRICE_PROMOTION).format("0,0")} đ</Text>
                                                    <Text style={{ textDecorationLine: 'line-through', color: 'gray', fontSize: sizeFont(3) }}>{numeral(item.PRICE).format("0,0")} đ</Text>
                                                </View>
                                                <TouchableOpacity
                                                    onPress={() => this.handleTouchAdd(item)}
                                                >
                                                    <Image
                                                        source={require('../../../../assets/images/cartmain.png')}
                                                        style={styles.imageCart}
                                                    />
                                                </TouchableOpacity>
                                                {/* {this.props.authUser.GROUPS == 8 || this.props.authUser.GROUPS == undefined ? null : <Text style={{ color: '#3399FF', fontSize: sizeFont(3.5), paddingBottom: 5, marginLeft: sizeWidth(2) }}>HH: {numeral(item.COMISSION_PRODUCT * item.PRICE_PROMOTION * 0.01).format("0,0")}đ ({item.COMISSION_PRODUCT}%)</Text>} */}
                                            </View>
                                        </View> : <View>
                                                <View style={styles.textPrice1}>
                                                    <View >
                                                        <Text style={styles.textPrice}>{numeral(item.PRICE).format("0,0")} đ</Text>
                                                    </View>
                                                    <TouchableOpacity
                                                        onPress={() => this.handleTouchAdd(item)}
                                                    >
                                                        <Image
                                                            source={require('../../../../assets/images/cartmain.png')}
                                                            style={styles.imageCart}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                {/* {this.props.authUser.GROUPS == 8 || this.props.authUser.GROUPS == undefined ? null : <Text style={{ color: '#3399FF', fontSize: sizeFont(3.5), paddingBottom: 5, marginLeft: sizeWidth(2) }}>HH: {numeral(item.COMISSION_PRODUCT * item.PRICE * 0.01).format("0,0")}đ ({item.COMISSION_PRODUCT}%)</Text>} */}
                                            </View>}
                                    </TouchableOpacity>
                                );
                            }}
                            ListEmptyComponent={() => (
                                <View>
                                    <Text>Không có dữ liệu</Text>
                                </View>
                            )}
                        />
                    </View>

                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    touchFlatListChild: {
        borderRadius: 5,
        borderColor: COLOR.HEADER,
        borderWidth: 0.5,
        marginVertical: sizeHeight(1),
        width: sizeWidth(47),
        overflow: "hidden",
        marginRight: sizeWidth(2),

    },
    textPrice1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textPrice: {
        color: 'red',
        fontSize: sizeFont(3.8),
        paddingVertical: sizeHeight(1),
    },
    imageSize: {
        width: sizeWidth(45),
        justifyContent: 'center',
        alignItems: 'center',
        height: sizeHeight(20),
        overflow: "visible",
    },
    textName: {
        fontSize: sizeFont(4),
    },
    textCode: {
        fontSize: sizeFont(4),
        paddingHorizontal: sizeWidth(2),
        marginTop: sizeHeight(3),
    },
    imageCart: {
        width: sizeWidth(9),
        height: sizeHeight(5),
    },
    textPrice: {
        color: 'red',
        fontSize: sizeFont(3.8),
        paddingVertical: sizeHeight(0.5),
        paddingHorizontal: sizeWidth(2),
    },
});

const mapStateToProps = (state) => {
    return {
        status: state.authUser.status,
        authUser: state.authUser.authUser,
        username: state.authUser.username,
        listItem: state.order.listItem,
    };
};
const mapDispatchToProps = (dispatch) => {
    return { addToCart: (text) => dispatch(addToCart(text)) };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FullItem);
