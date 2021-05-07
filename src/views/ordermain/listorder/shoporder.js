import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, ScrollView, RefreshControl, FlatList, Alert } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { sizeHeight, sizeWidth } from '../../../utils/helper/size.helper';
import { connect } from 'react-redux';
var numeral = require("numeral");
import { getListOrder } from '../../../service/order';
import Loading from '../../../components/loading';
import DropDownPicker from 'react-native-dropdown-picker';



class ShopOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startTime: moment()
                .add(-60, "day")
                .format("DD/MM/YYYY"),
            endTime: moment(new Date()).format("DD/MM/YYYY"),
            Data: [],
            isDatePickerVisible: false,
            inDateEndPicker: false,
            loading: true,
            refreshing: false,
            selectedValue: '',
            refreshing: false,
            page: 1,
        }
    }

    showDatePicker1 = () => {
        this.setState({
            isDatePickerVisible: true,
        })
    };
    hideDatePicker1 = () => {
        this.setState({
            isDatePickerVisible: false,
        })
    };
    handleConfirm1 = (date) => {
        this.setState({
            startTime: moment(date).format("DD/MM/YYYY")
        })

        this.hideDatePicker1();
    };
    showDatePicker2 = () => {
        this.setState({
            inDateEndPicker: true,
        })
    };
    hideDatePicker2 = () => {
        this.setState({
            inDateEndPicker: false,
        })
    };
    handleConfirm2 = (date) => {
        this.setState({
            endTime: moment(date).format("DD/MM/YYYY")
        })

        this.hideDatePicker2();
    };
    onRefresh = () => {
        getListOrder({
            USERNAME: this.props.username,
            USER_CTV: this.props.username,
            START_TIME: '',
            END_TIME: '',
            STATUS: '',
            PAGE: this.state.page,
            NUMOFPAGE: 10,
            IDSHOP: 'http://banbuonthuoc.moma.vn',
        })
            .then((result) => {
                if (result.data.ERROR === "0000") {
                    this.setState({ data: result.data.INFO }, () => { });
                } else {
                    this.setState({ loading: false }, () => {
                        this.message = setTimeout(() => {
                            AlertCommon("Thông báo", result.data.RESULT, () => null);
                        }, 10);
                    });
                }
            })
            .catch((error) => {
                this.setState({ loading: false });
            });
    };
    renderRow = ({ item }) => {
        return (

            <TouchableOpacity
                onPress={() => this.props.navigation.navigate("DetailOrder", {
                    ID: item.CODE_ORDER,
                    STATUS: item.STATUS,
                    NAME:'Order',
                })
                }
            >
                <View style={{ borderColor: '#B8C4C4', borderWidth: 1, margin: 10, padding: 5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontWeight: "bold" }}>
                                Mã ĐH: {item.CODE_ORDER}{" "}
                            </Text>
                        </View>
                        <View>
                            {this.checkColor(item)}
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>CTV:{item.FULL_NAME_CTV}</Text>
                        <Text style={{ marginLeft: sizeWidth(5) }}>Mã CTV: {item.USER_CODE}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={require('../../../assets/images/clock.png')}
                            style={{ width: sizeWidth(5), height: sizeHeight(5), }}
                        />
                        <Text>
                            {item.CREATE_DATE}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', borderColor: 'black', borderWidth: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require('../../../assets/images/human.png')}
                                style={{ width: sizeWidth(5), height: sizeHeight(5), }}
                            />
                            <Text style={{ color: '#F97932' }}>{item.FULLNAME_RECEIVER}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: sizeWidth(5) }}>
                            <Image
                                source={require('../../../assets/images/phone.png')}
                                style={{ width: sizeWidth(5), height: sizeHeight(5), }}
                            />
                            <Text style={{ color: '#F97932' }}>{item.MOBILE_RECCEIVER}</Text>
                        </View>
                    </View>
                    <View style={{ paddingTop: 7 }}>
                        <Text style={{ fontWeight: 'bold' }}>Tổng tiền: <Text style={{ color: '#F90000' }}>{numeral(item.TOTAL_MONEY).format("0,0")}</Text></Text>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }
    handLoadMore = () => {
        this.setState({ page: this.state.page + 1 })
    }
    handleLoad = () => {
        getListOrder({
            USERNAME: '',
            USER_CTV: '',
            START_TIME: '',
            END_TIME: '',
            STATUS: '',
            PAGE: 1,
            NUMOFPAGE: 300,
            IDSHOP: 'http://banbuonthuoc.moma.vn',
        })
            .then((res) => {
                console.log("get list Order", res);
                if (res.data.ERROR == "0000") {
                    this.setState({
                        Data: res.data.INFO,
                        loading: false
                    })
                } else {
                    this.showToast(res);
                }
            })
            .catch((err) => {
            });
    }
    componentDidMount() {
        this.handleLoad();
    }
    checkColor = (a) => {
        console.log("hello a",a);
        if (a.STATUS == 1) {
            return <View style={{ backgroundColor: '#4a8939', width: sizeWidth(30), height: sizeHeight(4), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#FFFFFF', }}>{a.STATUS_NAME}</Text>
            </View>
        } else if (a.STATUS == 2) {
            return <View style={{ backgroundColor: '#149CC6', width: sizeWidth(30), height: sizeHeight(4), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#FFFFFF', }}>{a.STATUS_NAME}</Text>
            </View>

        } else if (a.STATUS == 3) {
            return <View style={{ backgroundColor: '#149CC6', width: sizeWidth(30), height: sizeHeight(4), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#FFFFFF', }}>{a.STATUS_NAME}</Text>
            </View>

        } else if (a.STATUS == 4) {
            return <View style={{ backgroundColor: '#FF0000', width: sizeWidth(30), height: sizeHeight(4), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#FFFFFF', }}>{a.STATUS_NAME}</Text>
            </View>

        } else {
            return <View style={{ backgroundColor: '#279907', width: sizeWidth(30), height: sizeHeight(4), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#FFFFFF', }}>{a.STATUS_NAME}</Text>
            </View>

        }
    }
    render() {
        const { selectedValue, Data, loading } = this.state;
        console.log("DATA_CODEORDER", Data)
        return (
            <View style={{ marginBottom: sizeHeight(30) }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }}>
                    <View style={styles.confix}>
                        <TouchableOpacity
                            onPress={this.showDatePicker1}
                            style={{ justifyContent: 'center' }}
                        >
                            <View>
                                <Text style={{ fontSize: 12 }}>Bắt đầu</Text>
                                <Text style={{ fontSize: 12 }}>{this.state.startTime}</Text>
                            </View>



                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={this.state.isDatePickerVisible}
                            mode="date"
                            onConfirm={this.handleConfirm1}
                            onCancel={this.hideDatePicker1}
                        />
                    </View>

                    <View style={styles.confix}>
                        <TouchableOpacity
                            onPress={this.showDatePicker2}
                            style={{ justifyContent: 'center' }}
                        >
                            <View>
                                <Text style={{ fontSize: 12 }}>Kết thúc</Text>
                                <Text style={{ fontSize: 14 }}>{this.state.endTime}</Text>
                            </View>
                            <View>
                            </View>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={this.state.inDateEndPicker}
                            mode="date"
                            onConfirm={this.handleConfirm2}
                            onCancel={this.hideDatePicker2}
                        />
                    </View>


                </View>
                <View style={styles.confix1}>

                    <View
                        style={{

                            // The solution: Apply zIndex to any device except Android
                            ...(Platform.OS !== 'android' && {
                                zIndex: 10
                            }),
                            width: sizeWidth(38)
                        }}
                    >
                        <DropDownPicker
                            items={[
                                { label: 'Tất cả', value: '' },
                                { label: 'Hoàn thành', value: '0' },
                                { label: 'Đã tiếp nhận', value: '1' },
                                { label: 'Đang xử lí', value: '2' },
                                { label: 'Đang chuyển', value: '3' },
                                { label: 'Đã huỷ', value: '4' },
                            ]}
                            defaultValue={selectedValue}
                            placeholder="Tất cả"
                            containerStyle={{ height: sizeHeight(5.8) }}
                            style={{ backgroundColor: '#fafafa', width: sizeWidth(38), borderColor: '#4a8939', borderWidth: 1 }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa', width: sizeWidth(38) }}
                            onChangeItem={item => this.setState({
                                selectedValue: item.value
                            })}
                        />
                    </View>

                    <View style={{ width: sizeWidth(38) }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ loading: true }, async () => {
                                    await getListOrder({
                                        USERNAME: '',
                                        USER_CTV: '',
                                        START_TIME: this.state.startTime,
                                        END_TIME: this.state.endTime,
                                        STATUS: selectedValue,
                                        PAGE: 1,
                                        NUMOFPAGE: 300,
                                        IDSHOP: 'http://banbuonthuoc.moma.vn',
                                    })
                                        .then((res) => {
                                            console.log("loc res", res)
                                            if (res.data.ERROR == "0000") {
                                                this.setState({
                                                    Data: res.data.INFO
                                                })
                                            } else {
                                                Alert.alert('Thông báo', 'Không có dữ liệu');
                                                this.setState({
                                                    Data: []
                                                })
                                            }
                                        })
                                        .catch((err) => {
                                        });
                                    this.setState({ loading: false });
                                });
                            }}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    textAlign: "center",
                                    backgroundColor: '#149CC6',

                                    padding: 10,
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                }}
                            >
                                Lọc
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ height: 1.5, backgroundColor: '#B8C4C4', marginTop: sizeHeight(2), zIndex: -1 }}></View>
                <Text style={{ fontSize: 18, padding: 5, zIndex: -1 }}>Tổng số đơn hàng: <Text style={{ fontWeight: "bold" }}>{Data.length} đơn</Text></Text>
                <View style={{ height: 1.5, backgroundColor: '#B8C4C4', zIndex: -1 }}></View>
                {loading ? <Loading /> : <FlatList
                    data={Data}
                    renderItem={this.renderRow}
                    style={{ zIndex: -1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.handleLoad()}
                        />
                    }
                    onEndReached={this.handLoadMore}
                />

                }
            </View>
        )
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
    confix: {
        width: sizeWidth(40),
        borderColor: '#4a8939',
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderRadius: 5,
        height: sizeHeight(5.7),
        justifyContent: 'center',
    },
    confix1: {
        marginTop: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    }
})

export default connect(
    mapStateToProps,
    null
)(ShopOrder);
