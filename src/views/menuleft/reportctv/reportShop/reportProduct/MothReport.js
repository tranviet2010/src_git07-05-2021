import React, { Component } from 'react'
import {
    StyleSheet, Text, View, TouchableOpacity,
    Image, Picker, ScrollView, RefreshControl
} from 'react-native'
import { sizeHeight, sizeWidth } from '../../../../../utils/helper/size.helper';
import { connect } from 'react-redux';
import { ReportFluc } from "../../../../../service/account";
var numeral = require("numeral");
class MothReport extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedValue: '',
            isselectedValue: '',
            data: [],
        }
    }
    componentDidMount() {
        ReportFluc({
            USERNAME: this.props.username,
            YEAR: '2020',
            MONTH: '10',
            PR_CODE: '',
            REPORT_TYPE: '1',
            DISPLAY_TYPE: '1',
            IDSHOP: "F6LKFY"
        })
            .then((result) => {
                console.log("this is ReportFluc", result);
                this.setState({
                    data: result.data.INFO
                })
            }).catch((err) => {
                console.log("errrro", err)
            })
    }
    render() {
        const { selectedValue, isselectedValue, data } = this.state;
        return (
            <ScrollView style={{padding:10}}>
                <View>
                    <Text style={{fontWeight:'bold'}}>Số lượng đơn hàng</Text>
                    <View>
                        <ScrollView horizontal={true}>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={[styles.mainUser, styles.custom, styles.customTop]}>
                                    <Text style={styles.row1}>Tháng</Text>
                                    <Text style={styles.row2}>Tên</Text>
                                    <Text style={styles.row3}>Số đơn</Text>
                                    <Text style={styles.row4}>Số lượng</Text>
                                    <Text style={styles.row5}>Doanh thu</Text>
                                </View>
                                <View>
                                    {data.map((val, key) => {
                                        return (
                                            <View style={[styles.mainUser, styles.custom]}>
                                                <Text style={styles.row1}>{val.MONTH}</Text>
                                                <Text style={styles.row2}>{val.NAME}</Text>
                                                <Text style={styles.row3}>{val.TOTAL_ORDER}</Text>
                                                <Text style={styles.row4}>{val.TOTAL_QUANTITY}</Text>
                                                <Text style={styles.row5}>{val.TOTAL_REVENUE}</Text>
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>

                {/* <View>
                    <Text style={{fontWeight:'bold'}}>Số lượng sản phẩm</Text>
                    <View>
                        <ScrollView horizontal={true}>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={[styles.mainUser, styles.custom, styles.customTop]}>
                                    <Text style={styles.row1}>Tháng</Text>
                                    <Text style={styles.row2}>Tên</Text>
                                    <Text style={styles.row3}>Số lượng</Text>
                                </View>
                                <View>
                                    {data.map((val, key) => {
                                        return (
                                            <View style={[styles.mainUser, styles.custom]}>
                                                <Text style={styles.row1}>{val.MONTH}</Text>
                                                <Text style={styles.row2}>{val.NAME}</Text>
                                                <Text style={styles.row3}>{val.TOTAL_QUANTITY}</Text>
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>

                <View style={{marginBottom:20}}>
                    <Text style={{fontWeight:'bold'}}>Số lượng doanh thu </Text>
                    <View>
                        <ScrollView horizontal={true}>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={[styles.mainUser, styles.custom, styles.customTop]}>
                                    <Text style={styles.row1}>Tháng</Text>
                                    <Text style={styles.row2}>Tên</Text>
                                    <Text style={styles.row3}>Doanh thu</Text>
                                </View>
                                <View>
                                    {data.map((val, key) => {
                                        return (
                                            <View style={[styles.mainUser, styles.custom]}>
                                                <Text style={styles.row1}>{val.MONTH}</Text>
                                                <Text style={styles.row2}>{val.NAME}</Text>
                                                <Text style={styles.row3}>{val.TOTAL_REVENUE}</Text>
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View> */}
            </ScrollView>

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
        borderLeftColor: '#BFC4C4',
        borderLeftWidth: 1,
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: '#BFC4C4',
        borderRightWidth: 1,
    },
    row2: {
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: '#BFC4C4',
        borderRightWidth: 1,
    },
    row3: {
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: '#BFC4C4',
        borderRightWidth: 1,
    },
    row4: {
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: '#BFC4C4',
        borderRightWidth: 1,
    },
    row5: {
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: '#BFC4C4',
        borderRightWidth: 1,
    },
    row6: {
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: '#BFC4C4',
        borderRightWidth: 1,
    },
    row7: {
        textAlign: 'center',
        width: sizeWidth(20),
        borderRightColor: '#BFC4C4',
        borderRightWidth: 1,
    },
    custom: {
        borderBottomColor: '#BFC4C4',
        borderBottomWidth: 1,

    },
    customTop: {
        borderTopColor: '#BFC4C4',
        borderTopWidth: 1,
    },
    container: {
        borderColor: '#4d7335',
        borderWidth: 2,
        borderRadius:10,
        alignItems: "center"
    },
})

export default connect(
    mapStateToProps,
    null
)(MothReport);
