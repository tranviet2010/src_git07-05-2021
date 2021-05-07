
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, TouchableOpacity, AlertCommon, Alert, TextInput, TouchableHighlight } from 'react-native';
import { GetListCTV } from "../../../service/account";
import Modal from 'react-native-modal';
import { Getwithdrawal, GetCTVDetail } from "../../../service/rose";
import { changePass } from "../../../service/auth";
import { FormTextInput } from "../../../components/textinput";
import { COLOR } from "../../../utils/color/colors";
import { UpdateInforAccount } from "../../../service/account";
import Provide from "../../../utils/provide/bank";
import ImagePicker from "react-native-image-picker";
import IconComponets from "../../../components/icon"
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
        this.state = {
            Rose: [],
            data: [],
            loading: false,
            isModalVisible: false,
            formatUser: false,
            formatBank: false,
            dateOfBirth: this.props.authUser.DOB,
            usernam: this.props.authUser.FULL_NAME,
            stk: this.props.authUser.STK,
            tentk: this.props.authUser.TENTK,
            tennh: this.props.authUser.TEN_NH,
            email: this.props.authUser.EMAIL,
            phone: '',
            passnew: '',
            address: this.props.authUser.ADDRESS,
            gender: this.props.authUser.GENDER,
            passold: '',
            cmnd: this.props.authUser.SO_CMT,
            loading: false,
            imageAvatar: '',
            photo: '',
            ctvdetail:[],
            CMT_1: this.props.authUser.IMG1,
            CMT_2: this.props.authUser.IMG2,
            city:
            {
                NAME: this.props.authUser?.CITY,
                MATP: this.props.authUser?.CITY_ID,
            },
            district:
            {
                NAME: this.props.authUser?.DISTRICT,
                MAQH: this.props.authUser?.DISTRICT_ID,
            },
            districChild:
            {
                NAME: this.props.authUser?.WARD,
                XAID: this.props.authUser?.WARD_ID,
            },
            endTime: moment(new Date()).format("DD/MM/YYYY"),
        }
    }
    changeCity = (text) => {
        if (text == "- None -") {
            this.setState({ city: "", district: "", districChild: "" });
        } else {
            this.setState({ city: text, district: "", districChild: "" }, () => {
            });
        }
    };
    changeDistrict = (text) => {
        if (text == "- tất cả -") {
            this.setState({ district: "", districChild: "" });
        } else this.setState({ district: text, districChild: "" });
    };
    changeDistrictChild = (text) => {
        if (text == "- tất cả -") {
            this.setState({ districChild: "" });
        } else this.setState({ districChild: text });
    };
    update = () => {
        const { usernam, email, stk, tennh, tentk, cmnd, CMT_1, CMT_2, city, address, district } = this.state;
        var cmnd1 = [0 - 9];
        if (usernam == '') {
            Alert.alert('Thông báo', 'Họ và tên không được để trống');
        } else if (usernam.length > 50) {
            Alert.alert('Thông báo', 'Không nhập quá 50 kí tự');
        } else if (address.length > 100) {
            Alert.alert('Thông báo', 'Không nhập quá 100 kí tự');
        }
        // else if(this.props.authUser.SO_CMT==cmnd){
        //     Alert.alert('Thông báo', 'CMND/CCCD đã tổn tại');
        // }
        else if (stk && stk.length > 20) {
            Alert.alert('Thông báo', 'Không nhập quá 20 kí tự');
        }
        else if (cmnd && cmnd.length > 20) {
            Alert.alert('Thông báo', 'Không nhập quá 20 kí tự');
        }
        else {
            UpdateInforAccount({
                USERNAME: this.props.username,
                USER_CTV: this.props.username,
                GENDER: '',
                NAME: usernam.trim(),
                EMAIL: email,
                CITY_NAME: city.NAME,
                DISTRICT_NAME: district.NAME,
                ADDRESS: address,
                STK: stk,
                CMT: this.state.cmnd,
                TENTK: tentk,
                TENNH: tennh,
                AVATAR: this.state.imageAvatar,
                IDSHOP: "F6LKFY",
                DOB: '',
                CMT: cmnd,
                IMG1: CMT_1,
                IMG2: CMT_2,
                WARD_NAME: ''
            })
                .then((res) => {
                    this.setState({ loading: false })
                    Alert.alert("Thông báo", `${res.data.RESULT}`)
                })
                .catch((err) => {
                    this.setState({ loading: false })
                    Alert.alert("Thông báo", `${err.data.RESULT}`)
                })
        }
    }
    upload = (source, data, type) => {
        if (source != null) {
            var photo = { ...source, name: "image.jpg", type: "image/jpeg" };

            //If file selected then create FormData
            const data = new FormData();
            data.append("name", "imagefile");
            data.append("image", photo);
            fetch("https://f5sell.com/f/upload_avatar.jsp", {
                method: "post",
                body: data,
                headers: {
                    "Content-Type": "multipart/form-data; ",
                    "Content-Disposition": "form-data",
                },
            })
                .then(async (res) => {
                    let responseJson = await res.json();
                    if (responseJson.ERROR == "0000") {
                        if (type === 1) {
                            this.setState(
                                {
                                    imageAvatar: responseJson.URL,
                                },
                                () => this.setState({ loading: false })
                            );
                        } else if (type === 2) {
                            this.setState(
                                {
                                    CMT_1: responseJson.URL,
                                },
                                () => this.setState({ loading: false })
                            );
                        } else if (type === 3) {
                            this.setState(
                                {
                                    CMT_2: responseJson.URL,
                                },
                                () => this.setState({ loading: false })
                            );
                        }
                        //this.props.onChange(responseJson.URL);
                    } else {
                        this.setState(
                            {
                                loading: false,
                            },
                            () => {
                                this.message = setTimeout(

                                );
                            }
                        );
                    }
                })
                .catch((err) => {
                    this.setState({ loading: false });
                });
        }
    };
    handleImage = (type) => {
        ImagePicker.showImagePicker(options, async (response) => {

            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState(
                    {
                        loading: true,
                    },
                    () => this.upload(source, response.data, type)
                );


            }
        });
    };
    componentDidMount() {
        Getwithdrawal({
            USERNAME: this.props.username,
            USER_CTV: this.props.username,
            START_TIME: "01/01/2018",
            END_TIME: this.state.endTime,
            PAGE: 1,
            NUMOFPAGE: 10,
            IDSHOP: "F6LKFY",
        })
            .then((res) => {
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
                USERNAME: this.props.username,
                USER_CTV: this.props.username,
                IDSHOP: "F6LKFY",
            })
            .then((res) => {
                if (res.data.ERROR == "0000") {
                    this.setState({
                        ctvdetail: res.data
                    })
                } else {
                }
            })
            .catch((err) => {
            });
        
    }
    render() {
        const { data, modalVisible, Rose, imageAvatar, usernam, email, stk, tentk, tennh, cmnd,ctvdetail, CMT_1, CMT_2,
            city, passold, passnew, phone, address, district, districChild, loading, dateOfBirth } = this.state;
        const { authUser } = this.props;

        return (

            <View>

                <ScrollView>
                    <View style={{ backgroundColor: '#28990D', height: sizeHeight(15), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <View>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>{usernam}</Text>
                            <Text style={{ color: 'white' }}>Mã user: {ctvdetail.USER_CODE}</Text>
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
                                        source={ctvdetail.AVATAR === '' ? require('../../../assets/images/camera.png') : { uri: ctvdetail.AVATAR }}
                                        style={{ width: 65, height: 65, borderRadius: 50, backgroundColor: 'white' }}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 20 }}>
                            <View style={{
                                justifyContent: 'center', alignContent: 'center', backgroundColor: '#4d7335',
                                width: sizeWidth(100)
                            }}>
                                <Text style={{ fontSize: 16, padding: 10, color: 'white', fontWeight: 'bold' }}>Thông tin cá nhân</Text>
                            </View>
                        </View>
                        <View>
                            <View style={styles.content}>
                                <Text>Họ và tên:</Text>
                                <TextInput
                                    value={usernam}
                                    onChangeText={(text) => { this.setState({ usernam: text }) }}
                                />
                            </View>

                            <View style={styles.content}>
                                <Text>Giới tính:</Text>
                                <Text>{authUser.GENDER}</Text>
                            </View>
                            <View style={styles.content}>
                                <Text>Số điện thoại:</Text>
                                <TextInput
                                    value={ctvdetail.MOBILE==null?`null`:ctvdetail.MOBILE}
                                    onChangeText={(text) => { this.setState({ phone: text }) }}
                                />
                            </View>
                            <View style={styles.content}>
                                <Text>Email:</Text>
                                <TextInput
                                    value={email}
                                    onChangeText={(text) => { this.setState({ email: text }) }}
                                />
                            </View>
                            {/* <View style={styles.content}>
                                        <Text>Số điện thoại:</Text>
                                        <Text>{Val.ADDRESS}</Text>
                                    </View> */}
                            <View style={styles.content}>
                                <Text>Ngày sinh:</Text>
                                <TextInput
                                    value={ctvdetail.DOB}
                                    onChangeText={(text) => { this.setState({ dateOfBirth: text }) }}
                                />
                            </View>
                            <View style={styles.content}>

                                <Text>Tỉnh/ thành phố</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate("ListCountries", {
                                            onSetCity: this.changeCity,
                                            NAME: "Thông tin CTV",
                                        });
                                    }}
                                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <Text style={{ marginRight: 10 }}>{city.NAME == undefined ? "" : city.NAME}</Text>
                                    <IconComponets
                                        name="chevron-down"
                                        size={sizeFont(5)}
                                        color="#4d7335"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.content}>
                                <Text>Quận/Huyện:</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate("ListDistrict", {
                                            onSetDistrict: this.changeDistrict,
                                            GHN_TINHID: city.MATP,
                                            NAME: "Thông tin CTV",
                                        });
                                    }}
                                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <Text style={{ marginRight: 10 }}>{district.NAME == undefined ? "" : district.NAME}</Text>
                                    <IconComponets
                                        name="chevron-down"
                                        size={sizeFont(5)}
                                        color="#4d7335"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.content}>
                                <Text>Phường/ Xã:</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate("ListDistrictChild", {
                                            onSetDistrictChild: this.changeDistrictChild,
                                            GHN_TINHID: district.MAQH,
                                            NAME: "Thông tin CTV",
                                        });
                                    }}
                                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <Text style={{ marginRight: 10 }}>{districChild.NAME == undefined ? "" : districChild.NAME}</Text>
                                    <IconComponets
                                        name="chevron-down"
                                        size={sizeFont(5)}
                                        color="#4d7335"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.content}>
                                <Text>Địa chỉ:</Text>
                                <TextInput
                                    value={address}
                                    onChangeText={(text) => { this.setState({ address: text }) }}
                                />
                            </View>
                            <View style={styles.content}>
                                <Text>Số cmnd:</Text>
                                <TextInput
                                    value={cmnd}
                                    onChangeText={(text) => { this.setState({ cmnd: text }) }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 15, marginBottom: 15 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={{ width: sizeWidth(40), height: sizeHeight(15), borderColor: "#4d7335", borderWidth: 2, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => { this.handleImage(2) }}
                                    >
                                        <Image
                                            source={CMT_1 == null ? require('../../../assets/images/update.png') : { uri: CMT_1 }}
                                            style={{ width: 120, height: 80 }}
                                        />

                                    </TouchableOpacity>
                                    <Text style={{ marginTop: 5 }}>Ảnh mặt trước cmnd</Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={{ width: sizeWidth(40), height: sizeHeight(15), borderColor: "#4d7335", borderWidth: 2, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => { this.handleImage(3) }}
                                    >
                                        <Image
                                            source={CMT_2 == null ? require('../../../assets/images/update.png') : { uri: CMT_2 }}
                                            style={{ width: 120, height: 80 }}
                                        />

                                    </TouchableOpacity>
                                    <Text style={{ marginTop: 5 }}>Ảnh mặt sau cmnd</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 20 }}>
                                <View style={{ width: sizeWidth(100), backgroundColor: '#4d7335' }}>
                                    <Text style={{ fontSize: 16, padding: 10, fontWeight: 'bold', color: 'white' }}>Tài khoản ngân hàng</Text>
                                </View>

                            </View>
                        </View>
                        <View>
                            <View style={styles.content}>
                                <Text>Số tài khoản:</Text>
                                <TextInput
                                    value={stk}
                                    onChangeText={(text) => { this.setState({ stk: text }) }}
                                />
                            </View>

                            <View style={styles.content}>
                                <Text>Tên tài khoản:</Text>
                                <TextInput
                                    value={tentk}
                                    onChangeText={(text) => { this.setState({ tentk: text }) }}
                                />
                            </View>
                            <View style={styles.content1}>
                                <Text>Ngân hàng, chi nhánh:</Text>
                                <TextInput
                                    value={tennh}
                                    onChangeText={(text) => { this.setState({ tennh: text }) }}
                                />
                            </View>
                        </View>
                        <View style={{ height: 4, backgroundColor: '#AAAAAA' }}></View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', height: 60 }}>
                        <Image
                            source={require('../../../assets/images/monney.png')}
                            style={{ width: 50, height: 50 }}
                        />
                        <Text style={{ fontSize: 16 }}>Số dư hoa hồng hiện tại <Text style={{ color: '#FF5C03', fontSize: 20, fontWeight: 'bold' }}>
                            {Rose.length === 0 ? 0 : numeral(Rose[0].BALANCE).format("0,0")}đ
                                    </Text></Text>
                        {/* <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('detailrose')
                            }}
                        >
                            <Image
                                source={require('../../../assets/images/right.png')}
                                style={{ width: 18, height: 18 }}
                            />
                        </TouchableOpacity> */}
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 20 }}>
                            <View style={{ width: sizeWidth(100), backgroundColor: '#4d7335' }}>
                                <Text style={{ fontSize: 16, padding: 10, fontWeight: 'bold', color: 'white' }}>Tài khoản ngân hàng</Text>
                            </View>
                        </View>
                        <View>
                            {authUser.GROUPS == 8 ? <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ padding: 10, fontSize: sizeFont(4.5) }}>Để nâng cấp thành tài khoản CTV bạn cần nhập vào mã giới thiệu</Text>
                                <TextInput
                                    placeholder="- Mã giới thiệu"
                                    style={{ paddingLeft:10, width: sizeWidth(60), height: sizeHeight(6), borderColor: '#4d7335', borderWidth: 2,borderRadius:5 }}

                                />
                            </View> : null}
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 20 }}>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row', alignItems: 'center', backgroundColor: '#149CC6',
                                width: sizeWidth(40), justifyContent: 'center', marginTop: 20
                            }}


                            onPress={() =>
                                this.update()
                            }>
                            <Text style={{ padding: 10,color:'#fff',fontWeight:'bold' }}>Cập nhật</Text>
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
        height: sizeHeight(5),
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#AAAAAA',
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
