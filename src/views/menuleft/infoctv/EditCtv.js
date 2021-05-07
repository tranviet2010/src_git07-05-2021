import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, TouchableHighlight } from 'react-native';
import Modal from 'react-native-modal';
// import ImagePicker from "react-native-image-picker";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker/src';
import { UpdateInforAccount } from "../../../service/account";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { GetCTVDetail } from "../../../service/rose";
import DropDownPicker from 'react-native-dropdown-picker';
import { ElementCustom, AlertCommon } from "../../../components/error";
import IconComponets from "../../../components/icon"
import moment from "moment";
import {
    alphanumeric,
    checkFullName,
    isVietnamesePhoneNumber,
    checkAccountBank,
    validateEmail,
    checkAgent,
  } from "../../../utils/check";
import { COLOR } from "../../../utils/color/colors";
var numeral = require("numeral");
import {
    sizeWidth,
    sizeFont,
    sizeHeight,
} from "../../../utils/helper/size.helper"
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
class EditCtv extends Component {
    constructor(props) {
        super(props);
        const { Data1 } = this.props.route.params;
        this.state = {
            data: [],
            loading: false,
            formatBank: false,
            usernam: Data1.FULL_NAME,
            stk: Data1.STK,
            tentk: Data1.TENTK,
            tennh: Data1.TEN_NH,
            chinhanh: '',
            dayOfBirth: Data1.DOB,
            phone: Data1.USERNAME,
            email:Data1.EMAIL,
            address: Data1.ADDRESS,
            gender: Data1.GENDER,
            selectedValue: '',
            cmnd: '',
            typeaccout: Data1.GROUP_DES,
            CMT_1: null,
            CMT_2: null,
            ctvdetail: [],
            showCalendar: false,
            city:
            {
                NAME: Data1?.CITY,
                MATP: Data1?.CITY_ID,
            },
            district:
            {
                NAME: Data1?.DISTRICT,
                MAQH: Data1?.DISTRICT_ID,
            },
            districChild:
            {
                NAME: Data1?.WARD,
                XAID: Data1?.WARD_ID,
            },

        }
        this.message = "";
    }
    handleDate = (item) => {
        this.setState({ showCalendar: false }, () =>
          this.setState({ dayOfBirth: moment(item).format("DD/MM/YYYY") })
        );
      };
    update = () => {
        const { usernam, email,gender, phone, stk, tennh, tentk, cmnd, CMT_1, CMT_2, city, address, district, dayOfBirth } = this.state;
        const { Data1 } = this.props.route.params;
        var cmnd1 = /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
        var checkmail = /[a-z0-9._%+-]+@[a-z0-9-]+.+.[a-z]{2,4}/;
        var checkname = /^[a-zA-Z\s]+$/;
        if (usernam == '') {
            Alert.alert('Thông báo', 'Họ và tên không được để trống');
        } else if (usernam.length > 50) {
            Alert.alert('Thông báo', 'Không nhập quá 50 kí tự');
        } else if (!alphanumeric(usernam)) {
            Alert.alert('Thông báo', 'Tên không hợp lệ');
        }
        else if (address && address.length > 100) {
            Alert.alert('Thông báo', 'Không nhập quá 100 kí tự');
        }
        else if (!cmnd1.test(phone)) {
            Alert.alert('Thông báo', 'Nhập lại số điện thoại');
        }
        // else if (!checkmail.test(email)) {
        //     Alert.alert('Thông báo', 'Email không hợp lệ');
        // }
        // else if (!alphanumeric(tennh)) {
        //     Alert.alert('Thông báo', 'Tên tài khoản gồm chữ và không có kỹ tự đặc biệt');
        // }
        else if (stk && stk.length > 20) {
            Alert.alert('Thông báo', 'Không nhập quá 20 kí tự');
        }
        else if (cmnd && cmnd.length > 20) {
            Alert.alert('Thông báo', 'Không nhập quá 20 kí tự');
        }
        else {
            UpdateInforAccount({
                USERNAME: Data1.USERNAME,
                USER_CTV: Data1.USERNAME,
                GENDER: gender,
                NAME: usernam.trim(),
                EMAIL: email,
                CITY_NAME: city.NAME,
                DISTRICT_NAME: district.NAME,
                ADDRESS: address,
                STK: stk,
                CMT: cmnd,
                TENTK: tentk,
                TENNH: tennh,
                AVATAR: this.state.imageAvatar,
                IDSHOP: 'http://banbuonthuoc.moma.vn',
                DOB: dayOfBirth,
                CMT: cmnd,
                IMG1: CMT_1,
                IMG2: CMT_2,
                WARD_NAME: '',
            })
                .then((res) => {
                    this.setState({ loading: false }) 
                    this.message = setTimeout(
                        () =>
                          AlertCommon("Thông báo", res.data.RESULT, () => {
                            this.props.navigation.popToTop();
                            this.props.navigation.navigate("ctvdow");
                          }),
                        10
                      );
                })
                .catch((err) => {
                    this.setState({ loading: false })
                    Alert.alert("Thông báo", `${err.data.RESULT}`)
                })
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
        launchImageLibrary(options, async (response) => {

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
    changeDistrictChild1 = (text) => {
        this.setState({ tennh: text })
      }
    componentDidMount() {
        const { id } = this.props.route.params;
        console.log("thissss", id);
        GetCTVDetail({
            USERNAME: id,
            USER_CTV: id,
            IDSHOP: 'http://banbuonthuoc.moma.vn',
        })
            .then((res) => {

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
        const { data, phone,showCalendar, address, CMT_1, CMT_2, typeaccout, dayOfBirth, stk, tentk, tennh, chinhanh, usernam, email, dateofbirth,
            city, districChild, district, cmnd, ctvdetail, dob, selectedValue, gender } = this.state;
        const { Data1 } = this.props.route.params;
        console.log("abccccc", ctvdetail);
        console.log("hay zo dataa1", Data1);
        return (
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: sizeWidth(100), backgroundColor: '#363636', marginTop: 10 }}>
                        <View style={{
                            justifyContent: 'center', alignContent: 'center'

                        }}>
                            <Text style={{ fontSize: 13, padding: 5, color: 'white' }}>Thông tin cá nhân</Text>
                        </View>
                    </View>
                    <View style={{ padding: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'gray' }}>Họ và tên<Text style={{ color: 'red' }}>*</Text></Text>
                            <TextInput
                                value={usernam}
                                onChangeText={(text) => { this.setState({ usernam: text }) }}
                                style={{ width: sizeWidth(60), height: sizeHeight(5.4), borderRadius: 5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8 }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'gray' }}>Loại tài khoản</Text>
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
                                        { label: 'Cộng tác viên', value: '1' },
                                        { label: 'Khách hàng', value: '0' },

                                    ]}
                                    defaultValue={selectedValue}
                                    placeholder="Cộng tác viên"
                                    containerStyle={{ height: sizeHeight(5.8) }}
                                    style={{ backgroundColor: '#EEEEEE', width: sizeWidth(60), borderColor: 'gray', borderWidth: 1 }}
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    dropDownStyle={{ backgroundColor: '#fafafa', width: sizeWidth(60) }}
                                    onChangeItem={item => this.setState({
                                        selectedValue: item.value
                                    })}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, zIndex: -1 }}>
                            <Text style={{ color: 'gray' }}>Số điện thoại<Text style={{ color: 'red' }}>*</Text></Text>
                            <TextInput
                                value={phone}
                                onChangeText={(a) => { this.setState({ phone: a }) }}
                                style={{ width: sizeWidth(60), height: sizeHeight(5.4), borderRadius: 5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8, borderRadius: 5 }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, zIndex: -2 }}>
                            <Text style={{ color: 'gray' }}>Email</Text>
                            <TextInput
                                value={email}
                                onChangeText={(a) => { this.setState({ email: a }) }}
                                style={{ width: sizeWidth(60), height: sizeHeight(5.4), borderRadius: 5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8 }}
                            />
                        </View>
                        <View style={styles.viewGender}>
                            <TouchableOpacity>
                                <Text style={styles.textDayTitle}>Ngày sinh</Text>
                                <Text
                                    style={styles.textDayOfBirth}
                                    onPress={() => this.setState({ showCalendar: true })}
                                >
                                    {dayOfBirth}{" "}
                                </Text>
                            </TouchableOpacity>
                            <View>
                                <Text style={[styles.textDayTitle, { textAlign: "right" }]}>
                                    Giới tính
                </Text>
                                <View style={styles.viewChildGender}>
                                    <Text
                                        onPress={() => {
                                            this.setState({ gender: 1 });
                                        }}
                                        style={[
                                            styles.textGender,
                                            {
                                                backgroundColor: gender == 1 ? "#fff" : "#ddd",
                                            },
                                        ]}
                                    >
                                        Nam
                  </Text>
                                    <Text
                                        onPress={() => {
                                            this.setState({ gender: 0 });
                                        }}
                                        style={[
                                            styles.textGender,
                                            {
                                                backgroundColor: gender == 0 ? "#fff" : "#ddd",
                                            },
                                        ]}
                                    >
                                        Nữ
                  </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'gray' }}>Tỉnh/TP</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate("ListCountries", {
                                        onSetCity: this.changeCity,
                                        NAME: "editctv",
                                    });
                                }}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: sizeWidth(60), height: sizeHeight(5.4), borderRadius: 5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8, paddingRight: 8 }}
                            >
                                <Text style={{ marginRight: 10 }}>{city.NAME == undefined ? "" : ctvdetail.CITY}</Text>
                                <IconComponets
                                    name="chevron-down"
                                    size={sizeFont(5)}
                                    color="#4a8939"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'gray' }}>Quận/huyện</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate("ListDistrict", {
                                        onSetDistrict: this.changeDistrict,
                                        GHN_TINHID: city.MATP,
                                        NAME: "Detail container",
                                    });
                                }}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: sizeWidth(60), height: sizeHeight(5.4), borderRadius: 5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8, paddingRight: 8 }}
                            >
                                <Text style={{ marginRight: 10 }}>{district.NAME == undefined ? "" : district.NAME}</Text>
                                <IconComponets
                                    name="chevron-down"
                                    size={sizeFont(5)}
                                    color="#4a8939"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'gray' }}>Phường/xã</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate("ListDistrictChild", {
                                        onSetDistrictChild: this.changeDistrictChild,
                                        GHN_TINHID: district.MAQH,
                                        NAME: "Detail container",
                                    });
                                }}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: sizeWidth(60), height: sizeHeight(5.4), borderRadius: 5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8, paddingRight: 8 }}
                            >
                                <Text style={{ marginRight: 10 }}>{districChild.NAME == undefined ? "" : districChild.NAME}</Text>
                                <IconComponets
                                    name="chevron-down"
                                    size={sizeFont(5)}
                                    color="#4a8939"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'gray' }}>Địa chỉ</Text>
                            <TextInput
                                value={ctvdetail.ADDRESS}
                                onChangeText={(text) => { this.setState({ address: text }) }}
                                style={{ width: sizeWidth(60), height: sizeHeight(5.4), borderRadius: 5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8 }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'gray' }}>Số CMND</Text>
                            <TextInput
                                value={ctvdetail.SO_CMT}
                                onChangeText={(text) => { this.setState({ cmnd: text }) }}
                                style={{ width: sizeWidth(60), height: sizeHeight(5.4), borderRadius: 5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8 }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 15, marginBottom: 15 }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ marginTop: 5 }}>Ảnh CMND mặt trước</Text>
                                <TouchableOpacity
                                    style={{ width: sizeWidth(40), height: sizeHeight(15), borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => { this.handleImage(2) }}
                                >
                                    <Image
                                        source={CMT_1 == null ? require('../../../assets/images/camera.png') : { uri: CMT_1 }}
                                        style={{ width: 100, height: 80 }}
                                    />

                                </TouchableOpacity>

                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ marginTop: 5 }}>Ảnh CMND mặt sau</Text>
                                <TouchableOpacity
                                    style={{ width: sizeWidth(40), height: sizeHeight(15), borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => { this.handleImage(3) }}
                                >
                                    <Image
                                        source={CMT_2 == null ? require('../../../assets/images/camera.png') : { uri: CMT_2 }}
                                        style={{ width: 100, height: 80 }}
                                    />

                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: sizeWidth(100), backgroundColor: '#363636', marginTop: 10 }}>
                        <View style={{
                            justifyContent: 'center', alignContent: 'center'

                        }}>
                            <Text style={{ fontSize: 13, padding: 5, color: 'white' }}>Tài khoản ngân hàng</Text>
                        </View>
                    </View>
                    <View style={{ padding: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'gray' }}>Số TK</Text>
                            <TextInput
                                value={stk}
                                onChangeText={(text) => { this.setState({ stk: text }) }}
                                style={{ width: sizeWidth(60), height: sizeHeight(5.4), borderRadius: 5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8 }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'gray' }}>Tên TK</Text>
                            <TextInput
                                value={tentk}
                                onChangeText={(text) => { this.setState({ tentk: text }) }}
                                style={{ width: sizeWidth(60), height: sizeHeight(5.4), borderRadius: 5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8 }}
                            />
                        </View>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'gray' }}>Ngân hàng</Text>
                            <TextInput
                                value={tennh}
                                onChangeText={(text) => { this.setState({ tennh: text }) }}
                                style={{ width: sizeWidth(60), height: sizeHeight(5.4), borderRadius: 5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8 }}
                            />
                        </View> */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'gray' }}>Ngân hàng</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate("Listbank", {
                                        onSetDistrictChild: this.changeDistrictChild1,
                                        NAME: "Detail container",
                                    });
                                }}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: sizeWidth(60), height: sizeHeight(5.4), borderRadius: 5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8, paddingRight: 8 }}
                            >
                                <Text style={{ marginRight: 10 }}>{tennh}</Text>
                                <IconComponets
                                    name="chevron-down"
                                    size={sizeFont(5)}
                                    color="#4a8939"
                                />
                            </TouchableOpacity>
                        </View>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'gray' }}>Chi nhánh</Text>
                            <TextInput
                                value={chinhanh}
                                onChangeText={() => {}}
                                style={{ width: sizeWidth(60), height: sizeHeight(5.4),borderRadius:5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8 }}
                            />
                        </View> */}
                    </View>
                    <DateTimePickerModal
                        isVisible={showCalendar}
                        mode="date"
                        date={new Date(moment("01/01/1990").format("DD/MM/YYYY"))}
                        maximumDate={new Date()}
                        onConfirm={(day) => {
                            this.handleDate(day);
                        }}
                        onCancel={() => this.setState({ showCalendar: false })}
                    />
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.update()
                            }}
                            style={{ backgroundColor: '#149CC6', width: sizeWidth(50), height: sizeHeight(5), justifyContent: 'center', alignItems: 'center',marginBottom:sizeHeight(10) }}
                        >
                            <Text style={{ color: '#fff' }}>CẬP NHẬT</Text>
                        </TouchableOpacity>
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
    viewGender: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: sizeWidth(92),
        alignSelf: "center",
        marginTop: sizeHeight(1),
    },
    textDayTitle: {
        fontSize: sizeFont(4),
        marginBottom: sizeHeight(1),
    },
    viewChildGender: {
        flexDirection: "row",
        backgroundColor: "#ddd",
        borderRadius: 6,
        paddingVertical: 2,
        paddingHorizontal: 2,
        width: sizeWidth(27),
    },
    textGender: {
        flex: 1,
        fontSize: sizeFont(4),
        borderRadius: 6,
        backgroundColor: "#fff",
        paddingHorizontal: sizeWidth(2),
        paddingVertical: sizeHeight(0.7),
        textAlign: "center",
        overflow: "hidden",
    },
    textDayOfBirth: {
        fontSize: sizeFont(4),
        borderRadius: 6,
        borderWidth: 0.8,
        //paddingHorizontal: sizeWidth(5),
        textAlign: "left",
        paddingRight: sizeWidth(8),
        borderColor: COLOR.COLOR_ICON,
        backgroundColor: "#fff",
        paddingLeft: sizeWidth(2),
        paddingVertical: sizeHeight(1),
    },
})
export default connect(
    mapStateToProps,
    null
)(EditCtv);