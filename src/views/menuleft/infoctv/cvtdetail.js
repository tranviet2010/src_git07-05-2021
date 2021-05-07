import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, TouchableHighlight, Switch } from 'react-native';
import { Getwithdrawal, GetCTVDetail } from "../../../service/rose";
import { ElementCustom, AlertCommon } from "../../../components/error";
import { resetPass } from "../../../service/auth";
import { BlockAccout } from "../../../service/account";

import moment from "moment";
var numeral = require("numeral");
import {
    sizeWidth,
    sizeFont,
    sizeHeight,
} from "../../../utils/helper/size.helper"
import {
    checkFullName
} from "../../../utils/check"
import { ScrollView } from 'react-native-gesture-handler';
const options = {
    title: "Chọn ảnh",
    storageOptions: {
        skipBackup: true,
        path: "images",
    },
    maxWidth: 720,
    maxHeight: 1080,
};

class UserChildren extends Component {
    constructor(props) {
        super(props);
        const { Data } = this.props.route.params;
        this.state = {
            Rose: [],
            data: [],
            loading: false,
            isModalVisible: false,
            formatUser: false,
            formatBank: false,
            dateOfBirth: Data.DOB,
            usernam: Data.FULL_NAME,
            stk: Data.STK,
            tentk: Data.TENTK,
            tennh: Data.TEN_NH,
            email: Data.EMAIL,
            phone: '',
            passnew: '',
            gender: Data.GENDER,
            passold: '',
            cmnd: Data.SO_CMT,
            loading: false,
            imageAvatar: Data.AVATAR,
            photo: '',
            ctvdetail: [],
            CMT_1: Data.IMG1,
            CMT_2: Data.IMG2,
            setupacc: Data.GROUP_DES,
            rosectv: '',
            isEnabled: Data.STATUS == 1 ? true : false,
            city:
            {
                NAME: Data?.CITY,
                MATP: Data?.CITY_ID,
            },
            district:
            {
                NAME: Data?.DISTRICT,
                MAQH: Data?.DISTRICT_ID,
            },
            districChild:
            {
                NAME: Data?.WARD,
                XAID: Data?.WARD_ID,
            },
            endTime: moment(new Date()).format("DD/MM/YYYY"),
        }
        this.message = '';
    }
    setupaccout = (text) => {
        this.setState({ setupacc: text })
    }
    toggleSwitch = () => {
        this.setState({
            isEnabled: !this.state.isEnabled
        })
        this.blockAaccout();
    }
    reset = () => {
        resetPass({
            USERNAME: this.props.username,
            USER_CTV: this.props.username,
            IDSHOP: 'F6LKFY'
        })
            .then((res) => {
                Alert.alert('Thông báo', `${res.data.RESULT}`)
            })
            .catch((err) => {
            });
    }
    blockAaccout = () => {
        const { Data } = this.props.route.params;
        BlockAccout({
            STATUS: this.state.isEnabled == true ? 0 : 1,
            USER_ID: Data.ID
        })
            .then((res) => {
                AlertCommon("Thông báo", res.data.RESULT, () => {
                    this.props.navigation.popToTop();
                    this.props.navigation.navigate("ctvdow");
                })
            })
    }
    componentDidMount() {
        const { Data } = this.props.route.params;
        Getwithdrawal({
            USERNAME: this.props.username,
            USER_CTV: this.props.username,
            START_TIME: "01/01/2018",
            END_TIME: this.state.endTime,
            PAGE: 1,
            NUMOFPAGE: 10,
            IDSHOP: 'F6LKFY',
        })
            .then((res) => {
                console.log("roseeee", res);
                if (res.data.ERROR == "0000") {
                    this.setState({
                        Rose: res.data.INFO
                    })
                } else {
                    this.showToast(res);
                }
            })
            .catch((err) => {
            });
        GetCTVDetail({
            USERNAME: Data.USERNAME,
            USER_CTV: Data.USERNAME,
            IDSHOP: 'F6LKFY',
        })
            .then((res) => {
                console.log("ctvdetail", res);
                if (res.data.ERROR == "0000") {
                    this.setState({
                        ctvdetail: res.data
                    })
                } else {
                    console.log("errrrrro")
                }
            })
            .catch((err) => {
            });

    }
    render() {
        const { data, setupacc, Rose, rosectv, usernam, email, stk, tentk, tennh, cmnd, ctvdetail, CMT_1, CMT_2,
            isEnabled } = this.state;
        const { Data } = this.props.route.params;
        const { authUser } = this.props;

        return (

            <View>

                <ScrollView>
                    <View style={{ backgroundColor: '#fff', height: sizeHeight(18), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View>
                                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold', height: sizeHeight(4) }}>{usernam}</Text>
                                    <Text style={{ color: '#000', height: sizeHeight(4) }}>User: {ctvdetail.USERNAME}</Text>
                                    <Text style={{ color: '#000', height: sizeHeight(4) }}>Mã CTV/ KH: {ctvdetail.USER_CODE}</Text>
                                </View>
                                <View style={{ width: sizeWidth(16), height: sizeHeight(9), borderColor: 'gray', borderWidth: 1, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray' }}>
                                    <Image
                                        source={ctvdetail.AVATAR == null ? require('../../../assets/images/user.png') : { uri: ctvdetail.AVATAR }}
                                        style={{ width: 40, height: 40 }}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', height: sizeHeight(4), justifyContent: 'space-between', width: sizeWidth(95), alignItems: 'center' }}>
                                <Text style={{ color: '#000' }}>Trạng thái:</Text>
                                <View >
                                    <Switch
                                        trackColor={{ false: "#f4f3f4", true: "#EEEEEE" }}
                                        thumbColor={isEnabled ? "#4a8939" : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={this.toggleSwitch}
                                        value={isEnabled}
                                    />
                                </View>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.handleImage(1)}
                            >
                                <View style={{
                                    width: 80, height: 80, borderRadius: 50,
                                    justifyContent: 'center', alignItems: 'center',
                                }}>
                                    <Image
                                        source={Data.AVATAR === '' ? require('../../../assets/images/camera.png') : { uri: Data.AVATAR }}
                                        style={{ width: 45, height: 45, borderRadius: 50, backgroundColor: 'white' }}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: sizeWidth(100), justifyContent: 'space-between', backgroundColor: '#363636' }}>
                            <View style={{
                                justifyContent: 'center', alignContent: 'center'

                            }}>
                                <Text style={{ fontSize: 16, padding: 10, color: 'white', fontWeight: 'bold' }}>Thông tin cá nhân</Text>
                            </View>
                            <Text onPress={() => {
                                this.props.navigation.navigate("editctv", {
                                    id: Data.USERNAME,
                                    Data1: Data,
                                })
                            }} style={{ fontSize: 16, padding: 10, color: 'white', textDecorationLine: 'underline' }}>Sửa</Text>
                        </View>
                        <View>
                            <View style={styles.content}>
                                <Text>Họ và tên:</Text>
                                <Text>{ctvdetail.FULL_NAME}</Text>
                            </View>

                            <View style={styles.content}>
                                <Text>Giới tính:</Text>
                                <Text>{ctvdetail.GENDER_NAME}</Text>
                            </View>
                            <View style={styles.content}>
                                <Text>Số điện thoại:</Text>
                                <Text>
                                    {ctvdetail.MOBILE}

                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Text>Email:</Text>
                                <Text>{ctvdetail.EMAIL}</Text>
                            </View>
                            <View style={styles.content}>
                                <Text>Loại tài khoản</Text>
                                <Text>{ctvdetail.GROUP_DES}</Text>
                            </View>
                            {/* <View style={styles.content}>
                                        <Text>Số điện thoại:</Text>
                                        <Text>{Val.ADDRESS}</Text>
                                    </View> */}
                            <View style={styles.content}>
                                <Text>Ngày sinh:</Text>
                                <Text>{ctvdetail.DOB}</Text>
                            </View>
                            <View style={styles.content}>
                                <Text>Hoa hồng theo CTV:</Text>
                                <View>
                                    {Data.GROUPS == 5 ? <TextInput
                                        value={rosectv}
                                        onChangeText={(text) => { this.setState({ rosectv: text }) }}
                                    /> : <Text>0%</Text>}
                                </View>
                            </View>
                            {/* <View style={styles.content}>
                                <Text>Tỉnh/ thành phố</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate("ListCountries", {
                                            onSetCity: this.changeCity,
                                            NAME: "Detail container",
                                        });
                                    }}
                                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <Text style={{ marginRight: 10 }}>{city.NAME == undefined ? "" : city.NAME}</Text>
                                    <IconComponets
                                        name="chevron-down"
                                        size={sizeFont(5)}
                                        color="#4a8939"
                                    />
                                </TouchableOpacity>
                            </View> */}
                            {/* <View style={styles.content}>
                                <Text>Quận/Huyện:</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate("ListDistrict", {
                                            onSetDistrict: this.changeDistrict,
                                            GHN_TINHID: city.MATP,
                                            NAME: "Detail container",
                                        });
                                    }}
                                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <Text style={{ marginRight: 10 }}>{district.NAME == undefined ? "" : district.NAME}</Text>
                                    <IconComponets
                                        name="chevron-down"
                                        size={sizeFont(5)}
                                        color="#4a8939"
                                    />
                                </TouchableOpacity>
                            </View> */}
                            {/* <View style={styles.content}>
                                <Text>Phường/ Xã:</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate("ListDistrictChild", {
                                            onSetDistrictChild: this.changeDistrictChild,
                                            GHN_TINHID: district.MAQH,
                                            NAME: "Detail container",
                                        });
                                    }}
                                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <Text style={{ marginRight: 10 }}>{districChild.NAME == undefined ? "" : districChild.NAME}</Text>
                                    <IconComponets
                                        name="chevron-down"
                                        size={sizeFont(5)}
                                        color="#4a8939"
                                    />
                                </TouchableOpacity>
                            </View> */}
                            <View style={styles.content}>
                                <Text>Địa chỉ:</Text>
                                <View style={{ width: sizeWidth(50), height: sizeHeight(7) }}>
                                    <Text>
                                        {`${ctvdetail.CITY},${ctvdetail.DISTRICT},${ctvdetail.ADDRESS}`}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.content}>
                                <Text>Số cmnd:</Text>
                                <Text>{ctvdetail.SO_CMT}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 15, marginBottom: 15 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <View
                                        style={{ width: sizeWidth(40), height: sizeHeight(15), borderColor: "#4a8939", borderWidth: 2, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}

                                    >
                                        <Image
                                            source={ctvdetail.IMG1 == null ? require('../../../assets/images/camera.png') : { uri: ctvdetail.IMG1 }}
                                            style={{ width: 120, height: 80 }}
                                        />

                                    </View>
                                    <Text style={{ marginTop: 5 }}>Ảnh mặt trước cmnd</Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <View
                                        style={{ width: sizeWidth(40), height: sizeHeight(15), borderColor: "#4a8939", borderWidth: 2, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}

                                    >
                                        <Image
                                            source={ctvdetail.IMG2 == null ? require('../../../assets/images/camera.png') : { uri: ctvdetail.IMG2 }}
                                            style={{ width: 120, height: 80 }}
                                        />

                                    </View>
                                    <Text style={{ marginTop: 5 }}>Ảnh mặt sau cmnd</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 20 }}>
                                <View style={{ width: sizeWidth(100), backgroundColor: '#363636' }}>
                                    <Text style={{ fontSize: 16, padding: 10, fontWeight: 'bold', color: '#fff' }}>Tài khoản ngân hàng</Text>
                                </View>

                            </View>
                        </View>
                        <View>
                            <View style={styles.content}>
                                <Text>Số tài khoản:</Text>
                                <Text>{ctvdetail.STK}</Text>
                            </View>

                            <View style={styles.content}>
                                <Text>Tên tài khoản:</Text>
                                <Text>{ctvdetail.TENTK}</Text>
                            </View>
                            <View style={styles.content1}>
                                <Text>Ngân hàng, chi nhánh:</Text>
                                <Text>{ctvdetail.TEN_NH}</Text>
                            </View>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#363636', justifyContent: 'space-between', padding: 10, height: sizeHeight(7) }}>


                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>Số dư hoa hồng hiện tại: <Text style={{ color: '#FF5C03', fontSize: 20, fontWeight: 'bold' }}>
                                {numeral(Data.BALANCE).format("0,0")}đ
                                    </Text></Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('detailrose', {
                                        ID_NAME: Data.USERNAME,
                                    })
                                }}
                            >
                                <Image
                                    source={require('../../../assets/images/right.png')}
                                    style={{ width: 18, height: 18, marginRight: 20 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <View>
                            {authUser.GROUPS == 8 ? <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ padding: 10, fontSize: sizeFont(4.5) }}>Để nâng cấp thành tài khoản CTV bạn cần nhập vào mã giới thiệu</Text>
                                <TextInput
                                    placeholder="- Mã giới thiệu"
                                    style={{ paddingLeft: 10, width: sizeWidth(60), height: sizeHeight(6), borderColor: '#4a8939', borderWidth: 2, borderRadius: 5 }}

                                />
                            </View> : null}
                        </View>
                    </View>
                    <View style={{ justifyContent: 'space-evenly', alignItems: 'center', paddingBottom: 20, flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row', alignItems: 'center', backgroundColor: '#149CC6',
                                width: sizeWidth(40), justifyContent: 'center', marginTop: 20
                            }}


                            onPress={() => {
                                this.props.navigation.navigate("order", {
                                    id: Data.USERNAME,
                                })
                            }
                            }>
                            <Text style={{ padding: 10, color: '#fff', fontWeight: 'bold' }}>Xem đơn hàng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity



                            onPress={() =>
                                this.reset()
                            }>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center', backgroundColor: '#149CC6',
                                width: sizeWidth(40), marginTop: 20
                            }}>
                                <Image
                                    source={require('../../../assets/images/resetac.png')}
                                    style={{ width: 25, height: 25 }}
                                />

                                <Text style={{ padding: 10, color: '#fff', fontWeight: 'bold' }}>reset mật khẩu</Text>
                            </View>
                        </TouchableOpacity>
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


export default connect(
    mapStateToProps,
    null
)(UserChildren);

const styles = StyleSheet.create({
    content: {
        height: sizeHeight(4),
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',

        alignItems: 'center'
    },
    content1: {
        height: sizeHeight(5),
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})