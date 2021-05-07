import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { GetCTVDetail, Getwithdrawal } from '../../../service/rose';
import { connect } from 'react-redux';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import {
  sizeWidth,
  sizeFont,
  sizeHeight,
} from "../../../utils/helper/size.helper"
import Loading from '../../../components/loading';
const numeral = require("numeral");
class Subchilditem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Data: [],
      data: [],
      showCalendar: false,
      startTime: moment()
        .add(-100, "day")
        .format("DD/MM/YYYY"),
      endTime: moment(new Date()).format("DD/MM/YYYY"),
      isDatePickerVisible: false,
      inDateEndPicker: false,
    }
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
    this.setState({
      startTime: moment(date).format("DD/MM/YYYY")
    })

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
    this.setState({
      endTime: moment(date).format("DD/MM/YYYY")
    })

    this.hideDatePicker2();
  };
  handleLoad = () => {
    const { ID_NAME, ID_CODE } = this.props.route.params;
    Getwithdrawal({
      USERNAME: ID_NAME,
      USER_CTV: ID_NAME,
      START_TIME: this.state.startTime,
      END_TIME: this.state.endTime,
      PAGE: 1,
      NUMOFPAGE: 10,
      IDSHOP: "F6LKFY",
    })
      .then((res) => {
        if (res.data.ERROR == "0000") {
          this.setState({
            Data: res.data.INFO
          })
        } else {
          this.showToast(res);
        }
      })
      .catch((err) => {
      });
  }
  componentDidMount() {
    this.handleLoad();
    const { authUser, navigation, status, username } = this.props;
    const { ID_NAME, ID_CODE } = this.props.route.params;
    console.log("usernam_status", username)
    GetCTVDetail({
      USERNAME: username,
      USER_CTV: ID_NAME,
      IDSHOP: "F6LKFY"
    })
      .then((result) => {
        if (result.data.ERROR === "0000") {
          this.setState({ data: result.data },
          );
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });

    navigation.setParams({
      NAVIGATE: () => null,
    });
  }
  render() {
    const { data, showCalendar, loading } = this.state;
    const { username } = this.props;
    const { ID_NAME, ID_CODE } = this.props.route.params;
    return (
      <View>
        <View style={styles.viewText}>
          <Text style={{ fontSize: 16 }}>Tên CTV: {data.USERNAME}</Text>
          <Text style={{ fontSize: 16 }}>Mã user: {data.USER_CODE}</Text>
          <Text style={{ fontSize: 16 }}>Số điện thoại: {data.MOBILE}</Text>
          <Text style={{ fontSize: 16 }}>Email: {data.EMAIL}</Text>
          <View style={{ height: 50, width: '100%' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center',justifyContent:'center' }}>
                <Text style={{ fontSize: 18 }}>Số dư hoa hồng hiện tại: </Text>
                <Text style={{ fontSize: 22, color: '#FF5C03', alignItems: 'center', alignSelf: 'center', fontWeight: 'bold', paddingLeft: 5 }}>
                  {numeral(data.BALANCE).format("0,0")}đ
                      </Text>
              </View>
              <View>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30,alignItems:'center' }}>
              <View style={styles.confix}>
                <TouchableOpacity
                  onPress={this.showDatePicker1}
                >
                  <Text style={{fontSize:12}}>Từ ngày</Text>
                  <Text style={{fontSize:12}}>{this.state.startTime}</Text>
                </TouchableOpacity>

                <DateTimePickerModal
                  isVisible={this.state.isDatePickerVisible}
                  mode="date"
                  onConfirm={this.handleConfirm1}
                  onCancel={this.hideDatePicker1}
                />
              </View>

              <Image
                style={{ width: 40, height: 40, marginRight: 40 }}
                source={require('../../../assets/images/lich.png')}
              />


              <View style={styles.confix}>
                <TouchableOpacity
                  onPress={this.showDatePicker2}
                >
                  <Text style={{fontSize:12}}>Đến</Text>
                  <Text style={{fontSize:12}}>{this.state.endTime}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={this.state.inDateEndPicker}
                  mode="date"
                  onConfirm={this.handleConfirm2}
                  onCancel={this.hideDatePicker2}
                />
              </View>

              <Image
                style={{ width: 40, height: 40 }}
                source={require('../../../assets/images/lich.png')}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ loading: true }, async () => {
                    await Getwithdrawal({
                      USERNAME: ID_NAME,
                      USER_CTV: ID_NAME,
                      START_TIME: this.state.startTime,
                      END_TIME: this.state.endTime,
                      PAGE: 1,
                      NUMOFPAGE: 10,
                      IDSHOP: "F6LKFY",
                    })
                      .then((res) => {
                        console.log("search nè", res)
                        if (res.data.ERROR == "0000") {
                          this.setState({
                            Data: res.data.INFO,
                            loading: false,
                          })
                        } else {
                          this.showToast(res);
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
                    padding: 10
                  }}
                >
                  Tìm kiếm
                        </Text>
              </TouchableOpacity>
            </View>
            {this.state.Data.length === 0 ? <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: sizeHeight(10), marginLeft: 25 }}>Không có dữ liệu</Text> :
              <View>
                {!loading ? <View><View style={styles.container1}>
                  <View style={[styles.cuttoms, styles.children1]}>
                    <Text style={{ color: 'white' }}>Nội dung</Text>
                  </View>
                  <View style={styles.cuttoms}>
                    <Text style={{ color: 'white' }}>Số tiền</Text>
                  </View>
                </View>
                  <ScrollView style={{ marginTop: sizeHeight(1), height: sizeHeight(45), borderColor: '#149CC6', borderWidth: 2 }}>
                    <View style={{ marginTop: -2 }}>
                      {this.state.Data.map((Val, key) => (
                        <View>
                          <View style={styles.container}>
                            <View style={styles.children}>
                              <Text >{Val.UPDATE_TIME}</Text>
                              <Text>{Val.COMMENTS}</Text>
                            </View>
                            <View style={{ paddingRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                              {Val.TRANSACTION_NAME === 'Trừ' ? <Text style={{ color: 'red' }}>- {numeral(Val.AMOUNT).format("0,0")}</Text> : <Text style={{ color: '#149CC6' }}>+ {numeral(Val.AMOUNT).format("0,0")}</Text>}
                            </View>

                          </View>
                        </View>
                      ))}

                    </View>

                  </ScrollView></View> : <Loading />}
              </View>
            }

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
)(Subchilditem);

const styles = StyleSheet.create({
  viewText: {
    padding: 10,
    lineHeight: 10,
    borderBottomColor: '#D9E2E2',
    borderBottomWidth: 8,
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#149CC6',
  },
  children: {
    borderRightColor: '#149CC6',
    borderRightWidth: 2,
    width: sizeWidth(70),
    

  },
  children1: {
    width: sizeWidth(70)
  },
  cuttoms: {
    marginTop: 5,
    padding: 10,
    backgroundColor: "#4d7335",
    alignItems: 'center',
    width: sizeWidth(30),
  },
  confix: {
    height:sizeHeight(5),
    borderColor: '#4d7335',
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 5,

  },

})

