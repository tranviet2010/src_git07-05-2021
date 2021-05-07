import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, ScrollView, RefreshControl } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { sizeHeight, sizeWidth } from '../../../../../utils/helper/size.helper';
import { connect } from 'react-redux';
import {ReportItem} from "../../../../../service/account";
var numeral = require("numeral");
class ReportList extends Component {
    constructor(props){
        super(props)
        this.state={
            data:[],
        }
    }
    componentDidMount() {
        ReportItem({
            USERNAME:this.props.username,
            START_TIME:this.props.startTime,
            END_TIME:this.props.endTime,
            REPORT_TYPE:String(this.props.item),
            CODE_PRODUCT:'',
            PAGE:1, 
            NUMOFPAGE:10,
            IDSHOP:"F6LKFY"
        })
            .then((result) => {
                console.log("this is ReportItem",result);
                this.setState({
                    data:result.data.INFO
                })
            }).catch((err)=>{
                console.log("errrro",err)
            })
    }
    render() {
        const { navigation } = this.props;
        const {startTime,endTime}=this.props;
        const {data}=this.state;
        console.log(this.props.item)
        return (
            <View >
                <ScrollView horizontal={true}>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={[styles.mainUser, styles.custom, styles.customTop]}>
                            <Text style={styles.row1}>Mã SP</Text>
                            <Text style={styles.row2}>Số lượng ĐH</Text>
                            <Text style={styles.row4}>Sản lượng</Text>
                            <Text style={styles.row5}>Tổng doanh số</Text>
                        </View>
                        <View>
                            {data.map((val, key) => {
                                return (
                                    <View style={[styles.mainUser, styles.custom]}>
                                        <Text style={styles.row1}>{val.CODE_PRODUCT}</Text>
                                        <Text style={styles.row2}>{val.TOTAL_ORDER}</Text>
                                        <Text style={styles.row4}>{numeral(val.TOTAL_QUANTITY).format("0,0")}</Text>
                                        <Text style={styles.row5}>{numeral(val.TOTAL_REVENUE).format("0,0")}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
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
    mainUser:{
        flexDirection:'row',
    },
    row1:{
        height:sizeHeight(5),
        paddingTop:sizeHeight(1),
        textAlign:'center',
        width:sizeWidth(30),
        borderRightColor:'#4d7335', 
        borderRightWidth:1,
    },
    row2:{
        textAlign:'center',
        paddingTop:sizeHeight(1),
        width:sizeWidth(30),
        borderRightColor:'#4d7335',
        borderRightWidth:1,
    },
    row3:{
        textAlign:'center',
        paddingTop:sizeHeight(1),
        width:sizeWidth(30),
        borderRightColor:'#4d7335',
        borderRightWidth:1,
    },
    row4:{
        textAlign:'center',
        paddingTop:sizeHeight(1),
        width:sizeWidth(30),
        borderRightColor:'#4d7335',
        borderRightWidth:1,
    },
    row5:{
        textAlign:'center',
        paddingTop:sizeHeight(1),
        width:sizeWidth(30),
        borderRightColor:'#4d7335',
        borderRightWidth:1,
    },
    row6:{
        textAlign:'center',
        paddingTop:sizeHeight(1),
        width:sizeWidth(30),
        borderRightColor:'#4d7335',
        borderRightWidth:1,
    },
    row7:{
        textAlign:'center',
        paddingTop:sizeHeight(1),
        width:sizeWidth(20),
        borderRightColor:'#4d7335',
        borderRightWidth:1,
    },
    custom:{
        borderBottomColor:'#4d7335',
        borderBottomWidth:1,
        
    },
    customTop:{
        borderTopColor:'#4d7335',
        borderTopWidth:1,
    }
})

export default connect(
    mapStateToProps,
    null
)(ReportList);
