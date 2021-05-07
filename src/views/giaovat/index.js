import React, { Component } from 'react'
import { StyleSheet, TextInput, Text, View, Image, Button, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native'
import { connect } from "react-redux";
import moment from "moment";
import { sizeWidth, sizeHeight, sizeFont } from '../../utils/helper/size.helper';
import { COLOR } from '../../utils/color/colors';
import Mybuy from './mybuy';
import Needbuy from './needbuy';
import Needsell from './needsell';
import { SafeAreaView } from 'react-native';
import { getText } from '../../service/giaovat';

var numeral = require("numeral");
class Giaovat extends Component {
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
            momney: '',
            status1: 1,
        }
    }
    handleText = () => {
        getText({
            TYPE: 'sell',
            STATUS: '',
            PAGE: 1,
            NUMOFPAGE: 10,
            SEARCH: '',
            ID: '',
            START_TIME: '',
            END_TIME: ''
        }).then((res) => {
            if (res.data.ERROR == "0000") {

            } else {

            }

        }).catch((err) => err)
    }

    componentDidMount() {

    }
    render() {
        const { status1 } = this.state;
        const { navigation, status } = this.props;
        return (
            <View>
                {status == '' ? <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: sizeHeight(15), padding: 10 }}>
                    <Image
                        source={require('../../assets/images/logo.png')}
                        style={{ width: 150, height: 150, marginBottom: sizeHeight(3) }}
                    />
                    <Text style={{ fontWeight: '500', marginBottom: 10, justifyContent: 'center' }}>Quý cư dân chưa đăng nhập</Text>
                    <Text style={{ textAlign: 'center' }}>Vui lòng đăng nhập bằng mã căn hộ để mua hàng và nhận ưu đãi từ Chợ An Bình City</Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('SignIn')}
                        style={{ backgroundColor: COLOR.HEADER, width: sizeWidth(40), height: sizeHeight(5), justifyContent: 'center', alignItems: 'center', marginTop: sizeHeight(5), borderRadius: 5 }}
                    >
                        <Text style={{ color: '#fff' }}>Đăng nhập ngay</Text>
                    </TouchableOpacity>
                </View> :
                    <View>
                        <View style={{ flexDirection: 'row', paddingTop: Platform.OS == "ios" ? sizeHeight(5) : 0, height: Platform.OS == "ios" ? sizeHeight(12) : sizeHeight(9), backgroundColor: COLOR.HEADER, justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ width: sizeWidth(25) }}></View>
                            <View>
                                <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>Rao vặt</Text>
                            </View>
                            {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 20, width: 70 }}>

                            </View> */}
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("addread", {
                                    reload: this.handleText
                                })}
                                style={{ backgroundColor: '#fff', width: sizeWidth(25), justifyContent: 'center', alignItems: 'center', borderRadius: 40, height: sizeHeight(3.5), marginRight: 10 }}
                            >
                                <Text style={{ color: COLOR.HEADER, fontSize: 14 }}>Đăng tin</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => this.setState({ status1: 1 })} style={[styles.headerText, { backgroundColor: status1 == 1 ? '#edf1ea' : null }]}><Text style={{ color: status1 == 1 ? COLOR.HEADER : '#999999', fontWeight: status1 == 1 ? '600' : '400', fontSize: 17 }}>Cần bán</Text></TouchableOpacity >
                            <TouchableOpacity onPress={() => this.setState({ status1: 2 })} style={[styles.headerText, { backgroundColor: status1 == 2 ? '#edf1ea' : null }]}><Text style={{ color: status1 == 2 ? COLOR.HEADER : '#999999', fontWeight: status1 == 2 ? '600' : '400', fontSize: 17 }}>Cần mua</Text></TouchableOpacity >
                            <TouchableOpacity onPress={() => this.setState({ status1: 3 })} style={[styles.headerText, { backgroundColor: status1 == 3 ? '#edf1ea' : null }]}><Text style={{ color: status1 == 3 ? COLOR.HEADER : '#999999', fontWeight: status1 == 3 ? '600' : '400', fontSize: 17 }}>Của tôi</Text></TouchableOpacity >
                        </View>
                        <ScrollView>
                            <View>
                                {status1 == 1 ? <Needbuy navigation={navigation} controller={this.handle} /> : status1 == 2 ? <Needsell navigation={navigation} /> : <Mybuy navigation={navigation} />}
                            </View>
                        </ScrollView>
                    </View>}
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
)(Giaovat);

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        marginTop: 10,
        paddingLeft: 10,
        marginBottom: 10

    },
    headerText: {
        width: sizeWidth(30),
        height: sizeHeight(4),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,

    }
})
