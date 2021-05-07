import React, { Component, PureComponent } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Picker,
    TouchableOpacity
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { _retrieveData } from "../../../utils/asynStorage";
import _ from "lodash";
import { DataTable } from 'react-native-paper';
import Header from "../../rose/header/index";
import DropDownPicker from 'react-native-dropdown-picker';
import CtvSub from "../subchilditem/ctvsub";
var numeral = require("numeral");
import moment from "moment";
import {
    sizeFont,
    sizeHeight,
    sizeWidth,
} from "../../../utils/helper/size.helper";
import { COLOR } from "../../../utils/color/colors";
import { connect } from "react-redux";
import { handleMoney } from "../../../components/money";
import { GetwithdrawalCTV } from "../../../service/rose";
var numeral = require("numeral");

class getwithdawal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_tt: [],
            selectedValue: 'CHƯA XỬ LÝ',
            monney: '',
            content: '',
            inDateEndPicker: false,
            startTime: moment()
                .add(-60, "day")
                .format("DD/MM/YYYY"),
            endTime: moment(new Date()).format("DD/MM/YYYY"),
            selectedValue: '',
            loading: false,
        };
    }
    handleLoad = async () => {
        await GetwithdrawalCTV({
            USERNAME: this.props.username,
            STATUS: '',
            START_TIME:this.state.startTime,
            END_TIME:this.state.endTime,
            IS_PROCESS: this.state.selectedValue,
            PAGE: 1,
            NUMOFPAGE: 100,
            IDSHOP: 'F6LKFY'
        }).then((res) => {
            this.setState({
                data_tt: res.data.INFO
            })
        })
            .catch((err) => { })
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
        var d1 = new Date();
        if (date.getTime() > d1.getTime()) {
            Alert.alert("Thông báo", "Thời gian không hợp lệ, mời nhập lại");
        } else {
            this.setState({
                startTime: moment(date).format("DD/MM/YYYY")
            })
        }
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
        var date1 = this.state.startTime;
        var d = new Date(date1.split("/").reverse().join("-"));
        var dd = d.getDate();
        var mm = d.getMonth() + 1;
        var yy = d.getFullYear();
        var all = yy + "-" + mm + "-" + dd;

        // console.log("this is all",date)
        var d1 = new Date(all);

        var d0 = d1.getTime();
        var d2 = date.getTime();

        console.log(d0);
        console.log(d2);
        if (d2 < d0) {
            Alert.alert("Thông báo", "Thời gian không hợp lệ, mời nhập lại")
        } else if (d2 - d0 < 5184000) {
            Alert.alert("Thông báo", "Thời gian không được quá 60 ngày, mời nhập lại")
        }
        else {
            this.setState({
                endTime: moment(date).format("DD/MM/YYYY")
            })

        }
        this.hideDatePicker2();
    };
    componentDidMount() {
        this.handleLoad();
    }
    render() {
        const {
            status,
            authUser,
            username,
        } = this.props;
        const { data_tt, selectedValue, startTime, endTime } = this.state;

        return (
            <View>
                <View>
                    <View>
                        {/* <View>
                            <Text>Vui lòng chọn trạng thái</Text>
                        </View> */}
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 15 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 12, marginRight: 5 }}>Bắt đầu</Text>
                                    <View style={styles.confix}>
                                        <TouchableOpacity
                                            onPress={this.showDatePicker1}
                                        >

                                            <Text style={{ fontSize: 12 }}>{this.state.startTime}</Text>
                                        </TouchableOpacity>

                                        <DateTimePickerModal
                                            isVisible={this.state.isDatePickerVisible}
                                            mode="date"
                                            onConfirm={this.handleConfirm1}
                                            onCancel={this.hideDatePicker1}
                                        />
                                    </View>
                                </View>


                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 12, marginRight: 5 }}>Kết thúc</Text>
                                    <View style={styles.confix}>
                                        <TouchableOpacity
                                            onPress={this.showDatePicker2}
                                        >

                                            <Text style={{ fontSize: 12 }}>{this.state.endTime}</Text>
                                        </TouchableOpacity>
                                        <DateTimePickerModal
                                            isVisible={this.state.inDateEndPicker}
                                            mode="date"
                                            onConfirm={this.handleConfirm2}
                                            onCancel={this.hideDatePicker2}
                                        />
                                    </View>
                                </View>


                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10, justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ marginRight: 5 }}>Trạng thái</Text>
                                    <View
                                        style={{

                                            // The solution: Apply zIndex to any device except Android
                                            ...(Platform.OS !== 'android' && {
                                                zIndex: 100
                                            })

                                        }}
                                    >
                                        <DropDownPicker
                                            items={[
                                                { label: 'Tất cả', value: '' },
                                                { label: 'Đang xử lý', value: '0' },
                                                { label: 'Đã xử lý', value: '1' },

                                            ]}
                                            defaultValue={selectedValue}
                                            placeholder="Tất cả"
                                            containerStyle={{ height: sizeHeight(5.7) }}
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
                                </View>
                                <View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.handleLoad();

                                        }}
                                        style={{ width: sizeWidth(30), height: sizeHeight(5), backgroundColor: COLOR.HEADER, justifyContent: 'center', alignItems: 'center' }}
                                    >
                                        <Text style={{ color: '#fff' }}>Tìm kiếm</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.container1}>
                            <View style={[styles.cuttoms, styles.children1]}>
                                <Text style={{ color: 'white' }}>Nội dung</Text>
                            </View>
                            <View style={styles.cuttoms}>
                                <Text style={{ color: 'white' }}>Trạng thái</Text>
                            </View>
                        </View>
                        <ScrollView style={{ marginTop: sizeHeight(0), height: sizeHeight(100),borderColor: '#149CC6', borderTopColor: '#fff', borderWidth: 1, zIndex: -2 }}>
                            <View style={{marginBottom:sizeHeight(40)}}>
                                {data_tt.length != 0 && data_tt.map((Val, key) => (
                                    <View style={{borderBottomColor:'#149CC6',borderBottomWidth:1}}>
                                        <View style={styles.container}>
                                            <View style={styles.children}>
                                                <Text >CTV: {Val.FULL_NAME}</Text>
                                                <Text >Thời gian: {Val.UPDATE_TIME}</Text>
                                                <Text >Số dư lúc yêu cầu: {numeral(Val.BALANCE).format("0,0")} đ</Text>
                                                <Text>Yêu cầu rút: <Text style={{ color: 'red', fontWeight: 'bold' }}>{numeral(Val.AMOUNT).format("0,0")} đ</Text></Text>
                                            </View>
                                            <View style={styles.children2}>
                                                <View>{Val.STATUS == 1 ? <View style={{ backgroundColor: '#149CC6', width: sizeWidth(25), height: sizeHeight(3), justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff' }}>Đồng ý</Text></View> :
                                                    <View>{Val.STATUS == null ?
                                                        <View style={{ backgroundColor: '#4a8939', width: sizeWidth(25), height: sizeHeight(3), justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff' }}>Đang xử lí</Text></View> :
                                                        <View style={{ backgroundColor: 'red', width: sizeWidth(25), height: sizeHeight(3), justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff' }}>Từ chối</Text></View>}</View>}</View>
                                            </View>

                                        </View>
                                    </View>
                                ))}

                            </View>

                        </ScrollView>
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

const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(getwithdawal);


const styles = StyleSheet.create({
    container1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: -100,
    },
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: '#149CC6',
    },
    children: {
        borderRightColor: '#149CC6',
        borderRightWidth: 1,
        padding: 7,
        width: sizeWidth(60),

    },
    children1: {
        width: sizeWidth(60.5),
        justifyContent: 'space-around',

    },
    children2: {
        width: sizeWidth(40),
        alignItems: 'center',
        justifyContent: 'center',
    },
    cuttoms: {
        marginTop: 5,
        padding: 10,
        backgroundColor: "#4a8939",
        alignItems: 'center',
        width: sizeWidth(39.5),
    },
    confix: {
        width: sizeWidth(30),
        borderColor: '#4a8939',
        borderWidth: 1,
        borderRadius: 5,
        height: sizeHeight(5),
        justifyContent: 'center',
        alignItems: 'center',

    },
})