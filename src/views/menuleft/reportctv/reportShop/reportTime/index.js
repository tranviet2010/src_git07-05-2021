import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, ScrollView, RefreshControl } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { sizeHeight, sizeWidth } from '../../../../../utils/helper/size.helper';
import { connect } from 'react-redux';
import ReportList from './ReportList';
import ReportBook from './ReportBook';
import ReportPr from './ReportPr';
import DropDownPicker from 'react-native-dropdown-picker';

var numeral = require("numeral");
class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startTime: moment()
        .add(-100, "day")
        .format("DD/MM/YYYY"),
      endTime: moment(new Date()).format("DD/MM/YYYY"),
      isDatePickerVisible: false,
      inDateEndPicker: false,
      selectedValue:'',

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

  config = (item) => {
    if (item == 1) {
      return (<ReportList item={item} startTime={this.state.startTime} endTime={this.state.endTime} />);
    } else if (item == 3) {
      return <ReportBook item={item} startTime={this.state.startTime} endTime={this.state.endTime} />
    } else if (item = 4) {
      return <ReportPr item={item} startTime={this.state.startTime} endTime={this.state.endTime} />
    }
  }

  render() {
    const { selectedValue } = this.state;
    const { navigation } = this.props;
    return (
      <View >
        <View>
          <View style={{ alignItems: 'center', margin: 5 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Chọn khoảng thời gian</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
            <View style={styles.confix}>
              <TouchableOpacity
                onPress={this.showDatePicker1}
              >
                <Text style={{ fontSize: 12 }}>Bắt đầu</Text>
                <Text style={{ fontSize: 12 }}>{this.state.startTime}</Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={this.state.isDatePickerVisible}
                mode="date"
                onConfirm={this.handleConfirm1}
                onCancel={this.hideDatePicker1}
              />
            </View>

            <Image
              style={{ width: 45, height: 45, marginRight: 40 }}
              source={require('../../../../../assets/images/lich.png')}
            />


            <View style={styles.confix}>
              <TouchableOpacity
                onPress={this.showDatePicker2}
              >
                <Text style={{ fontSize: 12 }}>Kết thúc</Text>
                <Text style={{ fontSize: 12 }}>{this.state.endTime}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={this.state.inDateEndPicker}
                mode="date"
                onConfirm={this.handleConfirm2}
                onCancel={this.hideDatePicker2}
              />
            </View>

            <Image
              style={{ width: 45, height: 45 }}
              source={require('../../../../../assets/images/lich.png')}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16 }}>Hiển thị theo</Text>
            {/* <View style={{
              borderColor: '#4d7335',
              borderWidth: 2,
              borderRadius: 15,
              alignItems: "center",
              margin:10,
            }}>
              <Picker
                selectedValue={selectedValue}
                style={{ height: 40, width: sizeWidth(55) }}
                onValueChange={(itemValue, itemIndex) => this.setState({ selectedValue: itemValue })}
              >
                <Picker.Item label="Danh mục sản phẩm" value="1" />
                <Picker.Item label="Theo thuộc tính" value="3" />
                <Picker.Item label="Danh sách sản phẩm" value="4" />
              </Picker>
            </View> */}

            <View
              style={{

                // The solution: Apply zIndex to any device except Android
                ...(Platform.OS !== 'android' && {
                  zIndex: 10,
                }),
              borderRadius: 15,
              alignItems: "center",
              margin:10,
              }}
            >
              <DropDownPicker
                items={[
                  { label: 'Danh mục sản phẩm', value: '1' },
                  { label: 'Theo thuộc tính', value: '3' },
                  { label: 'Danh sách sản phẩm', value: '4' },
                ]}
                defaultValue={selectedValue}
                placeholder="Trạng thái"
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: '#fafafa', width: sizeWidth(50), borderColor: '#4d7335', borderWidth: 2 }}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                dropDownStyle={{ backgroundColor: '#fafafa', width: sizeWidth(50) }}
                onChangeItem={item => this.setState({
                  selectedValue: item.value
                })}
              />
            </View>


          </View>

        </View>
        <View style={{ height: 4, backgroundColor: '#CCCECE', marginTop: 10, marginBottom: 10,zIndex:-1 }}></View>
        <View style={{zIndex:-1}}>
          {this.config(selectedValue)}
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
  };
};
const styles = StyleSheet.create({
  confix: {
    borderColor: '#4d7335',
    paddingLeft: 10,
    paddingRight: 10,
    width:sizeWidth(30),
    borderWidth: 2,
    borderRadius: 5,
    height:sizeHeight(5),
  },
  confix1: {
    marginTop: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  confix2: {
    borderColor: '#4d7335',
    borderWidth: 2,
    width: sizeWidth(40),
    height: sizeHeight(7),
    borderRadius: 15,
  },

})

export default connect(
  mapStateToProps,
  null
)(index);
