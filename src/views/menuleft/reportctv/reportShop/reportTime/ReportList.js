import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, ScrollView, RefreshControl } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { sizeHeight, sizeWidth } from '../../../../../utils/helper/size.helper';
import { connect } from 'react-redux';
import { ReportItem } from "../../../../../service/account";
import ReportChart from "./ReportChart";
var numeral = require("numeral");
class ReportList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            load: true,
            color1: '#F5F5F5',
            color2: '#4d7335',
        }
    }
    componentDidMount() {
        ReportItem({
            USERNAME: this.props.username,
            START_TIME: this.props.startTime,
            END_TIME: this.props.endTime,
            REPORT_TYPE: String(this.props.item),
            CODE_PRODUCT: '',
            PAGE: 1,
            NUMOFPAGE: 10,
            IDSHOP: "F6LKFY"
        })
            .then((result) => {
                console.log("this is ReportItem", result);
                this.setState({
                    data: result.data.INFO
                })
            }).catch((err) => {
                console.log("errrro", err)
            })
    }
    render() {
        const { navigation } = this.props;
        const { startTime, endTime } = this.props;
        const { data, load, color1, color2 } = this.state;
        const color = load ? '#4d7335' : '#F5F5F5';
        const color3 = load ? '#F5F5F5' : '#4d7335';
        const colorText1 = load ? 'white' : 'black';
        const colorText2 = load ? 'black' : 'white';
        return (
            <View >
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
                    <View>
                        <TouchableOpacity
                            style={{ width: sizeWidth(48), height: sizeHeight(7), borderColor: '#4d7335', borderWidth: 2, justifyContent: 'center', backgroundColor: `${color}` }}
                            onPress={() => this.setState({
                                load: true,
                            })}
                        >
                            <Text style={{ textAlign: 'center', color: `${colorText1}` }}>Hiển thị dạng bảng</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={{ width: sizeWidth(48), height: sizeHeight(7), borderColor: '#4d7335', borderWidth: 2, justifyContent: 'center', backgroundColor: `${color3}` }}
                            onPress={() => this.setState({
                                load: false,
                            })}
                        >
                            <Text style={{ textAlign: 'center', color: `${colorText2}` }}>Hiển thị dạng biểu đồ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {load ? <View><ScrollView horizontal={true}>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={[styles.mainUser, styles.custom, styles.customTop]}>
                            <Text style={styles.row1}>Tên nhóm SP</Text>
                            <Text style={styles.row2}>Số lượng ĐH</Text>
                            <Text style={styles.row4}>Sản lượng</Text>
                            <Text style={styles.row5}>Tổng doanh số</Text>
                        </View>
                        <View>
                            {data.map((val, key) => {
                                return (
                                    <View style={[styles.mainUser, styles.custom]}>
                                        <Text style={styles.row1}>{val.NAME}</Text>
                                        <Text style={styles.row2}>{val.TOTAL_ORDER}</Text>
                                        <Text style={styles.row4}>{numeral(val.TOTAL_QUANTITY).format("0,0")}</Text>
                                        <Text style={styles.row5}>{numeral(val.TOTAL_REVENUE).format("0,0")}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                </ScrollView></View> : <ReportChart data={data} />}
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
    },
    row1: {
        height: sizeHeight(5),
        paddingTop: sizeHeight(1),
        textAlign: 'center',
        width: sizeWidth(35),
        borderRightColor: '#4d7335',
        borderRightWidth: 1,
    },
    row2: {
        paddingTop: sizeHeight(1),
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: '#4d7335',
        borderRightWidth: 1,
    },
    row3: {
        paddingTop: sizeHeight(1),
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: '#4d7335',
        borderRightWidth: 1,
    },
    row4: {
        paddingTop: sizeHeight(1),
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: '#4d7335',
        borderRightWidth: 1,
    },
    row5: {
        paddingTop: sizeHeight(1),
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: '#4d7335',
        borderRightWidth: 1,
    },
    row6: {
        paddingTop: sizeHeight(1),
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: '#4d7335',
        borderRightWidth: 1,
    },
    row7: {
        paddingTop: sizeHeight(1),
        textAlign: 'center',
        width: sizeWidth(20),
        borderRightColor: '#4d7335',
        borderRightWidth: 1,
    },
    custom: {
        borderBottomColor: '#4d7335',
        borderBottomWidth: 1,

    },
    customTop: {
        borderTopColor: '#BFC4C4',
        borderTopWidth: 1,
    }
})

export default connect(
    mapStateToProps,
    null
)(ReportList);
