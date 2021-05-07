import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard,
  Modal,
  Image,
  Platform,
  KeyboardAvoidingView,
  Clipboard,
} from "react-native";
import moment, { isMoment } from "moment";
import { connect } from "react-redux";
import { Provider } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Toast, Container } from "native-base";
import 'intl';
import 'intl/locale-data/jsonp/en';
import {
  sizeHeight,
  sizeFont,
  sizeWidth,
} from "../../../utils/helper/size.helper";
import {
  checkFullName,
  isVietnamesePhoneNumber,
  alphanumeric,
} from "../../../utils/check";
import { COLOR } from "../../../utils/color/colors";
import styles from "./style";
import { orderProduct, getListOrder } from "../../../service/order";
import { AlertCommon } from "../../../components/error";
import Loading from "../../../components/loading";
import { removeToCart, removeAllToCart } from "../../../action/orderAction";
import { getConfigCommission } from '../../../service/order';
import { GetCTVDetail } from '../../../service/rose';
import { GetbankInfo } from '../../../service/account';

var numeral = require("numeral");
class DetailAddressCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneText: this.props.authUser.MOBILE,
      userName: this.props.authUser.FULL_NAME,
      idStore: "",
      levelStore: "",
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
      address: this.props.authUser.ADDRESS,
      passport: "",
      account: "",
      nameAccount: "",
      nameBank: "",
      showAlert: false,
      codeuser: '',
      checked: true,
      bankInfo: [],
      setday: '',
      calendar: [],
      dataTime: '',
      active: 100,
      showCalendar: false,
      showCalendar1: false,
      showCalendar2: false,
      note: "",
      ROSE: this.props.route.params.ROSE,
      SUM: this.props.route.params.SUM,
      message: "",
      loading: false,
      value: false,
      shipcode: false,
      Numbercode: 'CK',
      pickDate: ['6h-7h', '9h30-10h30', '17h-18h'],
      submitDate: 100,
      money: '',
      dateAdd: '',
      viDay: ['Hôm nay', 'Ngày mai', '', '', '', '', ''],
      timeAdd: '',
      timeAdd1: '',
      moneyAll: '',
      modalVisible: false,
      tramtong: '',
      check: this.props.authUser.GROUPS == 5 ? true : false,
      checktinh: this.props.authUser.GROUPS == 5 ? true : false,
      checkquan: this.props.authUser.GROUPS == 5 ? true : false,
      checkxa: this.props.authUser.GROUPS == 5 ? true : false,
    };
    this.message = "";
  }
  changeCity = (text) => {
    if (text == "- tất cả -") {
      this.setState({ city: "", district: "", districChild: "" });
    } else {
      this.setState({ city: text, district: "", districChild: "", checktinh: !this.state.checktinh }, () => {
      });
    }
  };
  changeDistrict = (text) => {
    if (text == "- tất cả -") {
      this.setState({ district: "", districChild: "" });
    } else this.setState({ district: text, districChild: "", checkquan: !this.state.checkquan });
  };
  handleTime = (item) => {
    this.setState({ showCalendar1: false }, () =>
      this.setState({ timeAdd: moment(item).format("HH:mm") })
    );
  };
  handleTime1 = (item) => {
    this.setState({ showCalendar2: false }, () =>
      this.setState({ timeAdd1: moment(item).format("HH:mm") })
    );
  };
  changeDistrictChild = (text) => {
    if (text == "- tất cả -") {
      this.setState({ districChild: "" });
    } else this.setState({ districChild: text, checkxa: !this.state.checkxa });
  };
  checkTime = (a, b) => {
    var start = a;
    var end = b;
    var datePart1 = start.split("/");
    var datePart2 = end.split("/");
    var dateObject1 = new Date(+datePart1[2], datePart1[1] - 1, +datePart1[0]);
    var dateObject2 = new Date(+datePart2[2], datePart2[1] - 1, +datePart2[0]);
    return dateObject2 - dateObject1;
  }
  checkTimeOut = (active) => {
    var datepre = new Date();
    if (active == 0) {
      this.setState({
        timeAdd: '6:00',
        timeAdd1: '7:00'
      })
    } else if (active == 1) {
      this.setState({
        timeAdd: '9:30',
        timeAdd1: '10:30'
      })
    } else {
      this.setState({
        timeAdd: '17:00',
        timeAdd1: '18:00'
      })
    }
  }
  handleNumber = (item) => {
    const { status, authUser } = this.props;
    var resutl = {
      AMOUNT: "",
      PRICE: "",
      CODE_PRODUCT: "",
      MONEY: "",
      BONUS: "",
      ID_PRODUCT_PROPERTIES: "",
    };
    var MONEY1 = '';
    var MONEY2 = '';
    if (item.END_PROMOTION && this.checkTime(item.START_PROMOTION, item.END_PROMOTION) < 0) {
      for (let i = 0; i < item.length; i++) {
        resutl.AMOUNT = resutl.AMOUNT + item[i].qualyty + "#";
        resutl.CODE_PRODUCT = resutl.CODE_PRODUCT + item[i].CODE_PRODUCT + "#";
        resutl.BONUS = resutl.BONUS + item[i].PRICE * item[i].COMISSION_PRODUCT * 0.01 + "#";
        resutl.ID_PRODUCT_PROPERTIES =
          resutl.ID_PRODUCT_PROPERTIES + item[i].ID_PRODUCT_PROPERTIES + "#";
      }
    } else {
      for (let i = 0; i < item.length; i++) {
        resutl.AMOUNT = resutl.AMOUNT + item[i].qualyty + "#";
        resutl.CODE_PRODUCT = resutl.CODE_PRODUCT + item[i].CODE_PRODUCT + "#";
        resutl.BONUS = resutl.BONUS + item[i].PRICE_PROMOTION * item[i].COMISSION_PRODUCT * 0.01 + "#";
        resutl.ID_PRODUCT_PROPERTIES =
          resutl.ID_PRODUCT_PROPERTIES + item[i].ID_PRODUCT_PROPERTIES + "#";
      }
    }
    resutl.BONUS = resutl.BONUS.substring(0, resutl.BONUS.length - 1);
    resutl.AMOUNT = resutl.AMOUNT.substring(0, resutl.AMOUNT.length - 1);
    resutl.CODE_PRODUCT = resutl.CODE_PRODUCT.substring(0, resutl.CODE_PRODUCT.length - 1);
    resutl.PRICE = this.props.route.params.PRICEALL;
    resutl.ID_PRODUCT_PROPERTIES = resutl.ID_PRODUCT_PROPERTIES.substring(
      0,
      resutl.ID_PRODUCT_PROPERTIES.length - 1
    );

    return resutl;
  };
  endMoney = () => {
    const { listItem } = this.props;
    const { money, codeuser, SUM } = this.state;
    const tien = Number(money);
    var sumMoney = codeuser.BALANCE;
    var number;
    if (tien < sumMoney) {
      number = SUM - money;
    }
    else if (tien > SUM) {
      number = 0;
    }
    return number;
  }
  endRose = () => {
    const { money } = this.state;
    const { listItem } = this.props;
    var sumMoney = this.allOne(listItem);

    if (money > sumMoney) {
      return 0;
    } else {
      return numeral(sumMoney - money).format(
        "0,0"
      );
    }
  }
  handleLoad = () => {
    getListOrder({
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
        console.log("loaddiinggggg=====", res);
        if (res.data.ERROR == "0000") {
        } else {

        }
      })
      .catch((err) => {

      });
  }
  onMua = () => {
    const { listItem } = this.props.route.params;
    console.log({ listItem });
    var monney1 = "";
    var monney2 = "";
    for (let i = 0; i < listItem.length; i++) {
      if (listItem[i].END_PROMOTION && this.checkTime(listItem[i].START_PROMOTION, listItem[i].END_PROMOTION) > 0) {
        monney1 += parseInt(listItem[i].PRICE_PROMOTION) * listItem[i].qualyty + '#';
      } else {
        monney2 += parseInt(listItem[i].PRICE) * listItem[i].qualyty + '#';
      }
    }
    this.setState({
      moneyAll: monney1 + monney2,
    });
  }
  handleBook = () => {
    const {
      phoneText,
      userName,
      dateAdd,
      timeAdd,
      timeAdd1,
      Numbercode,
      active,
      submitDate,
      money,
      codeuser,
      moneyAll, pickDate, SUM
    } = this.state;
    const { authUser, navigation } = this.props;
    const { item, listItem } = this.props.route.params;

    if (active == 100) {
      Alert.alert('Thông báo', 'Bạn chưa chọn ngày')
    } else if (submitDate == 100 && pickDate.length == 0) {
      Alert.alert('Thông báo', 'Hết giờ đặt hàng cho ngày này, vui lòng chọn khung giờ tiếp theo')
    } else if (Number(money) > Number(codeuser.BALANCE) || Number(money) > Number(SUM)) {
      Alert.alert('Thông báo', 'Vui lòng sử dụng điểm tích luỹ không vượt quá số điểm trong tài khoản và giá trị đơn hàng')
    }
    else if (submitDate == 100) {
      Alert.alert('Thông báo', 'Bạn chưa chọn thời gian')
    }
    else {
      var setDay = dateAdd.slice(8, 10);
      var setMoth = dateAdd.slice(5, 7);
      var setYear = dateAdd.slice(0, 4);
      var main = `${setDay}/${setMoth}/${setYear}`;
      console.log("hí main", main)
      Keyboard.dismiss();
      this.setState(
        {
          loading: true,
          message: "",
        },
        async () => {
          var result;
          if (item == undefined) {
            result = await this.handleNumber(listItem);
          }
          else {
            result = await this.handleNumber(item);
          }
          orderProduct({
            USERNAME: authUser.USERNAME,
            CODE_PRODUCT: result.CODE_PRODUCT,
            AMOUNT: result.AMOUNT,
            PRICE: result.PRICE,
            MONEY: moneyAll.substring(0, moneyAll.length - 1),
            BONUS: result.BONUS,
            REQUEST_DATE: main,
            REQUEST_TIME_START: timeAdd,
            REQUEST_TIME_END: timeAdd1,
            FULL_NAME: userName,
            DISTCOUNT: money,
            MOBILE_RECEIVER: phoneText,
            ID_CITY: '01',
            PAYMENT_TYPE: Numbercode,
            ID_DISTRICT: '021',
            ADDRESS: authUser.ADDRESS,
            ID_WARD: '',
            IDSHOP: 'F6LKFY',
          })
            .then((result) => {
              console.log("abccccccx", result)
              if (result.data.ERROR == "0000") {
                this.setState(
                  {
                    loading: false,
                    message: result.data.RESULT,
                  },
                  () => {
                    this.props.removeAllToCart();
                    return AlertCommon("Thông báo", `${result.data.RESULT}`, () => {
                      navigation.popToTop();
                      navigation.navigate("Order")
                    });
                  }
                );
              } else {
                this.setState(
                  {
                    loading: false,
                    message: result.data.RESULT,
                  },
                  () => {
                    return AlertCommon("Thông báo", `${result.data.RESULT}`, () =>
                      this.props.navigation.navigate("home")
                    );
                  }
                );
              }
            })
            .catch((error) => {
            });
        }
      );
    }

  };
  getCalendar = () => {
    var calendar = [];
    for (let i = 0; i < 7; i++) {
      calendar = [...calendar, { time: moment().add(i, 'days').toString(), active: false }]
    }
    this.setState({
      calendar,
    })
  }
  checkDay = (active, setday) => {
    var x = moment().hours();
    var y = moment().minute();
    var timeht = x * 60 * 60 + y * 60;
    var timeMain = setday != undefined ? setday : 0;
    var xxxx = setday != undefined ? JSON.stringify(new Date(setday.time)) : null;
    var date = setday != undefined ? xxxx.slice(1, 11) : null;
    if (active == 0) {
      if (timeht < 2 * 60 * 60) {
        this.setState({
          pickDate: ['6h-7h', '9h30-10h30', '17h-18h'],
          dateAdd: date,
        })
      } else if (2 * 60 * 60 < timeht && timeht < (5 * 60 * 60 + 30 * 60)) {
        this.setState({
          pickDate: ['', '9h30-10h30', '17h-18h'],
          dateAdd: date,
        })
      } else if (timeht > (5 * 60 * 60 + 30 * 60) && timeht < 13 * 60 * 60) {
        this.setState({
          pickDate: ['', '', '17h-18h'],
          dateAdd: date,
        })
      } else {
        this.setState({
          pickDate: [],
          dateAdd: date,
        })
      }
    } else {
      this.setState({
        pickDate: ['6h-7h', '9h30-10h30', '17h-18h'],
        dateAdd: date,
      })
    }
  }
  checkError = () => {
    const {
      phoneText,
      userName,
      city,
      district,
      districChild,
      address,
      note,
      showAlert,
      SUM,
      value
    } = this.state;
    if (value) {
      return true;
    } else {
      if (
        phoneText == "" ||
        userName == "" ||
        city == "" ||
        district == "" ||
        address == ""
      ) {
        return false;
      } else {
        return true;
      }
    }

  };
  shipCode = () => {
    this.setState({
      city: '',
      district: '',
      districChild: '',
      address: '',
    })
  }
  handleTotlaMoney = (item) => {
    var sumMoney = 0;
    return numeral(this.state.SUM).format(
      "0,0"
    );
  };
  roseMoney = (item) => {
    var sumMoney = 0;
    for (let i = 0; i < item.length; i++) {
      sumMoney +=
        parseFloat(item[i].HHMAX);
    }

    return numeral(sumMoney).format(
      "0,0"
    );
  }
  roseDetail = (item) => {
    const { tramtong } = this.state;
    var sumMoney1;
    var a = 1;
    if (a = 1 && tramtong != undefined) {
      sumMoney1 = this.state.SUM * tramtong * 0.01;
      return sumMoney1;
    } else {
      return 0;
    }
  }
  roseDetail2 = (item) => {
    var sumMoney1 = 0;
    var a = 1;
    if (a = 1) {
      sumMoney1 = this.state.SUM * 0.01 * this.state.codeuser.COMISSION;
      return sumMoney1;
    }
  }

  allOne = (a) => {
    var all = parseFloat(this.roseDetail(a)) + parseFloat(this.roseDetail2(a));
    return all;
  }
  confixIndex = (a) => {
    if (a == 0) {
      return "Hôm nay"
    } else if (a == 1) {
      return "Ngày mai"
    } else if (a == 2) {
      return "Ngày kia"
    } else {
      return ''
    }
  }
  checkMOnth = (text) => {
    if (text == 'Jan') {
      return '1'
    } else if (text == 'Feb') {
      return '2'
    } else if (text == 'Mar') {
      return '3'
    } else if (text == 'Apr') {
      return '4'
    } else if (text == 'May') {
      return '5'
    } else if (text == 'Jun') {
      return '6'
    } else if (text == 'Jul') {
      return '7'
    } else if (text == 'Aug') {
      return '8'
    } else if (text == 'Sep') {
      return '9'
    } else if (text == 'Oct') {
      return '10'
    } else if (text == 'Nov') {
      return '11'
    } else {
      return '12'
    }
  }
  componentDidMount() {
    this.checkDay();
    this.getCalendar();
    this.onMua();
    getConfigCommission({
      USERNAME: this.props.authUser.USERNAME,
      VALUES: this.state.SUM,
      IDSHOP: 'F6LKFY'
    })
      .then((res) => {
        this.setState({
          tramtong: res.data.VALUE,
        })
      })
      .catch(() => {
      })
    GetCTVDetail({
      USERNAME: this.props.authUser.USERNAME,
      USER_CTV: this.props.authUser.USERNAME,
      IDSHOP: 'F6LKFY'
    })
      .then((res) => {
        this.setState({
          codeuser: res.data
        })
      })

    GetbankInfo({
      IDSHOP: 'F6LKFY'
    })
      .then((res) => {
        this.setState({
          bankInfo: res.data.INFO
        })
      })
  }
  render() {
    const {
      value,
      shipcode,
      codeuser,
      money,
      active,
      showCalendar2,
      showCalendar,
      showCalendar1,
      calendar,
      bankInfo,
      submitDate,
      pickDate,
      dateAdd,
      SUM,
      setday,
      moneyAll
    } = this.state;
    const { listItem, authUser } = this.props;
    var a = this.endMoney();

    console.log("list dateAdd======", dateAdd);
    console.log("calendar=====", calendar);
    var abc = codeuser.BALANCE;
    return (
      <ScrollView>
        <View>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            paddingBottom: sizeHeight(10)
          }}
        >
          <View style={{ marginTop: 10 }}>
            <View style={styles.infor}>
              <Text style={styles.textInfor}>Giá trị hàng hóa</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: sizeHeight(2),
            }}
          >
            <View style={styles.viewMoney}>
              <Text style={styles.textTitle}>Giá trị đơn hàng:</Text>
              <Text
                style={[
                  styles.textMoney,
                ]}
              >
                {this.handleTotlaMoney(listItem)} đ
              </Text>
            </View>
            {this.props.authUser.GROUPS == 8 ? null : <View style={styles.viewMoney}>
              <Text style={styles.textTitle}>Điểm thưởng: </Text>
              <Text
                style={[
                  styles.textMoney,
                  {
                    color: '#4b4c4b',
                  },
                ]}
              >
                {numeral(this.allOne(listItem)).format("0,0")} đ
              </Text>
            </View>}
            <View style={styles.infor}>
              <Text style={styles.textInfor}>Chọn khung giờ nhận hàng</Text>
            </View>
            <View style={{ alignSelf: "center" }}>
              <View>
                {value ? null : <View style={{ alignSelf: "center", marginTop: sizeHeight(1) }}>
                  <View>
                    <View style={{ width: sizeWidth(90), marginTop: sizeHeight(2), }}>

                      <ScrollView horizontal={true}>
                        <View style={{ flexDirection: 'row', height: sizeHeight(15), justifyContent: 'space-between' }}>
                          {calendar && calendar.map((val, index) => (
                            <TouchableOpacity
                              onPress={() => {
                                this.setState({
                                  active: index,
                                  setday: val
                                }),
                                  this.checkDay(index, val)
                              }}
                            >
                              < View style={{ backgroundColor: active == index ? COLOR.HEADER : '#f0f1f5', width: sizeWidth(18), height: sizeHeight(11), padding: 5, borderRadius: 5, marginRight: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 5 }}>
                                  <View style={{}}><Text style={{ color: active == index ? '#fff' : '#999999', fontSize: sizeFont(4), fontWeight: '500' }}>{val.time.slice(0, 3)}</Text></View>
                                  <View style={{ width: 2, backgroundColor: '#fff', height: sizeHeight(2.5) }}></View>
                                  <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: active == index ? '#fff' : '#999999', fontSize: sizeFont(4), fontWeight: '500' }}>{this.checkMOnth(val.time.slice(4, 7))}</Text></View>
                                </View>
                                <View style={{ borderTopColor: '#fff', borderTopWidth: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: sizeHeight(7) }}>
                                  <Text style={{ color: active == index ? '#fff' : '#999999', fontSize: sizeFont(5), fontWeight: 'bold', }}>{val.time.slice(8, 10)}</Text>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ color: active == index ? COLOR.HEADER : '#231f20', fontSize: sizeFont(3.5) }}>{this.confixIndex(index)}</Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          ))}
                        </View>
                        {/* <View style={{flexDirection:'row'}}>
                          {this.state.viDay.map((val, index) => (
                            <View>
                              <Text>{val}</Text>
                            </View>
                          ))}
                        </View> */}
                      </ScrollView>

                      {pickDate.length == 0 ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: sizeHeight(5) }}>
                        <Text style={{ fontWeight: '500' }}>Hết giờ đặt hàng cho ngày này, vui lòng chọn khung giờ tiếp theo</Text>
                      </View> : <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                          {pickDate.map((val, index) => (
                            <TouchableOpacity
                              onPress={() => {
                                this.setState({
                                  submitDate: index
                                }),
                                  this.checkTimeOut(index)
                              }}
                              style={{ flexDirection: 'row' }}
                            >
                              {val == '' ? null : <View style={{ height: sizeHeight(4), backgroundColor: submitDate == index ? COLOR.HEADER : '#f0f1f5', justifyContent: 'center', alignItems: 'center', borderRadius: 5, paddingLeft: 20, paddingRight: 20, borderRadius: 50 }}>
                                <Text style={{ color: submitDate == index ? '#fff' : '#999999', fontSize: sizeFont(3.5), fontWeight: '400' }}>{val}</Text>
                              </View>}
                            </TouchableOpacity>
                          ))}
                        </View>}
                    </View>
                  </View>
                </View>}
              </View>
            </View>
            {this.props.authUser.GROUPS == 8 ? null : <View style={{ marginTop: 10 }}>
              <View style={styles.infor}>
                <Text style={styles.textInfor}>Thanh toán</Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ paddingLeft: 20, color: '#4b4c4b', paddingBottom: 10 }}>Sử dụng điểm tích luỹ trừ vào số tiền thanh toán</Text>
                <View style={{ alignItems: 'center' }}>
                  <TextInput
                    style={{ borderColor: '#DDD', borderWidth: 1, width: sizeWidth(90), paddingLeft: 10, height: sizeHeight(6) }}
                    onChangeText={(text) => this.setState({
                      money: text
                    })
                    }
                    value={money}
                    keyboardType='numeric'
                    placeholder="Nhập số tiền"
                  />
                  <Text style={{ width: sizeWidth(90), fontStyle: 'italic', marginTop: 5, marginBottom: 5, color: '#4b4c4b' }}>Quý khách có thể trừ tối đa không quá số điểm trong tài khoản là ({numeral(codeuser.BALANCE).format(
                    "0,0"
                  )} đ) và không vượt quá giá trị đơn hàng</Text>
                </View>
                <View style={{ margin: sizeWidth(5), }}>
                  <View style={styles.viewMoney}>
                    <Text style={{ fontSize: sizeFont(4), color: '#4b4c4b', fontWeight: 'bold' }}>Số tiền còn phải thanh toán:</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: sizeFont(4), color: COLOR.MAIN }}>{numeral(this.endMoney()).format(
                      "0,0"
                    )} đ</Text>
                  </View>
                  {/* <View style={styles.viewMoney}>
                    <Text><Text style={{ fontSize: sizeFont(4), color: '#4b4c4b', fontWeight: 'bold' }}>Hoa hồng sau khi giảm trừ</Text> { }</Text>
                    <Text style={{ color: "#149CC6", fontWeight: 'bold', fontSize: sizeFont(4), color: '#ff0613' }}>{this.endRose()} đ</Text>
                  </View> */}

                </View>
              </View>
            </View>}
            <View
              style={{
                marginTop: sizeHeight(2),
              }}
            >
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>Hình thức thanh toán</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', margin: 10 }}>
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() => { this.setState({ shipcode: true, Numbercode: 'COD' }) }}
                >
                  <View style={{ borderRadius: 50, width: 20, height: 20, borderColor: '#4a8939', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: `${shipcode ? '#4a8939' : 'white'}`, borderRadius: 50, width: 12, height: 12 }}></View>
                  </View>
                  <Text style={{ marginLeft: 10 }}>Tiền mặt</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row' }}
                  onPress={() => { this.setState({ shipcode: false, Numbercode: 'CK' }) }}
                >
                  <View style={{ borderRadius: 50, width: 20, height: 20, borderColor: '#4a8939', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: `${shipcode ? 'white' : '#4a8939'}`, borderRadius: 50, width: 12, height: 12 }}></View>
                  </View>
                  <Text style={{ marginLeft: 10 }}>Chuyển khoản</Text>
                </TouchableOpacity>
              </View>
              {shipcode ? null : <View style={{ paddingLeft: sizeWidth(7), paddingRight: sizeWidth(5) }}>
                <Text>Thông tin tài khoản</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                  <Text>Tên chủ TK: {bankInfo.TENTK}</Text>
                  <TouchableOpacity
                    onPress={
                      () => Clipboard.setString('Nguyễn Văn Nam'),
                      () => Toast.show({
                        text: 'Text đã được copy !',
                        buttonText: 'Ok'
                      })
                    }
                  >
                    <Text style={{ padding: 1, backgroundColor: '#CECCCD' }}>copy</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                  <Text>Số tài khoản: {bankInfo.STK}</Text>
                  <TouchableOpacity
                    onPress={
                      () => Clipboard.setString('Nguyễn Văn Nam'),
                      () => Toast.show({
                        text: 'Text đã được copy !',
                        buttonText: 'Ok'
                      })
                    }
                  >
                    <Text style={{ padding: 1, backgroundColor: '#CECCCD' }}>copy</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                  <View style={{ width: sizeWidth(60) }}>
                    <Text >Ngân hàng: {bankInfo.TENNH}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={
                      () => Clipboard.setString('Vietcombank chi nhánh Hà Thành'),
                      () => Toast.show({
                        text: 'Text đã được copy !',
                        buttonText: 'Ok'
                      })
                    }
                  >
                    <Text style={{ padding: 1, backgroundColor: '#CECCCD' }}>copy</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                  <View style={{ width: sizeWidth(60) }}>
                    <Text >Chi nhánh: {bankInfo.CHINHANHNH}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={
                      () => Clipboard.setString('Vietcombank chi nhánh Hà Thành'),
                      () => Toast.show({
                        text: 'Text đã được copy !',
                        buttonText: 'Ok'
                      })
                    }
                  >
                    <Text style={{ padding: 1, backgroundColor: '#CECCCD' }}>copy</Text>
                  </TouchableOpacity>
                </View>
              </View>}
            </View>
            <View style={{ alignSelf: "center", marginTop: sizeHeight(8) }}>
              <TouchableOpacity
                disabled={this.checkError() == false ? true : false}
                style={[
                  styles.touchOrder,
                  {
                    backgroundColor:
                      this.checkError() == false ? "#999" : COLOR.HEADER,
                  },
                ]}
                onPress={this.handleBook}
              >
                <Text style={{ color: "#FFF", textAlign: "center", fontWeight: '500' }}>
                  ĐẶT HÀNG
                </Text>
              </TouchableOpacity>
            </View>
            <DateTimePickerModal
              isVisible={showCalendar}
              mode="date"
              date={new Date(moment("01/01/2021").format("DD/MM/YYYY"))}
              onConfirm={(day) => {
                this.handleDate(day);
              }}
              onCancel={() => this.setState({ showCalendar: false })}
            />
            <DateTimePickerModal
              isVisible={showCalendar1}
              mode="time"
              maximumDate={new Date()}
              onConfirm={(day) => {
                this.handleTime(day);
              }}
              onCancel={() => this.setState({ showCalendar1: false })}
            />
            <DateTimePickerModal
              isVisible={showCalendar2}
              mode="time"
              maximumDate={new Date()}
              onConfirm={(day) => {
                this.handleTime1(day);
              }}
              onCancel={() => this.setState({ showCalendar2: false })}
            />
          </View>

          {this.state.loading ? (
            <View style={{ alignSelf: "center" }}>
              <Loading />
            </View>
          ) : null}
        </View>
      </ScrollView >
    );
  }
}
const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    username: state.authUser.username,
    listItem: state.order.listItem,
    idshop: state.product.database,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { removeAllToCart: (text) => dispatch(removeAllToCart()) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailAddressCart);