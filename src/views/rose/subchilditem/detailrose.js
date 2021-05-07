
import React, { Component, PureComponent } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Picker,
    TextInput,
    Image,
    Alert
} from "react-native";
import { _retrieveData } from "../../../utils/asynStorage";
import _ from "lodash";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { withDrawal } from "../../../service/auth";
import DropDownPicker from 'react-native-dropdown-picker';

import {
    sizeFont,
    sizeHeight,
    sizeWidth,
} from "../../../utils/helper/size.helper";
import { COLOR } from "../../../utils/color/colors";
import { connect } from "react-redux";
import { GetwithdrawalCTV } from "../../../service/rose";
import { TouchableOpacity } from "react-native-gesture-handler";
var numeral = require("numeral");
import moment from "moment";


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
    onPrice = (num) => {
        this.setState({
            momney: numeral(num).format("0,0")
        })
    }

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
    handleLoad = async () => {
        await GetwithdrawalCTV({
            USERNAME: this.props.username,
            STATUS: '',
            START_TIME: this.state.startTime,
            END_TIME: this.state.endTime,
            IS_PROCESS: this.state.selectedValue,
            PAGE: 1,
            NUMOFPAGE: 100,
            IDSHOP: 'F6LKFY'
        }).then((res) => {
            console.log("hey zo", res);
            this.setState({
                data_tt: res.data.INFO
            })
        })
            .catch((err) => { })
    }
    componentDidMount() {
        this.handleLoad();
    }
    render() {
        const {
            status,
            authUser,
            username,
        } = this.props;
        const { monney } = this.state;
        const { data_tt, selectedValue } = this.state;
        return (
            <View style={{ backgroundColor: '#fff', marginBottom: sizeHeight(35) }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>
                    <View>
                        <TextInput
                            placeholder="Nhập số tiền"
                            keyboardType='numeric'
                            onChangeText={(text) => { this.setState({ monney: text }) }}
                            style={{ width: sizeWidth(85), height: sizeHeight(5), borderColor: 'gray', borderWidth: 1, paddingLeft: 10 }}
                        />
                        <Text style={{ color: 'red', position: 'absolute', top: 0, right: 2 }}>*</Text>
                    </View>
                    {/* <View>
                        <TextInput
                            placeholder="Nhập nội dung"
                            onChangeText={(text) => { this.setState({ monney: text }) }}
                            style={{ width: sizeWidth(55), height: sizeHeight(5), borderColor: 'gray', borderWidth: 1, paddingLeft: 10 }}
                        />
                        <Text style={{ color: 'red', position: 'absolute', top: 0, right: 2 }}>*</Text>
                    </View> */}
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ loading: true }, async () => {
                                await withDrawal({
                                    USERNAME: username,
                                    AMOUNT: monney,
                                    IDSHOP: 'F6LKFY',
                                })
                                    .then((res) => {
                                        console.log("hisssssssss", res)
                                        Alert.alert('Thông báo', `${res.data.RESULT}`)

                                    })
                                    .catch((err) => {
                                        Alert.alert('Thông báo', `${res.data.RESULT}`)
                                    });
                                this.setState({ loading: false });
                            });
                        }}
                    >
                        <Image
                            source={require('../../../assets/images/loc.png')}
                            style={{ width: 30, height: 30 }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ color: 'red', fontStyle: 'italic', paddingBottom: 10, fontSize: 13 }}>Lưu ý: số tiền nhập không lớn hơn số dư hoa hồng hiện tại tổng số hoa hồng chờ duyệt</Text>
                </View>
                <View style={{ width: sizeWidth(100), height: sizeHeight(4), backgroundColor: '#CECCCD', justifyContent: 'center', paddingLeft: 10 }}>
                    <Text>Lịch sử yêu cầu</Text>
                </View>
                <View>
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
                                            zIndex: 10
                                        })

                                    }}
                                >
                                    <DropDownPicker
                                        items={[
                                            { label: 'Tất cả', value: '' },
                                            { label: 'Chờ xử lý', value: '0' },
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
                </View>
                <ScrollView style={{ zIndex: -1 }}>
                    {data_tt && data_tt.length == 0 ? <View style={{ height: sizeHeight(30), flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: -1 }}>
                        <Text style={{ color: '#A3A2A2', justifyContent: 'center' }}>Không có dữ liệu</Text>
                    </View> : <View>{data_tt && data_tt.map((val) => (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopColor: 'gray', borderTopWidth: 1, padding: 10,borderBottomColor:'gray',borderBottomWidth:1 }}>
                            <View >
                                <Text style={{ lineHeight: 20 }}>{val.UPDATE_TIME}</Text>
                                <Text style={{ lineHeight: 20 }}>Số tiền yêu cầu: <Text style={{ color: 'red' }}>{numeral(val.AMOUNT).format("0,0")} vnđ</Text></Text>
                                {val.STATUS == 1 ? <Text style={{ lineHeight: 20 }}>Số tiền shop thanh toán: <Text style={{ color: '#149CC6' }}>{numeral(val.AMOUNT_PROCESS).format("0,0")} vnđ</Text></Text> : null}
                    <Text style={{ lineHeight: 20 }}>{val.STATUS == 1 || val.STATUS == 0 ?'Lí do: ':null} <Text style={{ lineHeight: 20, color: 'red', fontStyle: 'italic' }}>{val.COMMENTS}</Text></Text>
                            </View>
                            <View>
                                <View>{val.STATUS == 1 ? <View style={{ backgroundColor: '#149CC6', width: sizeWidth(25), height: sizeHeight(3), justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff' }}>Đồng ý</Text></View> :
                                    <View>{val.STATUS == null ?
                                        <View style={{ backgroundColor: '#4a8939', width: sizeWidth(25), height: sizeHeight(3), justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff' }}>Đang xử lí</Text></View> :
                                        <View style={{ backgroundColor: 'red', width: sizeWidth(25), height: sizeHeight(3), justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff' }}>Từ chối</Text></View>}</View>}</View>
                            </View>
                        </View>
                    ))}</View>}
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
        zIndex: 1000,
    },
    container: {
        flexDirection: 'row',
        borderWidth: 2,
        borderBottomWidth: 0,
        borderColor: '#149CC6',
    },
    children: {
        borderRightColor: '#149CC6',
        borderRightWidth: 2,
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
    }, confix: {
        width: sizeWidth(30),
        borderColor: '#4a8939',
        borderWidth: 1,
        borderRadius: 5,
        height: sizeHeight(5),
        justifyContent: 'center',
        alignItems: 'center',

    },
})
