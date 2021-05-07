import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Picker } from 'react-native';
import { sizeFont, sizeHeight, sizeWidth } from '../../../../utils/helper/size.helper';
import { COLOR } from '../../../../utils/color/colors';
import DropDownPicker from 'react-native-dropdown-picker';
import { connect } from 'react-redux';
var numeral = require("numeral");

import { ReportCTV } from "../../../../service/account";
import { size } from 'lodash';

class UserReport extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Data: [],
            loading: false,
            year: '2021',
            moth: '1',
        }
    }
    handLoad = () => {
        ReportCTV({
            USERNAME: this.props.username,
            USER_CTV: this.props.username,
            YEAR: this.state.year,
            MOTH: this.state.moth,
            PAGE: '1',
            NUMOFPAGE: '30',
            IDSHOP: 'F6LKFY'
        })
            .then((res) => {
                console.log('hello res',res);
                console.log("this is config", res);
                if (res.data.ERROR == '0000') {
                    this.setState({
                        Data: res.data.INFO
                    })
                }
                else {
                    alert("không có dữ liệu")
                }
            })
            .catch((err) => {
                this.setState({
                    Data: []
                })
            })
    }
    doanhthu = () => {
        var { Data } = this.state;
        var money = 0;
        Data.map((val) => {
            money += val.SUM_MONEY
        })
        return money;

    }
    hoahong = () => {
        var { Data } = this.state;
        var money = 0;
        Data.map((val) => {
            money += val.SUM_COMMISSION
        })
        return money;

    }
    componentDidMount() {
        this.handLoad();
    }

    render() {
        const { Data, year, moth } = this.state;
        const { authUser, status } = this.props;
        console.log("this is dat", moth);
        return (
            <View >
                <View style={{ padding: 10 }}>
                    <View >
                        <Text style={{ fontWeight: 'bold' }}>Tên CTV: {authUser.FULL_NAME}</Text>
                        <Text style={{}}>Mã user: {authUser.USERNAME}</Text>
                    </View>
                    <View >
                        <Text style={{ fontWeight: '500' }}>Số điện thoại: {authUser.MOBILE}</Text>
                        <Text style={{}}>Email: {authUser.EMAIL}</Text>
                    </View>

                </View>
                <View style={{ padding: 10 }}>
                    <Text style={{ fontWeight: '500' }}>Tổng doanh thu: {numeral(this.doanhthu()).format("0,0")} đ</Text>
                    <Text style={{ fontWeight: '500' }}>Tổng hoa hồng: {numeral(this.hoahong()).format("0,0")} đ</Text>
                </View>
                <View>
                    <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{}}>
                            <Text style={{ marginBottom: 5, fontWeight: '500' }}>Năm</Text>
                            <View>
                                <View
                                    style={{
                                        ...(Platform.OS !== 'android' && {
                                            zIndex: 10
                                        })

                                    }}
                                >
                                    <DropDownPicker

                                        items={[
                                            { label: '2019', value: '2019' },
                                            { label: '2020', value: '2020' },
                                            { label: '2021', value: '2021' },
                                        ]}
                                        defaultValue={year}
                                        placeholder="2020"
                                        containerStyle={{ height: sizeHeight(5.7) }}
                                        style={{ backgroundColor: '#fafafa', width: sizeWidth(40), borderColor: '#4d7335', borderWidth: 1 }}
                                        itemStyle={{
                                            justifyContent: 'flex-start'
                                        }}
                                        dropDownStyle={{ backgroundColor: '#fafafa', width: sizeWidth(40) }}
                                        onChangeItem={item => this.setState({
                                            year: item.value
                                        })}
                                    />
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={{ marginBottom: 5, fontWeight: '500' }}>Tháng</Text>
                            <View>

                                <View
                                    style={{
                                        ...(Platform.OS !== 'android' && {
                                            zIndex: 10
                                        })

                                    }}
                                >
                                    <DropDownPicker

                                        items={[
                                            { label: '1', value: '1' },
                                            { label: '2', value: '2' },
                                            { label: '3', value: '3' },
                                            { label: '4', value: '4' },
                                            { label: '5', value: '5' },
                                            { label: '6', value: '6' },
                                            { label: '7', value: '7' },
                                            { label: '8', value: '8' },
                                            { label: '9', value: '9' },
                                            { label: '10', value: '10' },
                                            { label: '11', value: '11' },
                                            { label: '12', value: '12' },
                                        ]}
                                        defaultValue={moth}
                                        placeholder="Chọn tháng"
                                        containerStyle={{ height: sizeHeight(5.7) }}
                                        style={{ backgroundColor: '#fafafa', width: sizeWidth(40), borderColor: '#4d7335', borderWidth: 1 }}
                                        itemStyle={{
                                            justifyContent: 'flex-start'
                                        }}
                                        dropDownStyle={{ backgroundColor: '#fafafa', width: sizeWidth(40) }}
                                        onChangeItem={item => this.setState({
                                            moth: item.value
                                        })}
                                    />
                                </View>
                            </View>
                        </View>

                    </View>
                    <TouchableOpacity
                        onPress={() => this.handLoad()}
                        style={{ justifyContent: 'center', alignItems: 'center', marginBottom: sizeHeight(3), zIndex: -2 }}>
                        <Text style={{ backgroundColor: '#149CC6', padding: 7, color: '#fff' }}>Tìm kiếm</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 5, backgroundColor: '#BFC4C4', zIndex: -2 }}></View>

                <View style={{ marginTop: 20, zIndex: -1 }}>
                    <View>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={[styles.mainUser, styles.custom, styles.customTop]}>

                                <View style={[styles.row2, styles.types]}><Text style={{ color: '#fff' }}>T/G tạo</Text></View>
                                <View style={[styles.row3, styles.types]}><Text style={{ color: '#fff' }}>T/G hoàn thành</Text></View>
                                <View style={[styles.row4, styles.types]}><Text style={{ color: '#fff' }}>Mã HĐ</Text></View>
                                <View style={[styles.row5, styles.types]}><Text style={{ color: '#fff' }}>Doanh thu</Text></View>
                                <View style={[styles.row6, styles.types]}><Text style={{ color: '#fff' }}>Hoa hồng</Text></View>
                            </View>
                            <ScrollView>

                                {Data.length == 0 ? <View style={{ width: sizeWidth(100), height: sizeHeight(40), justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: sizeFont(4), padding: 20, color: 'gray' }}>Không có dữ liệu</Text>
                                </View> : Data.map((val, key) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate("DetailOrder", {
                                                ID: val.CODE_ORDER,
                                                STATUS: val.STATUS,
                                            })}
                                        >
                                            <View style={[styles.mainUser, styles.custom]}>
                                                <View style={[styles.row2, styles.row21]}><Text style={{ fontSize: sizeFont(3), color: '#fff' }}>{val.CREATE_DATE}</Text></View>
                                                <View style={[styles.row3, styles.row21]}><Text style={{ fontSize: sizeFont(3), color: '#fff' }}>{val.FN_TIME}</Text></View>
                                                <View style={[styles.row4, styles.row21]}><Text style={{ fontSize: sizeFont(3), color: '#fff' }}>{val.CODE_ORDER}</Text></View>
                                                <View style={[styles.row5, styles.row21]} ><Text style={{ fontSize: sizeFont(3), color: '#fff' }}>{numeral(val.SUM_MONEY).format("0,0")}</Text></View>
                                                <View style={[styles.row6, styles.row21]}><Text style={{ fontSize: sizeFont(3), color: '#fff' }}>{numeral(val.SUM_COMMISSION).format("0,0")}</Text></View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </View>
                    <View>
                    </View>
                </View>
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
    mainUser: {
        flexDirection: 'row',
        backgroundColor: '#4d7335',
    },
    row2: {

        textAlign: 'center',
        width: sizeWidth(20),
        fontSize: sizeFont(3),
        borderRightColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
    },
    row3: {

        textAlign: 'center',
        width: sizeWidth(20),
        fontSize: sizeFont(3),
        borderRightColor: '#fff',
        borderRightWidth: 1,
    },
    row4: {

        textAlign: 'center',
        width: sizeWidth(20),
        fontSize: sizeFont(3),
        borderRightColor: '#fff',
        borderRightWidth: 1,
    },
    row5: {

        textAlign: 'center',
        width: sizeWidth(20),
        fontSize: sizeFont(3),
        borderRightColor: '#fff',
        borderRightWidth: 1,
    },
    row6: {

        textAlign: 'center',
        width: sizeWidth(20),
        fontSize: sizeFont(3),
    },
    row7: {

        textAlign: 'center',
        width: sizeWidth(20),
        fontSize: sizeFont(3),
        borderRightColor: 'gray',
        borderRightWidth: 1,
    },
    types: {
        backgroundColor: COLOR.MAIN,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: sizeFont(3.5),
        fontWeight: 'bold',
    },
    custom: {
        borderBottomColor: '#fff',
        borderBottomWidth: 1,

    },
    customTop: {
        borderTopColor: '#fff',
        borderTopWidth: 1,
    },
    row21: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default connect(
    mapStateToProps,
    null
)(UserReport);