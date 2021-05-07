import React, { Component } from 'react'
import { StyleSheet, TextInput, Text, View, Image, Button, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { connect } from "react-redux";
import { Getwithdrawal } from "../../../service/rose";
import { withDrawal } from "../../../service/auth";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DataTable } from 'react-native-paper';
import { COLOR } from "../../../utils/color/colors";
import {
    sizeFont,
    sizeHeight,
    sizeWidth,
} from "../../../utils/helper/size.helper";

import moment from "moment";
import Loading from '../../../components/loading';

var numeral = require("numeral");
class ctvsub extends Component {
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
            loading: false,
            momney: ''
        }
    }
    showLogin = () => {
        return Alert.alert(
            "Thông báo",
            `Hãy đăng nhập hoặc ký tài khoản để được mua sản phầm với giá gốc, tham gia bán hàng cùng ${this.props.idshop.SHOP_NAME} và hưởng hoa hồng Cực Sốc`,
            [
                {
                    text: "Để sau",
                    style: "destructive",
                },
                {
                    text: "Đăng nhập",
                    onPress: () => {

                        this.props.navigation.navigate('SignIn')
                    },
                    style: "default",
                },
                {
                    text: "Đăng ký",
                    onPress: () => {

                        this.props.navigation.navigate('SignUp')
                    },
                    style: "default",
                },
            ],
            { cancelable: false }
        );
    };
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
        var dpressent = new Date();
        // console.log("this is all",date)
        var d1 = new Date(all);
        var d0 = d1.getTime();
        var d2 = date.getTime();
        var dpre = dpressent.getTime();

        console.log(d0);
        console.log(d2);
        console.log(dpre);
        if (d2 < d0) {
            return Alert.alert("Thông báo", "Thời gian không hợp lệ, mời nhập lại")
        } else if (d2 - d0 < 5184000) {
            return Alert.alert("Thông báo", "Thời gian không được quá 60 ngày, mời nhập lại")
        } else if (dpre < d2) {
            return Alert.alert("Thông báo", "Bạn đã nhập quá thời gian hiện tại, mời nhập lại")
        }
        else {
            this.setState({
                endTime: moment(date).format("DD/MM/YYYY")
            })

        }
        this.hideDatePicker2();

    };
    handleLoad = async () => {
        await Getwithdrawal({
            USERNAME: this.props.username,
            USER_CTV: this.props.username,
            START_TIME: this.state.startTime,
            END_TIME: this.state.endTime,
            PAGE: 1,
            NUMOFPAGE: 10,
            IDSHOP: 'F6LKFY',
        })
            .then((res) => {
                if (res.data.ERROR == "0000") {
                    this.setState({
                        Data: res.data.INFO
                    })
                } else {
                    this.showLogin();
                }
            })
            .catch((err) => {
            });
    }
    componentDidMount() {
        this.handleLoad();
    }
    render() {
        const { status, username } = this.props;
        const { date1, date2, Data, momney, loading } = this.state;
        console.log("this is data_user", Data);
        return (
            <ScrollView nestedScrollEnabled={true}>
                <View style={{ height: sizeHeight(13), justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: sizeHeight(4.5), width: sizeWidth(100), backgroundColor: "#4a8939", marginTop: 10 }}>
                        <Text style={{ color: '#fff', fontSize: 16 }}>
                            Số dư hoa hồng hiện tại
                </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 10, alignItems: 'center', paddingTop: 10 }}>
                            <Image
                                source={require('../../../assets/images/monney.png')}
                                style={{
                                    height: 40,
                                    width: 40
                                }}
                            />
                            {status === "" ? (<Text style={{ fontSize: 15, color: '#FF5C03', alignItems: 'center', fontWeight: 'bold', paddingLeft: 5 }}>0 đ</Text>) : (
                                <Text style={{ fontSize: 20, color: '#FF5C03', alignItems: 'center', fontWeight: 'bold', paddingLeft: 10, }}>
                                    {Data.length === 0 ? '0' : <Text>{numeral(Data[0].BALANCE).format("0,0")}</Text>}
                                </Text>
                            )}
                        </View>

                    </View>
                    <View style={{ height: 5, backgroundColor: '#B8C4C4' }}></View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Lịch sử trả hoa hồng</Text>
                </View>
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
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ loading: true }, async () => {
                                await Getwithdrawal({
                                    USERNAME: username,
                                    USER_CTV: username,
                                    START_TIME: this.state.startTime,
                                    END_TIME: this.state.endTime,
                                    PAGE: 1,
                                    NUMOFPAGE: 10,
                                    IDSHOP: 'F6LKFY',
                                })
                                    .then((res) => {
                                        if (res.data.ERROR == "0000") {
                                            this.setState({
                                                Data: res.data.INFO,
                                                loading: false
                                            })
                                        } else {
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
                        style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                textAlign: "center",
                                backgroundColor: '#149CC6',
                                padding: 7,
                                borderRadius: 5,
                            }}
                        >
                            Tìm kiếm
                        </Text>
                    </TouchableOpacity>
                </View>
                {Data.length != 0 ? <View>
                    {loading === false ? <View style={{ height: sizeHeight(40) }}>
                        <View style={styles.container1}>
                            <View style={[styles.cuttoms, styles.children1]}>
                                <Text style={{ color: 'white' }}>Nội dung</Text>
                            </View>
                            <View style={styles.cuttoms}>
                                <Text style={{ color: 'white' }}>Số tiền</Text>
                            </View>
                        </View>
                        <View>
                            <ScrollView nestedScrollEnabled={true} style={{ marginTop: sizeHeight(0.2), height: sizeHeight(36), borderTopColor: '#149CC6', borderTopWidth: 1 }}>
                                <View style={{ marginTop: -2 }}>
                                    {this.state.Data.map((Val, key) => (
                                        <TouchableOpacity key={key} disabled={Val.TRANSACTION_TYPE == 1 ? false : true} onPress={() => this.props.navigation.navigate("DetailOrder", {
                                            ID: Val.COMMENTS.substr(8,8),
                                            NAME:'Rose'
                                        })}>
                                            <View style={styles.container}>
                                                <View style={styles.children}>
                                                    <Text >{Val.UPDATE_TIME}</Text>
                                                    <Text>{Val.COMMENTS}</Text>
                                                </View>
                                                <View style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 10 }}>
                                                    {Val.TRANSACTION_TYPE == 2 ? <Text style={{ color: 'red' }}>- {numeral(Val.AMOUNT).format("0,0")} đ</Text> : <Text style={{ color: '#149CC6' }}>+ {numeral(Val.AMOUNT).format("0,0")} đ</Text>}
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}

                                </View>

                            </ScrollView>
                        </View>
                    </View> : <View style={{ height: sizeHeight(40) }}><Loading /></View>}
                </View> : <View style={{ height: sizeHeight(40), justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Không có dữ liệu</Text>
                    </View>}


                <View style={{ height: 4, backgroundColor: '#B8C4C4', marginTop: sizeHeight(5) }}></View>
                <View>
                    {/* <Text style={{ textAlign: 'center', fontSize: 16, padding: 4 }}>Yêu cầu trả hoa hồng</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput
                            placeholder="Nhập số tiền yêu cầu"
                            keyboardType="number-pad"
                            // value={numeral(this.state.momney).format("0,0")}
                            onChangeText={(num) => this.setState({ momney: num })}
                            style={{ borderColor: '#149CC6', borderWidth: 2, borderRadius: 5, width: sizeWidth(50), paddingLeft: 20, height: sizeHeight(6) }}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ loading: true }, async () => {
                                    await withDrawal({
                                        USERNAME: username,
                                        AMOUNT: momney,
                                        IDSHOP: 'F6LKFY',
                                    })
                                        .then((res) => {
                                            Alert.alert('Thông báo', `${res.data.RESULT}`)

                                        })
                                        .catch((err) => {
                                        });
                                    this.setState({ loading: false });
                                });
                            }
                            }
                            style={{ backgroundColor: '#149CC6', padding: 12, borderRadius: 5, marginLeft: 10 }}
                        ><Text style={{ color: 'white' }}>Gửi yêu cầu</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontStyle: 'italic', }}><Text style={{ color: 'red' }}>*</Text> Lưu ý số tiền nhập không lớn hơn số dư hiện có</Text>
                    </View> */}
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('detailrose')
                            }}
                            style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, width: sizeWidth(80), height: sizeHeight(5), backgroundColor: '#4a8939' }}
                        ><Text style={{ color: '#fff', textAlign: 'center', fontSize: 16, padding: 4 }}>Yêu cầu trả hoa hồng</Text></TouchableOpacity>
                    </View>
                </View>
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

const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ctvsub);

const styles = StyleSheet.create({
    container1: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderColor: '#149CC6',
    },
    children: {
        borderRightColor: '#149CC6',
        borderRightWidth: 0.5,
        width: sizeWidth(70),
        justifyContent: 'center',
        padding: 8,
    },
    children1: {
        width: sizeWidth(70),
        borderRightColor: '#fff',
        borderRightWidth: 0.5,
    },
    cuttoms: {
        marginTop: 5,
        padding: 10,
        backgroundColor: "#4a8939",
        alignItems: 'center',
        width: sizeWidth(30),
    },
    confix: {
        width: sizeWidth(30),
        borderColor: '#4a8939',
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 0.5,
        borderRadius: 5,
        height: sizeHeight(5),
        justifyContent: 'center',
    },

})
