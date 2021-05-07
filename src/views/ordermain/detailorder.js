import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, ScrollView, TextInput, Alert, Modal } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { sizeFont, sizeHeight, sizeWidth } from '../../utils/helper/size.helper';
import { connect } from 'react-redux';
var numeral = require("numeral");
import { getDetailOrdered } from '../../service/order';
import { listStores, updateOrder } from '../../service/order';
var numeral = require("numeral");
import { getListOrder } from '../../service/order';
import { handleMoney } from "../../components/money";
import DropDownPicker from 'react-native-dropdown-picker';
import { COLOR } from '../../utils/color/colors';
import AdressShip from './adressShip';
import { SafeAreaView } from 'react-native';

class OrderMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Data: [],
            List: [],
            loading: false,
            setSelectedValue: 'Đã tiếp nhận',
            inDateEndPicker: false,
            selectedValue: 'Tất cả',
            monney: '',
            startTime: moment()
                .add(-100, "day")
                .format("DD/MM/YYYY"),
            endTime: '',
            modalVisible: false,
            tramtong: '',
            SUM: 0,
            payed: '',
            phuphi: '',
            city:
                this.props.authUser.CITY == null
                    ? ""
                    : {
                        NAME: this.props.authUser.CITY,
                        MATP: this.props.authUser.CITY_ID,
                    },
            district:
                this.props.authUser.DISTRICT == null
                    ? ""
                    : {
                        NAME: this.props.authUser.DISTRICT,
                        MAQH: this.props.authUser.DISTRICT_ID,
                    },
            districChild:
                this.props.authUser.WARD == null
                    ? ""
                    : {
                        NAME: this.props.authUser.WARD,
                        XAID: this.props.authUser.WARD_ID,
                    },

        }
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
        this.setState({
            endTime: moment(date).format("DD/MM/YYYY")
        })

        this.hideDatePicker2();
    };
    handleLoad = async () => {
        const { ID } = this.props.route.params;
        await getDetailOrdered({
            USERNAME: this.props.username,
            CODE_ORDER: ID,
            IDSHOP: 'F6LKFY',
        })
            .then((res) => {
                console.log("value======", res);
                if (res.data.ERROR == "0000") {
                    this.setState({
                        Data: res.data,
                        loading: true
                    })
                } else {
                    this.showToast(res);
                }
            })
            .catch((err) => {
            });
        await listStores({
            USERNAME: this.props.username,
            CODE_ORDER: ID,
            IDSHOP: 'F6LKFY',
        })
            .then((res) => {
                if (res.data.ERROR == "0000") {
                    this.setState({
                        List: res.data.INFO,
                        loading: true
                    })
                } else {
                    this.showToast(res);
                }
            })
            .catch((err) => {
            });
    }
    alertdonhang = () => {
        Alert.alert(
            "Thông báo",
            'Bạn có chắc chắn muốn huỷ đơn hàng này không?',
            [
                {
                    text: "Không",
                    style: "destructive",
                },
                {
                    text: "Có",
                    onPress: () => { this.handleBook() },
                    style: "default",
                },
            ],
            { cancelable: false }
        );
    }
    handleNumber = (item) => {
        const { status, authUser } = this.props;
        var resutl = {
            AMOUNT: "",
            PRICE: "",
            CODE_PRODUCT: "",
            MONEY: "",
            BONUS: "",
            ID_CODE_ORDER: "",
            ID_PRODUCT_PROPERTIES: "",
        };
        for (let i = 0; i < item.length; i++) {
            resutl.AMOUNT = resutl.AMOUNT + item[i].NUM + "#";
            resutl.CODE_PRODUCT = resutl.CODE_PRODUCT + item[i].CODE_PRODUCT + "#";
            resutl.PRICE = resutl.PRICE + item[i].PRICE + "#";
            resutl.MONEY =
                resutl.MONEY +
                handleMoney(status, item[i], authUser) * parseInt(item[i].NUM) +
                "#";
            resutl.BONUS = resutl.BONUS + item[i].PRICE_PROMOTION + "#";
            resutl.ID_PRODUCT_PROPERTIES =
                resutl.ID_PRODUCT_PROPERTIES + item[i].ID_PRODUCT_PROPERTIES + "#";
        }
        resutl.BONUS = resutl.BONUS.substring(0, resutl.BONUS.length - 1);
        resutl.AMOUNT = resutl.AMOUNT.substring(0, resutl.AMOUNT.length - 1);
        resutl.CODE_PRODUCT = resutl.CODE_PRODUCT.substring(
            0,
            resutl.CODE_PRODUCT.length - 1
        );
        resutl.MONEY = resutl.MONEY.substring(0, resutl.MONEY.length - 1);
        resutl.PRICE = resutl.PRICE.substring(0, resutl.PRICE.length - 1);
        resutl.ID_PRODUCT_PROPERTIES = resutl.ID_PRODUCT_PROPERTIES.substring(
            0,
            resutl.ID_PRODUCT_PROPERTIES.length - 1
        );
        return resutl;
    };
    handleBook = () => {
        const {
            city,
            district,
            address,
            List,
            setSelectedValue,
            text,
            monney,
            Data,
            endTime,
            payed,
            phuphi,
        } = this.state;
        var result = this.handleNumber(List);
        this.setState({
            loading: true,
        },
            async () => {
                var result;
                if (List.length != 0) {
                    result = await this.handleNumber(List);
                }
                updateOrder({
                    USERNAME: this.props.authUser.USERNAME,
                    CODE_PRODUCT: result.CODE_PRODUCT,
                    AMOUNT: result.NUM,
                    PRICE: result.PRICE,
                    MONEY: result.MONEY,
                    BONUS: result.COMMISSION_PRODUCT,
                    FULL_NAME: this.props.username,
                    MOBILE_RECEIVER: "0334595544",
                    ID_CITY: city.MATP,
                    ID_DISTRICT: district.MAQH,
                    ADDRESS: address,
                    CODE_ORDER: Data.ID_CODE_ORDER,
                    STATUS: 4,
                    EXTRA_SHIP: monney,
                    TIME_RECEIVER: endTime,
                    NOTE: text,
                    DISTCOUNT: '',
                    PAYED: payed,
                    SURCHARGE: phuphi,
                    IDSHOP: 'F6LKFY',
                })
                    .then((result) => {
                        console.log("sửa đơn hàng", result);
                        if (result.data.ERROR == "0000") {
                            // Alert.alert("Thông báo", `${result.data.RESULT}`)
                            this.props.navigation.navigate("Order")
                            this.props.route.params.reload()
                        } else {
                            // Alert.alert("Thông báo", `${result.data.RESULT}`)
                        }
                    })
                    .catch((error) => {
                    });
            })
    };
    handleTotlaMoney = () => {
        const { List, Data } = this.state;
        var sumMoney = 0;
        if (List.length != 0) {
            for (let i = 0; i < List.length; i++) {
                sumMoney +=
                    parseFloat(List[i].MONEY);
            }
        }
        return sumMoney;
    }
    handleTotlaMoneytt = () => {
        const { List, Data } = this.state;
        var sumMoney = 0;
        if (List.length != 0) {
            for (let i = 0; i < List.length; i++) {
                sumMoney +=
                    parseFloat(List[i].MONEY);
            }
            return parseFloat(sumMoney - Data.DISTCOUNT) + parseFloat(Data.EXTRA_SHIP);
        } else { }
    }
    handleTotlaMoney1 = () => {
        const { List, Data } = this.state;
        var sumMoney = 0;
        if (List.length != 0) {
            for (let i = 0; i < List.length; i++) {
                sumMoney +=
                    parseFloat(List[i].MONEY);
            }
            return parseFloat(sumMoney - Data.DISTCOUNT) + parseFloat(Data.EXTRA_SHIP) - parseFloat(Data.PAYED);
        } else { }
    }
    roseOrder = (a) => {
        const { List, Data } = this.state;
        var sumMoney = 0;
        var sumRose = 0;

        for (let i = 0; i < List.length; i++) {
            sumMoney += parseFloat(List[i].MONEY);
            sumRose += parseFloat(List[i].MONEY * List[i].COMISSION_PRODUCT * 0.01);
        }
        if (a == 1) {
            return sumRose;
        } else if (a == 2) {
            return sumMoney * Data.USER_COMMISSION * 0.01;
        } else {
            return Data.TOTAL_COMMISSION - (sumMoney * Data.USER_COMMISSION * 0.01 + sumRose)
        }

    }
    loinhuan = () => {
        this.handleTotlaMoney()
    }
    async componentDidMount() {
        await this.handleLoad();
    }
    render() {
        const { selectedValue, Data, loading, List, message, setSelectedValue, modalVisible, tramtong } = this.state;
        const { ID, STATUS, STANAME } = this.props.route.params;
        const { authUser } = this.props.authUser;
        var sumMoney = 0;
        var sumRose = 0;
        const sumAllMoney = () => {
            if (List.length != 0) {
                return sumMoney + parseFloat(Data.EXTRA_SHIP) - List[0].DISCOUNT;
            }

        }
        const discount = () => {
            if (List.length != 0) {
                for (let i = 0; i < List.length; i++) {
                    sumRose +=
                        parseFloat(List[i].PRICE) * List[i].COMISSION_PRODUCT * 0.01 + parseFloat(List[i].PRICE) * List[i].COMMISSION * 0.01;
                }
                return sumRose;
            } else { }
        }
        return (
            <SafeAreaView>
                <View>
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                        <View style={{ width: sizeWidth(90), height: sizeHeight(7), backgroundColor: '#4a8939', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: 10 }}>
                                            <View></View>
                                            <Text style={{ color: '#fff' }}>Chi tiết hoa hồng</Text>
                                            <TouchableOpacity

                                                onPress={() => {
                                                    this.setState({ modalVisible: !this.state.modalVisible });
                                                }}
                                            >
                                                <Image
                                                    source={require('../../assets/images/daux1.png')}
                                                    style={{ width: 25, height: 25 }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ margin: 10 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: sizeWidth(80), margin: 5 }}>
                                                <Text style={{ color: '#000' }}>Hoa hồng theo giá trị đơn hàng</Text>
                                                <Text>{numeral(this.roseOrder(3)).format("0,0")} đ</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: sizeWidth(80), margin: 5 }}>
                                                <Text style={{ color: '#000' }}>Hoa hồng theo mặt hàng</Text>
                                                <Text>{numeral(this.roseOrder(1)).format("0,0")} đ</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: sizeWidth(80), margin: 5 }}>
                                                <Text style={{ color: '#000' }}>Hoa hồng theo cộng tác viên</Text>
                                                <Text>{numeral(this.roseOrder(2)).format("0,0")} đ</Text>
                                            </View>
                                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: sizeWidth(80), margin: 5 }}>
                                            <Text style={{ color: '#000' }}>Hoa hồng CTV giới thiệu</Text>
                                            <Text>{ } đ</Text>
                                        </View> */}
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: sizeWidth(80), margin: 5, height: 1, backgroundColor: 'gray' }}></View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: sizeWidth(80), margin: 5 }}>
                                                <Text style={{ color: '#000' }}>Hoa hồng tổng</Text>
                                                <Text>{numeral(Data.TOTAL_COMMISSION).format("0,0")} đ</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    {!loading ? null : <View style={{ marginBottom: 20 }}>
                        <ScrollView showsHorizontalScrollIndicator={false}>
                            <View style={{ height: sizeHeight(5), flexDirection: 'column', justifyContent: 'center', paddingLeft: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Mã HĐ: {Data.ID_CODE_ORDER}</Text>
                            </View>
                            {this.props.authUser.GROUPS == 3 ? <View><View style={{ height: 35, paddingLeft: 10, backgroundColor: '#149CC6', justifyContent: 'center' }}>
                                <Text style={{ color: '#fff' }}>Thông tin CTV</Text>
                            </View>
                                <View style={{ padding: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text>{Data.FULL_NAME_CTV}</Text>
                                        <Text style={{ backgroundColor: '#4a8939', padding: 2, color: '#fff' }}>{this.props.authUser.GROUPS == 5 ? "CTV" : "KH"}</Text>
                                    </View>
                                    <Text>Mã CTV: {Data.USER_CODE}</Text>
                                    <Text>Số điện thoại: {Data.MOBILE_RECEIVER}</Text>
                                    <Text>Email: {Data.EMAIL}</Text>
                                </View></View> : null}
                            <View style={{ height: 35, backgroundColor: '#149CC6', justifyContent: 'center' }}>
                                <Text style={{ color: '#fff', paddingLeft: 10 }}>Nội dung đơn hàng</Text>
                            </View>
                            <View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 7 }}>
                                    <Image source={require("../../assets/images/clock.png")}
                                        style={{ width: 15, height: 15 }}
                                    />
                                    <Text style={{ fontStyle: 'italic' }}>{Data.CREATE_DATE}</Text>
                                </View>
                                {List.length === 0 ? null : List.map((Val, key) => (
                                    <View>
                                        <View key={key}>
                                            <View style={{ flexDirection: 'row', borderColor: '#CBD3D3', borderWidth: 1, margin: 5 }}>
                                                <View style={{ width: sizeWidth(30), borderRightColor: '#CBD3D3', borderRightWidth: 1, height: sizeHeight(15), alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image
                                                        source={{ uri: Val.IMAGE_COVER }}
                                                        style={{ width: sizeWidth(20), height: sizeHeight(10) }}
                                                    />
                                                </View>
                                                <View style={{ width: sizeWidth(70), padding: 5 }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: sizeFont(4) }}>{Val.PRODUCT_NAME}</Text>
                                                    <Text>Mã sản phẩm: {Val.CODE_PRODUCT}</Text>
                                                    <Text>Đơn giá: <Text style={{ color: 'red' }}>{numeral(Val.PRICE).format("0,0")} đ</Text></Text>
                                                    <Text>Số lượng: {Val.NUM}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                                <View style={{ flexDirection: 'row' }}>

                                    <View>
                                        <View style={{ flexDirection: 'row', width: sizeWidth(100), padding: 10, justifyContent: "space-between" }}>
                                            <Text>Tiền hàng</Text>
                                            <Text>
                                                {numeral(this.handleTotlaMoney()).format("0,0")} đ
                                    </Text>
                                        </View>
                                        {/* <View style={{ flexDirection: 'row', width: sizeWidth(100), padding: 10, justifyContent: "space-between" }}>
                                        <Text>Tiền giảm giá</Text>
                                        <Text style={{ color: '#149CC6', fontWeight: 'bold' }}>
                                            {List.length != 0 ? numeral(List[0].DISCOUNT).format("0,0") : null} đ
                                    </Text>
                                    </View> */}
                                        <View style={{ flexDirection: 'row', width: sizeWidth(100), padding: 10, paddingTop: 0, justifyContent: "space-between", alignItems: 'center' }}>
                                            <Text>Phí vận chuyển</Text>
                                            {this.props.authUser.GROUPS == 3 ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <TextInput
                                                    placeholder="Nhập phí vận chuyển"
                                                    onChangeText={(text) => { this.setState({ monney: text }) }}
                                                    style={{ width: sizeWidth(40), height: sizeHeight(4), borderColor: 'gray', borderWidth: 1, fontSize: 13, paddingLeft: 10, marginRight: 5 }}
                                                /><Text>đ</Text>
                                            </View> : <Text style={{ color: 'red' }}>{numeral(Data.EXTRA_SHIP).format("0,0")} đ</Text>}
                                        </View>
                                        {this.props.authUser.GROUPS == 8 ? null : <View style={{ flexDirection: 'row', width: sizeWidth(100), paddingLeft: 10, paddingRight: 10, paddingTop: 0, justifyContent: "space-between" }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text>Điểm tích luỹ</Text>

                                            </View>

                                            <Text>{numeral(Data.TOTAL_COMMISSION).format("0,0")} đ</Text>
                                        </View>}
                                        <Text style={{ fontSize: 13, fontWeight: '500', color: '#999999', fontStyle: 'italic', paddingLeft: 10, padding: 5 }}>Điểm tích luỹ sẽ được cộng sau khi đơn hàng hoàn thành</Text>
                                    </View>

                                </View>
                            </View>
                            <View>
                                <View style={styles.status}>
                                    <View style={styles.status1}><Text>Người nhận</Text></View>
                                    <View style={styles.status2}><Text>{Data.FULLNAME_RECEIVER}</Text></View>
                                </View>
                                <View style={styles.status}>
                                    <View style={styles.status1}><Text>Số điện thoại</Text></View>
                                    <View style={styles.status2}><Text>{Data.MOBILE_RECEIVER}</Text></View>
                                </View>
                                <View style={styles.status}>
                                    <View style={styles.status1}><Text>Nhận hàng tại</Text></View>
                                    <View style={styles.status2}><Text>{Data.MOBILE}</Text></View>
                                </View>

                                {/* <AdressShip Data={Data} city={this.props.route.params.CITY} /> */}
                            </View>

                            <View>
                                <View style={{ height: 35, backgroundColor: '#149CC6', justifyContent: 'center', marginTop: 10 }}>
                                    <Text style={{ color: '#fff', paddingLeft: 10 }}>Thanh toán</Text>
                                </View>
                                <View>
                                    {this.props.authUser.GROUPS == 8 ? null : <View>
                                        <View style={{ flexDirection: 'row', paddingLeft: 10, marginTop: 7, justifyContent: 'space-between', paddingRight: 10 }}>
                                            <Text>Sử dụng điểm tích luỹ</Text>
                                            <Text style={{ fontWeight: '500' }}>{numeral(Data.DISTCOUNT).format("0,0")} đ</Text>
                                        </View>
                                    </View>}
                                    <View style={{ flexDirection: 'row', paddingLeft: 10, marginTop: 7, justifyContent: 'space-between', paddingRight: 10 }}>
                                        <Text>Tổng tiền phải thanh toán</Text>
                                        <Text>{numeral(this.handleTotlaMoneytt()).format("0,0")} đ</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', paddingLeft: 10, marginTop: 7, justifyContent: 'space-between', alignItems: 'center', paddingRight: 10 }}>
                                        <Text>Đã thanh toán</Text>
                                        {this.props.authUser.GROUPS == 3 ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TextInput
                                                placeholder="Nhập số tiền đã thanh toán"
                                                onChangeText={(text) => { this.setState({ payed: text }) }}
                                                style={{ width: sizeWidth(60), height: sizeHeight(4), borderColor: 'gray', borderWidth: 1, fontSize: 13, paddingLeft: 10, marginRight: 5 }}
                                            /><Text>đ</Text>
                                        </View> : <Text>{numeral(Data.PAYED).format("0,0")} đ</Text>}
                                    </View>
                                    <View style={{ flexDirection: 'row', paddingLeft: 10, marginTop: 7, justifyContent: 'space-between', paddingRight: 10 }}>
                                        <Text>Số tiền còn phải trả</Text>
                                        <Text style={{ fontWeight: '500', color: 'red' }}>{numeral(this.handleTotlaMoney1()).format("0,0")} đ</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', paddingLeft: 10, marginTop: 7, justifyContent: 'space-between', paddingRight: 10 }}>
                                        <Text>Hình thức thanh toán</Text>
                                        <Text style={{ color: '#149CC6', fontWeight: 'bold' }}>{Data.PAYMENT_TYPE}</Text>
                                    </View>
                                </View>
                            </View>

                            {this.props.authUser.GROUPS == 3 ? <View>
                                <View style={{ height: 35, backgroundColor: '#149CC6', justifyContent: 'center', marginTop: 10 }}>
                                    <Text style={{ color: '#fff', paddingLeft: 10 }}>Lợi nhuận</Text>
                                </View>
                                <View style={{ flexDirection: 'row', paddingLeft: 10, marginTop: 7, justifyContent: 'space-between', alignItems: 'center', paddingRight: 10 }}>
                                    <Text>Phụ phí</Text>
                                    {this.props.authUser.GROUPS == 3 ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TextInput
                                            placeholder="Nhập số tiền đã thanh toán"
                                            onChangeText={(text) => { this.setState({ phuphi: text }) }}
                                            style={{ width: sizeWidth(60), height: sizeHeight(4), borderColor: 'gray', borderWidth: 1, fontSize: 13, paddingLeft: 10, marginRight: 5 }}
                                        /><Text>đ</Text>
                                    </View> : <Text>0 đ</Text>}
                                </View>
                                <View style={{ flexDirection: 'row', paddingLeft: 10, marginTop: 7, justifyContent: 'space-between', alignItems: 'center', paddingRight: 10 }}>
                                    <Text>Lợi nhuận đơn hàng</Text>
                                    <Text>0 đ</Text>
                                </View>


                            </View> : null}
                            <View style={{ height: 35, backgroundColor: '#149CC6', marginTop: sizeHeight(2), justifyContent: 'center' }}>
                                <Text style={{ color: '#fff', paddingLeft: 5 }}>Tình trạng đơn hàng</Text>
                            </View>
                            {/* trạng thái */}
                            <View style={{ padding: 5 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text>Trạng thái: </Text>
                                    {this.props.authUser.GROUPS == 3 ? <View
                                        style={{
                                            // The solution: Apply zIndex to any device except Android
                                            ...(Platform.OS !== 'android' && {
                                                zIndex: 10
                                            })

                                        }}
                                    >
                                        <DropDownPicker
                                            items={[
                                                { label: 'Đang xử lí', value: '2', disabled: STATUS == 1 ? false : true },
                                                { label: 'Đang chuyển', value: '3', disabled: STATUS == 1 || STATUS == 0 || STATUS == 7 || STATUS == 3 ? true : false },
                                                { label: 'Huỷ', value: '4', disabled: STATUS == 7 || STATUS == 0 ? true : false },
                                                { label: 'Hoàn thành', value: '0', disabled: STATUS == 1 || STATUS == 2 || STATUS == 0 ? true : false },
                                                { label: 'Đã giao hàng', value: '7', disabled: STATUS == 1 || STATUS == 2 || STATUS == 7 ? true : false }
                                            ]}
                                            placeholder={Data.STATUS_NAME}
                                            disabled={STATUS == 0 || STATUS == 4 ? true : false}
                                            containerStyle={{ height: sizeHeight(5.7) }}
                                            style={{ width: sizeWidth(40), borderColor: '#4a8939', borderWidth: 1 }}
                                            labelStyle={{
                                                fontSize: 14,
                                                textAlign: 'left',

                                            }}
                                            itemStyle={{
                                                justifyContent: 'flex-start',
                                            }}
                                            dropDownStyle={{ backgroundColor: '#fafafa', width: sizeWidth(40) }}
                                            onChangeItem={item => this.setState({
                                                setSelectedValue: item.value
                                            })}
                                        />
                                    </View> : <View>{Data.STATUS != 1 ? <View style={{
                                        width: sizeWidth(40), height: sizeHeight(5.6), borderColor: '#4a8939',
                                        borderRadius: 5, borderWidth: 1, justifyContent: 'center', paddingLeft: 10
                                    }}>
                                        <Text style={{ color: COLOR.MAIN }}>{Data.STATUS_NAME}</Text>
                                    </View> : <View style={styles.confix15}>
                                            <Text>{STANAME}</Text>
                                        </View>}</View>}
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, }}>
                                    <Text>Thời gian nhận hàng: </Text>
                                    {this.props.authUser.GROUPS == 3 ? <View style={styles.confix15}>
                                        <TouchableOpacity
                                            onPress={this.showDatePicker2}
                                            style={{ flexDirection: 'row', alignItems: 'center' }}
                                        >
                                            <Image
                                                source={require('../../assets/images/lich.png')}
                                                style={{ width: 20, height: 20 }}
                                            />
                                            <Text style={{ fontSize: 12 }}>{this.state.endTime}</Text>
                                        </TouchableOpacity>
                                        <DateTimePickerModal
                                            isVisible={this.state.inDateEndPicker}
                                            mode="date"
                                            onConfirm={this.handleConfirm2}
                                            onCancel={this.hideDatePicker2}
                                        />
                                    </View> : <View style={styles.confix15}><View style={{ flexDirection: 'column' }}>
                                        <Text>{Data.REQUEST_TIME_START}-{Data.REQUEST_TIME_END}</Text>
                                        <Text>Ngày: {Data.REQUEST_DATE}</Text>
                                    </View></View>}
                                </View>
                                {this.props.authUser.GROUPS == 3 ? <View style={{ zIndex: -1 }}>
                                    <Text>Ghi chú của CTV/ KH</Text>
                                    <View
                                        style={{ borderBottomColor: "#4B4C4B", borderWidth: 1, borderRadius: 5, paddingLeft: 10, height: sizeHeight(10) }}>
                                        <Text>{Data.NOTE}</Text>
                                    </View>
                                </View> : null}
                                {Data.NOTE_SHOP == null ? null : <View style={{ zIndex: -1, marginTop: 10 }}>
                                    <Text>Ghi chú của người bán hàng</Text>
                                    <TextInput
                                        value={Data.NOTE_SHOP}
                                        editable={this.props.authUser.GROUPS == 3 ? true : false}
                                        multiline={true}
                                        numberOfLines={4}
                                        onChangeText={(text) => this.setState({ text: text })}
                                        style={{ borderBottomColor: "#4B4C4B", borderWidth: 1, borderRadius: 5, paddingLeft: 10, height: sizeHeight(10) }}
                                    />
                                </View>}
                                {this.props.authUser.GROUPS == 3 ? <View>
                                    {STATUS == 4 || STATUS == 0 ? null : <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 10 }}>
                                        <TouchableOpacity
                                            onPress={() => { this.handleBook() }}
                                            style={{
                                                borderWidth: 1, borderColor: '#4a8939', paddingLeft: 30, paddingRight: 30, paddingTop: 10, paddingBottom: 10
                                                , backgroundColor: '#4a8939', alignItems: 'center', borderRadius: 5
                                            }}
                                        >
                                            <Text style={{ color: '#fff' }}>Cập nhật</Text>
                                        </TouchableOpacity>
                                    </View>}
                                </View> : <View>
                                        {STATUS == 1 ? <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 10 }}>
                                            <TouchableOpacity
                                                onPress={() => { this.alertdonhang() }}
                                                style={{
                                                    borderWidth: 1, borderColor: 'red', paddingLeft: 30, paddingRight: 30, paddingTop: 5, paddingBottom: 5
                                                    , backgroundColor: 'red', alignItems: 'center', borderRadius: 5
                                                }}
                                            >
                                                <Text style={{ color: '#fff' }}>Huỷ đơn hàng</Text>
                                            </TouchableOpacity>
                                        </View> : null}</View>}
                            </View>
                        </ScrollView>
                    </View>}
                </View>
            </SafeAreaView>
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
        fontSize: 15,
        borderColor: '#4a8939',
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 2,
        borderRadius: 15,
    },
    confix1: {
        marginTop: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    confix2: {
        borderColor: '#4a8939',
        borderWidth: 2,
        width: sizeWidth(40),
        height: sizeHeight(7),
        borderRadius: 15,
    },
    status: {
        flexDirection: 'row',
        borderRadius: 50,
        paddingLeft: 10
    },
    status1: {
        width: sizeWidth(30),
        borderColor: '#CCCECE',
        borderWidth: 1,
        height: sizeHeight(4),
        justifyContent: 'center',
        alignItems: 'baseline',
        paddingLeft: 10
    },
    status2: {
        width: sizeWidth(70),
        borderColor: '#CCCECE',
        borderWidth: 1,
        justifyContent: 'center',
        paddingLeft: 10
    },
    confix15: {
        justifyContent: 'center',
        width: sizeWidth(40),
        borderColor: '#4a8939',
        padding: 5,
        height: sizeHeight(5.6),
        borderWidth: 1,
        borderRadius: 5,

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "#fff",
        width: sizeWidth(90),
        height: sizeHeight(40),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,

    },
})

export default connect(
    mapStateToProps,
    null
)(OrderMain);
