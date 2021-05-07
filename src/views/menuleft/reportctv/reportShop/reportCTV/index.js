import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, ScrollView, RefreshControl, Alert, TextInput } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { sizeHeight, sizeWidth } from '../../../../../utils/helper/size.helper';
import { connect } from 'react-redux';
import { ReportCTVTT } from "../../../../../service/account";
var numeral = require("numeral");
import DropDownPicker from 'react-native-dropdown-picker';
class ReportList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            selectyear: '2020',
            selectmonth: '',
            selectisu: '',
            selectaccout: '',
            search:'',
        }
    }
    handLoad = () => {
        ReportCTVTT({
            USERNAME: this.props.username,
            SEARCH:this.state.search,
            YEAR: this.state.selectyear,
            MONTH: this.state.selectmonth,
            REPORT_TYPE: this.state.selectaccout,
            IDSHOP: 'F6LKFY'
        })
            .then((result) => {
                console.log("this is ReportCTVTT", result);
                if (result.data.ERROR == '0000') {
                    this.setState({
                        data: result.data.INFO
                    })
                } else {
                    this.setState({
                        data: []
                    })
                }
            }).catch((err) => {
                this.setState({
                    data: []
                })
            })
    }
    componentDidMount() {
        this.handLoad();
    }
    render() {
        const { data, selectmonth, selectyear, selectisu, selectaccout } = this.state;
        console.log("state", selectmonth);
        return (
            <View >
                <View>
                    <View style={{ flexDirection: 'row',justifyContent:'center', marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center',width:sizeWidth(45) }}>
                           
                                <Text style={{marginRight: 5 }}>Năm</Text>
                        
                            <View
                                style={{
                                    ...(Platform.OS !== 'android' && {
                                        zIndex: 10
                                    })
                                }}
                            >
                                <DropDownPicker
                                    items={[
                                        { label: '2021', value: '2021' },
                                        { label: '2020', value: '2020' }
                                    ]}
                                    defaultValue={selectyear}
                                    placeholder="2020"
                                    containerStyle={{ height: sizeHeight(5.8) }}
                                    style={{ backgroundColor: '#fafafa', width: sizeWidth(33), borderColor: '#4a8939', borderWidth: 1 }}
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    dropDownStyle={{ backgroundColor: '#fafafa', width: sizeWidth(33) }}
                                    onChangeItem={item => this.setState({
                                        selectyear: item.value
                                    })}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center',width:sizeWidth(45) }}>
                            <Text style={{marginRight: 5 }}>Tháng</Text>
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
                                    defaultValue={selectmonth}
                                    placeholder="1"
                                    containerStyle={{ height: sizeHeight(5.8) }}
                                    style={{ backgroundColor: '#fafafa', width: sizeWidth(33), borderColor: '#4a8939', borderWidth: 1 }}
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    dropDownStyle={{ backgroundColor: '#fafafa', width: sizeWidth(33) }}
                                    onChangeItem={item => this.setState({
                                        selectmonth: item.value
                                    })}
                                />
                            </View>
                        </View>


                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-evenly', marginTop: 10,zIndex:-1 }}>
                        <View style={{width:sizeWidth(45)}}>
                            <Text>Loại tài khoản</Text>
                        </View>
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
                                    { label: 'Theo CTV', value: '1' },
                                    { label: 'Doanh số', value: '2' }
                                ]}
                                defaultValue={selectaccout}
                                placeholder="Tất cả"
                                containerStyle={{ height: sizeHeight(5.8) }}
                                style={{ backgroundColor: '#fafafa', width: sizeWidth(40), borderColor: '#4a8939', borderWidth: 1 }}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{ backgroundColor: '#fafafa', width: sizeWidth(40) }}
                                onChangeItem={item => this.setState({
                                    selectaccout: item.value
                                })}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center',justifyContent:'space-evenly',marginTop:10,zIndex:-5}}>
                        <View>
                            <TextInput 
                                placeholder="Nhập mã hoặc tên CTV"
                                onChangeText={(text)=>{this.setState({search:text})}}
                                style={{borderColor:'#4a8939',paddingLeft:15,borderWidth:1,width:sizeWidth(60),borderRadius:50,height:sizeHeight(5)}}
                            />
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={()=>{this.handLoad()}}
                                style={{justifyContent:'center',alignItems:'center',width:sizeWidth(20),height:sizeHeight(5),backgroundColor:'#149CC6'}}
                            >
                                <Text style={{color:'#fff'}}>Tìm kiếm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', margin: 15 }}>



                    </View>
                </View>
                <View style={{ height: 5, backgroundColor: '#4a8939', marginBottom: 15, zIndex: -1 }}></View>
                <ScrollView horizontal={true} style={{ zIndex: -1 }}>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={[styles.mainUser, styles.custom, styles.customTop]}>
                            <View style={[styles.row2, styles.row21]}>
                                <Text style={{color:'#fff'}}>Tên CTV</Text>
                            </View>
                            <View style={[styles.row3, styles.row21]}>
                                <Text style={{color:'#fff'}}>Mã CTV</Text>
                            </View>
                            <View style={[styles.row4, styles.row21]}>
                                <Text style={{color:'#fff'}}>Số ĐH</Text>
                            </View>
                            <View style={[styles.row5, styles.row21]}>
                                <Text style={{color:'#fff'}}>Doanh số</Text>
                            </View>
                            <View style={[styles.row6, styles.row21]}>
                                <Text style={{color:'#fff'}}>Hoa hồng</Text>
                            </View>



                        </View>
                        <View>
                            {data.map((val, key) => {
                                return (
                                    <View style={[styles.mainUser, styles.custom]}>
                                        <View style={styles.row2}>
                                            <Text >{val.FULL_NAME}</Text>
                                        </View>
                                        <View style={styles.row3}>
                                            <Text >{val.USER_CODE}</Text>
                                        </View>
                                        <View style={styles.row4}>
                                            <Text >{val.SUM_ORDER}</Text>
                                        </View>
                                        <View style={styles.row5}>
                                            <Text >{numeral(val.SUM_MONEY).format("0,0")}</Text>
                                        </View>
                                        <View style={styles.row6}>
                                            <Text>{numeral(val.SUM_COMMISSION).format("0,0")}</Text>
                                        </View>






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
    mainUser: {
        flexDirection: 'row',
    },
    row1: {
        textAlign: 'center',
        height: sizeHeight(5),
        width: sizeWidth(10),
        borderRightColor: '#4a8939',
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    row2: {
        textAlign: 'center',
        width: sizeWidth(40),
        borderRightColor: '#4a8939',
        borderRightWidth: 1,
        height: sizeHeight(5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    row3: {
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: '#4a8939',
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    row4: {
        textAlign: 'center',
        width: sizeWidth(13),
        borderRightColor: '#4a8939',
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    row5: {
        textAlign: 'left',
        paddingLeft: sizeWidth(5.5),
        width: sizeWidth(30),
        borderRightColor: '#4a8939',
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    row6: {
        textAlign: 'left',
        paddingLeft: sizeWidth(5.5),
        width: sizeWidth(30),
        borderRightColor: '#4a8939',
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    row7: {
        textAlign: 'center',
        width: sizeWidth(20),
        borderRightColor: '#4a8939',
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    custom: {
        borderBottomColor: '#4a8939',
        borderBottomWidth: 1,

    },
    customTop: {
        borderTopColor: '#4a8939',
        borderTopWidth: 1,
    },
    row21: {
        backgroundColor: '#000',
    }
})

export default connect(
    mapStateToProps,
    null
)(ReportList);