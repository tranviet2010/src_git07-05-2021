import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, ScrollView, RefreshControl, Alert } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { sizeHeight, sizeWidth } from '../../../../utils/helper/size.helper';
import { connect } from 'react-redux';
var numeral = require("numeral");
import { ReportDefault } from "../../../../service/account";
import DropDownPicker from 'react-native-dropdown-picker';

class ReportDay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            selectMonth: '',
            selectYear: '2021',
        }
    }
    handLoad = () => {
        ReportDefault({
            USERNAME: this.props.username,
            YEAR: this.state.selectYear,
            MONTH: this.state.selectMonth,
            REPORT_TYPE: '3',
            IDSHOP: 'F6LKFY',
        })
            .then((result) => {
                if (result.data.ERROR == '0000') {
                    this.setState({
                        data: result.data.INFO
                    })
                } else {
                    this.setState({
                        data: []
                    })

                }
            })
    }
    allData = (a) => {
        const { data } = this.state;
        var sumOrder = 0;
        var sumMonney = 0;
        var sumCommitsion = 0;
        var sumTT = 0;



        for (var i = 0; i < data.length; i++) {
            sumOrder = sumOrder + data[i].TOTAL_ORDER;
        }
        return sumOrder;


    }
    allData1 = () => {
        const { data } = this.state;
        var sumOrder = 0;
        var sumMonney = 0;
        var sumCommitsion = 0;
        var sumTT = 0;


        for (let i = 0; i < data.length; i++) {
            sumMonney += data[i].TOTAL_MONEY;
        }
        return sumMonney;

    }
    allData3 = () => {
        const { data } = this.state;
        var sumOrder = 0;
        var sumMonney = 0;
        var sumCommitsion = 0;
        var sumTT = 0;


        for (let i = 0; i < data.length; i++) {
            sumCommitsion += data[i].TOTAL_COMMISSION;
        }
        return sumCommitsion;

    }
    allData4 = () => {
        const { data } = this.state;
        var sumTT = 0;


        for (let i = 0; i < data.length; i++) {
            sumTT += data[i].TOTAL_TT;
        }
        return sumTT;

    }
    componentDidMount() {
        this.handLoad();
    }
    render() {
        const { selectYear, selectMonth, data } = this.state;
        return (
            <View >
                <View>
                    <View style={styles.container}>
                        <Text>Năm</Text>
                        <View
                            style={{

                                // The solution: Apply zIndex to any device except Android
                                ...(Platform.OS !== 'android' && {
                                    zIndex: 10
                                })

                            }}
                        >
                            <DropDownPicker
                                items={[
                                    { label:'2021',value:'2021'},
                                    { label: '2020', value: '2020' },
                                    { label: '2019', value: '2019' }
                                ]}
                                defaultValue={selectYear}
                                placeholder="Chọn năm"
                                containerStyle={{ height: 40 }}
                                style={{ backgroundColor: '#fafafa', width: sizeWidth(30), borderColor: '#4a8939', borderWidth: 1 }}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{ backgroundColor: '#fafafa', width: sizeWidth(30) }}
                                onChangeItem={item => this.setState({
                                    selectYear: item.value
                                }, () => { this.handLoad() })}
                            />
                        </View>
                        <Text>Tháng</Text>
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
                                defaultValue={selectMonth}
                                placeholder=""
                                containerStyle={{ height: 40 }}
                                style={{ backgroundColor: '#fafafa', width: sizeWidth(30), borderColor: '#4a8939', borderWidth: 1 }}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{ backgroundColor: '#fafafa', width: sizeWidth(30) }}
                                onChangeItem={item => this.setState({
                                    selectMonth: item.value
                                }, () => { this.handLoad() })}
                            />
                        </View>
                    </View>
                </View>
                <View style={{zIndex:-100}}>
                    <ScrollView horizontal={true}>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={[styles.mainUser, styles.custom, styles.customTop]}>
                                <View style={[styles.row2, styles.row21]}>
                                    <Text style={{ color: '#fff' }}>Ngày</Text>
                                </View>
                                <View style={[styles.row3, styles.row21]}>
                                    <Text style={{ color: '#fff' }}>Số lượng ĐH</Text>
                                </View>
                                <View style={[styles.row4, styles.row21]}>
                                    <Text style={{ color: '#fff' }}>Tổng doanh số</Text>
                                </View>
                                <View style={[styles.row5, styles.row21]}>
                                    <Text style={{ color: '#fff' }}>Hoa hồng</Text>
                                </View>
                                <View style={[styles.row7, styles.row21]}>
                                    <Text style={{ color: '#fff' }}>Phụ phí</Text>
                                </View>
                                <View style={[styles.row6, styles.row21]}>
                                    <Text style={{ color: '#fff' }}>Thực thu</Text>
                                </View>
                            </View>
                            {data.length!=0?<View>
                                {data.map((val, key) => {
                                    return (
                                        <View style={[styles.mainUser, styles.custom]}>
                                            <View style={[styles.row2, styles.row22]}>
                                                <Text style={{ color: '#000' }}>{val.DAY}</Text>
                                            </View>
                                            <View style={[styles.row3, styles.row22]}>
                                                <Text style={{ color: '#000' }}>{val.TOTAL_ORDER}</Text>
                                            </View>
                                            <View style={[styles.row4, styles.row22]}>
                                                <Text style={{ color: '#000' }}>{numeral(val.TOTAL_MONEY).format("0,0")}</Text>
                                            </View>
                                            <View style={[styles.row5, styles.row22]}>
                                                <Text style={{ color: '#000' }}>{numeral(val.TOTAL_COMMISSION).format("0,0")}</Text>
                                            </View>
                                            <View style={[styles.row7, styles.row22]}>
                                                <Text style={{ color: '#000' }}>{ }</Text>
                                            </View>
                                            <View style={[styles.row6, styles.row22]}>
                                                <Text style={{ color: '#000' }}>{numeral(val.TOTAL_TT).format("0,0")}</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>:<View style={{height:sizeHeight(20),justifyContent:'center',alignItems:'center'}}><Text style={{color:'gray'}}>Không có dữ liệu</Text></View>}
                            <View style={[styles.mainUser, styles.custom, styles.customTop]}>
                                <View style={[styles.row2, styles.row23]}>
                                    <Text style={{ color: '#fff' }}>Tổng</Text>
                                </View>
                                <View style={[styles.row3, styles.row23]}>
                                    <Text style={{ color: '#fff' }}>{this.allData()}</Text>
                                </View>
                                <View style={[styles.row4, styles.row23]}>
                                    <Text style={{ color: '#fff' }}>{numeral(this.allData1()).format("0,0")}</Text>
                                </View>
                                <View style={[styles.row5, styles.row23]}>
                                    <Text style={{ color: '#fff' }}>{numeral(this.allData3()).format("0,0")}</Text>
                                </View>
                                <View style={[styles.row7, styles.row23]}>
                                    <Text style={{ color: '#fff' }}>{ }</Text>
                                </View>
                                <View style={[styles.row6, styles.row23]}>
                                    <Text style={{ color: '#fff' }}>{numeral(this.allData4()).format("0,0")}</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
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
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
    },
    mainUser: {
        flexDirection: 'row',
    },
    row1: {
        paddingTop: sizeHeight(1),
        height: sizeHeight(5),
        textAlign: 'center',
        width: sizeWidth(12),
        borderRightColor: 'gray',
        borderRightWidth: 10,
    },
    row2: {
        paddingTop: sizeHeight(1),
        textAlign: 'center',
        width: sizeWidth(20),
        borderRightColor: 'gray',
        borderRightWidth: 1,
        height: sizeHeight(5),
    },
    row3: {
        paddingTop: sizeHeight(1),
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: 'gray',
        borderRightWidth: 1,
    },
    row4: {
        paddingTop: sizeHeight(1),
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: 'gray',
        borderRightWidth: 1,
    },
    row5: {
        paddingTop: sizeHeight(1),
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: 'gray',
        borderRightWidth: 1,
    },
    row6: {
        paddingTop: sizeHeight(1),
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: 'gray',
        borderRightWidth: 1,
    },
    row7: {
        paddingTop: sizeHeight(1),
        textAlign: 'center',
        width: sizeWidth(20),
        borderRightColor: 'gray',
        borderRightWidth: 1,
    },
    customTop: {
        borderTopColor: 'gray',
        borderTopWidth: 1,
    },
    custom: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,

    },
    row21: {
        color: '#fff',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    row22: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    row23: {
        color: '#fff',
        backgroundColor: '#4a8939',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default connect(
    mapStateToProps,
    null
)(ReportDay);