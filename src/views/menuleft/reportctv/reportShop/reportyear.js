import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, ScrollView, RefreshControl } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { sizeFont, sizeHeight, sizeWidth } from '../../../../utils/helper/size.helper';
import { connect } from 'react-redux';
var numeral = require("numeral");
import Loading from '../../../../components/loading';
import { ReportDefault } from "../../../../service/account";
import { DataTable } from 'react-native-paper';
class ReportYear extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loading: 'false',
        }
    }
    handLoad = () => {
        ReportDefault({
            USERNAME: this.props.username,
            YEAR: '',
            MONTH: '',
            REPORT_TYPE: '1',
            IDSHOP: "F6LKFY"
        })
            .then((res) => {
                console.log("yearrr", res);
                this.setState({
                    data: res.data.INFO
                })
            })
    }
    allData = (a) => {
        const { data } = this.state;
        var sumOrder = 0;
        var sumMonney = 0;
        var sumCommitsion = 0;
        var sumTT = 0;


        if(data){
        for (var i = 0; i < data.length; i++) {
                sumOrder = sumOrder + data[i].TOTAL_ORDER;
            }
            return sumOrder;
        }

    }
    allData1 = () => {
        const { data } = this.state;
        var sumOrder = 0;
        var sumMonney = 0;
        var sumCommitsion = 0;
        var sumTT = 0;

        if(data){
        for (let i = 0; i < data.length; i++) {
            sumMonney += data[i].TOTAL_MONEY;
        }
        return sumMonney;
    }

    }
    allData3 = () => {
        const { data } = this.state;
        var sumOrder = 0;
        var sumMonney = 0;
        var sumCommitsion = 0;
        var sumTT = 0;

        if(data){
        for (let i = 0; i < data.length; i++) {
            sumCommitsion += data[i].TOTAL_COMMISSION;
        }
        return sumCommitsion;
    }

    }
    allData4 = () => {
        const { data } = this.state;
        var sumTT = 0;
        if(data){
        for (let i = 0; i < data.length; i++) {
            sumTT += data[i].TOTAL_TT;
        }
        return sumTT;
    }

    }



    componentDidMount() {
        this.handLoad();
    }
    render() {
        const { data } = this.state;
        console.log("this is reportday", this.props.navigation);
        return (
            <View>
                <ScrollView horizontal={true}>
                    <TouchableOpacity
                    onPress={()=>{this.props.navigation.navigate("reportday")}} 
                    >
                        <View style={{ flexDirection: 'column'}}>
                            <View style={[styles.mainUser, styles.custom, styles.customTop]}>
                                <View style={[styles.row2, styles.row21]}>
                                    <Text style={{ color: '#fff' }}>Năm</Text>
                                </View>
                                <View style={[styles.row3, styles.row21]}>
                                    <Text style={{ color: '#fff' }}>Số lượng ĐH</Text>
                                </View>
                                <View style={[styles.row4, styles.row21]}>
                                    <Text style={{ color: '#fff' }}>Doanh số</Text>
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
                            <View>
                                {data && data.map((val, key) => {
                                    return (
                                        <View style={[styles.mainUser, styles.custom]}>
                                            <View style={[styles.row2, styles.row22]}>
                                                <Text style={{ color: '#000',fontSize:12 }}>{val.YEAR}</Text>
                                            </View>
                                            <View style={[styles.row3, styles.row22]}>
                                                <Text style={{ color: '#000',fontSize:12 }}>{val.TOTAL_ORDER}</Text>
                                            </View>
                                            <View style={[styles.row4, styles.row22]}>
                                                <Text style={{ color: '#000',fontSize:12 }}>{numeral(val.TOTAL_MONEY).format("0,0")}</Text>
                                            </View>
                                            <View style={[styles.row5, styles.row22]}>
                                                <Text style={{ color: '#000',fontSize:12 }}>{numeral(val.TOTAL_COMMISSION).format("0,0")}</Text>
                                            </View>
                                            <View style={[styles.row7, styles.row22]}>
                                                <Text style={{ color: '#000',fontSize:12 }}>{ }</Text>
                                            </View>
                                            <View style={[styles.row6, styles.row22]}>
                                                <Text style={{ color: '#000',fontSize:12 }}>{numeral(val.TOTAL_TT).format("0,0")}</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                            <View style={[styles.mainUser, styles.custom, styles.customTop]}>
                                <View style={[styles.row2, styles.row23]}>
                                    <Text style={{ color: '#fff' }}>Tổng</Text>
                                </View>
                                <View style={[styles.row3, styles.row23]}>
                                    <Text style={{ color: '#fff' }}>{this.allData()}</Text>
                                </View>
                                <View style={[styles.row4, styles.row23]}>
                                    <Text style={{ color: '#fff',fontSize:sizeFont(4), }}>{numeral(this.allData1()).format("0,0")}</Text>
                                </View>
                                <View style={[styles.row5, styles.row23]}>
                                    <Text style={{ color: '#fff' }}>{numeral(this.allData3()).format("0,0")}</Text>
                                </View>
                                <View style={[styles.row7, styles.row23]}>
                                    <Text style={{ color: '#fff' }}>{}</Text>
                                </View>
                                <View style={[styles.row6, styles.row23]}>
                                    <Text style={{ color: '#fff' }}>{numeral(this.allData4()).format("0,0")}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
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
        paddingTop: sizeHeight(1),
        height: sizeHeight(5),
        textAlign: 'center',
        width: sizeWidth(10),
        borderRightColor: 'gray',
        borderRightWidth: 1,
    },
    row2: {
        paddingTop: sizeHeight(1),
        width: sizeWidth(15),
        borderRightColor: 'gray',
        borderRightWidth: 1,
        
    },
    row3: {
        paddingTop: sizeHeight(1),
        width: sizeWidth(20),
        borderRightColor: 'gray',
        borderRightWidth: 1,
    },
    row4: {
        paddingTop: sizeHeight(1),
        width: sizeWidth(30),
        borderRightColor: 'gray',
        borderRightWidth: 1,
        textAlign:'center',
    },
    row5: {
        paddingTop: sizeHeight(1),
        textAlign: 'center',
        width: sizeWidth(25),
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
    custom: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,

    },
    customTop: {
        borderTopColor: 'gray',
        borderTopWidth: 1,
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
        flex:1,
    },
    row23: {
        color: '#fff',
        backgroundColor: '#4d7335',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default connect(
    mapStateToProps,
    null
)(ReportYear);
