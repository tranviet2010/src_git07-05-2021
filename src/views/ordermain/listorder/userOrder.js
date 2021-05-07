import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, RefreshControl, Platform } from 'react-native'
import moment from "moment";
import { sizeHeight, sizeWidth } from '../../../utils/helper/size.helper';
import { connect } from 'react-redux';
var numeral = require("numeral");
import { getListOrder } from '../../../service/order';
import Loading from '../../../components/loading';
import { GetCity, GetDistrict } from '../../../service/countries';
import { COLOR } from '../../../utils/color/colors';


class UserOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startTime: moment()
                .add(-60, "day")
                .format("DD/MM/YYYY"),
            endTime: moment(new Date()).format("DD/MM/YYYY"),
            Data: [],
            Number: '',
            isDatePickerVisible: false,
            inDateEndPicker: false,
            loading: false,
            selectedValue: '',
            refreshing: true,
            pickerOpacity: 0,
            city: [],
            opacityOfOtherItems: 1,
            label: 'Firstvalue',
            country: 'uk',
            modalVisible: true,
        }
    }
    handleLoad = async () => {
        await getListOrder({
            USERNAME: this.props.username,
            USER_CTV: this.props.username,
            START_TIME: this.state.startTime,
            END_TIME: this.state.endTime,
            STATUS: '',
            PAGE: 1,
            NUMOFPAGE: 100,
            IDSHOP: 'F6LKFY',
        })
            .then((res) => {
                console.log("helloooo", res)
                if (res.data.ERROR == "0000") {
                    this.setState({
                        Data: res.data.INFO,
                        refreshing: false
                    })
                } else {
                    this.setState({
                        refreshing: false
                    })
                }
            })
            .catch((err) => {

            });
    }
    componentDidMount() {
        GetCity({
        }).then((res) => {
            this.setState({
                city: res.data.INFO
            })
        })
        this.handleLoad();
        this._interval = setInterval(() => {
            this.handleLoad();
        }, 60000);
    }
    componentWillUnmount() {
        clearInterval(this._interval);
    }





    checkColor = (a) => {
        if (a.STATUS == 1) {
            return <View style={{ backgroundColor: '#ff9219', width: sizeWidth(30), height: sizeHeight(3.5), justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                <Text style={{ color: '#FFFFFF', }}>{a.STATUS_NAME}</Text>
            </View>
        } else if (a.STATUS == 2) {
            return <View style={{ backgroundColor: '#2eacff', width: sizeWidth(30), height: sizeHeight(3.5), justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                <Text style={{ color: '#FFFFFF', }}>{a.STATUS_NAME}</Text>
            </View>

        } else if (a.STATUS == 3) {
            return <View style={{ backgroundColor: '#b4499b', width: sizeWidth(30), height: sizeHeight(3.5), justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                <Text style={{ color: '#FFFFFF', }}>{a.STATUS_NAME}</Text>
            </View>

        } else if (a.STATUS == 4) {
            return <View style={{ backgroundColor: '#fc3f5f', width: sizeWidth(30), height: sizeHeight(3.5), justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                <Text style={{ color: '#FFFFFF', }}>{a.STATUS_NAME}</Text>
            </View>

        } else if (a.STATUS == 7) {
            return <View style={{ backgroundColor: '#44b3a4', width: sizeWidth(30), height: sizeHeight(3.5), justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                <Text style={{ color: '#FFFFFF', }}>{a.STATUS_NAME}</Text>
            </View>
        }
        else {
            return <View style={{ backgroundColor: '#4e7336', width: sizeWidth(30), height: sizeHeight(3.5), justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                <Text style={{ color: '#FFFFFF', }}>{a.STATUS_NAME}</Text>
            </View>

        }
    }
    render() {
        const { Data, loading, refreshing, city } = this.state;
        const {status}=this.props;
        return (
            <View style={{ height: sizeHeight(100) }}>
                {this.props.status == '' ?
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: sizeHeight(15), padding: 10 }}>
                        <Image
                            source={require('../../../assets/images/logo.png')}
                            style={{ width: 130, height: 130, marginBottom: sizeHeight(3) }}
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
                    <View style={{}}>
                        <View style={{ margin: 10 }}>
                            {Data && Data.length == 0 ? null : <View>

                                <Text style={{ fontSize: 17, padding: 5, color: '#494848' }}>Tổng số đơn hàng: <Text style={{ fontWeight: "bold", color: COLOR.HEADER, fontSize: 17 }}>{Data.length} đơn</Text></Text>

                            </View>}
                            <ScrollView
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={() => this.handleLoad()} />
                                }
                                style={{ marginBottom: Platform.OS === 'ios' ? sizeHeight(30) : sizeHeight(20) }}

                            >
                                {Data.length == 0 ?
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: sizeHeight(15), padding: 10 }}>
                                        <Image
                                            source={require('../../../assets/images/logo.png')}
                                            style={{ width: 150, height: 150, marginBottom: sizeHeight(3) }}
                                        />
                                        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Chợ An Bình City</Text>
                                        <Text style={{ textAlign: 'center' }}>Quý khách chưa có đơn hàng nào, hãy chọn mua các sản phẩm thiết yếu cho gia đình và trải nghiệm những tiện ích tuyệt vời của Chợ An Bình City,
                                             TƯƠI NGON, GIAO HÀNG MIỄN PHÍ TẬN NHÀ, ĐÚNG GIỜ.</Text>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate("product")}
                                            style={{ width: sizeWidth(50), height: sizeHeight(5), borderRadius: 5, backgroundColor: COLOR.HEADER, justifyContent: 'center', alignItems: 'center', marginTop: sizeHeight(5) }}
                                        >
                                            <Text style={{ color: '#fff' }}>Đi chợ ngay</Text>
                                        </TouchableOpacity>
                                    </View> : Data.map((Val, key) => (
                                        <TouchableOpacity
                                            key={key}
                                            onPress={() => this.props.navigation.navigate("DetailOrder", {
                                                ID: Val.CODE_ORDER,
                                                STATUS: Val.STATUS,
                                                STANAME: Val.STATUS_NAME,
                                                NAME: 'Order',
                                                CITY: city,
                                                reload: this.handleLoad
                                            })
                                            }
                                            style={{ marginTop: 20 }}
                                        >
                                            <View style={{ padding: 5, backgroundColor: '#fff', borderRadius: 5, height: sizeHeight(13), justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <View>
                                                        <Text style={{ fontWeight: "600", fontSize: 15, color: '#494848' }}>
                                                            Mã ĐH: {Val.CODE_ORDER}{" "}
                                                        </Text>
                                                    </View>
                                                    {/* <View>
                                                        {this.checkColor(Val)}
                                                    </View> */}
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Image
                                                            source={require('../../../assets/images/clock.png')}
                                                            style={{ width: 15, height: 15, }}
                                                        />
                                                        <Text style={{ fontSize: 13, color: '#999999' }}>
                                                            {Val.CREATE_DATE}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                                    <Text style={{ fontSize: 15, color: '#999999', fontWeight: '500' }}>Thời gian giao hàng</Text>
                                                    <Text style={{ fontSize: 15, color: COLOR.HEADER, fontWeight: '500', marginLeft: 10 }}>{Val.REQUEST_DATE} {Val.REQUEST_TIME}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ fontSize: 15, color: '#494848', fontWeight: "600" }}>Giá trị đơn hàng</Text>
                                                        <Text style={{ color: '#F90000', fontSize: 15, fontWeight: "600", marginLeft: 10 }}>{numeral(Val.TOTAL_MONEY).format("0,0")} đ</Text>
                                                    </View>
                                                    <View>
                                                        {this.checkColor(Val)}
                                                    </View>

                                                </View>

                                            </View>
                                        </TouchableOpacity>
                                    ))}
                            </ScrollView></View>
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
const styles = StyleSheet.create({
    confix: {
        width: sizeWidth(40),
        borderColor: '#4a8939',
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderRadius: 5,
        height: sizeHeight(5.7),
        justifyContent: 'center',


    },
    confix1: {
        marginTop: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },

})

export default connect(
    mapStateToProps,
    null
)(UserOrder);
