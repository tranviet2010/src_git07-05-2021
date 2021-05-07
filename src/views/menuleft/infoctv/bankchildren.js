
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, TouchableHighlight } from 'react-native';
import { GetListCTV } from "../../../service/account";
import Modal from 'react-native-modal';
import { Getwithdrawal } from "../../../service/rose";
import { UpdateInforAccount } from "../../../service/account";
import moment from "moment";
var numeral = require("numeral");
import {
    sizeWidth,
    sizeFont,
    sizeHeight,
} from "../../../utils/helper/size.helper"
class BankChildren extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Rose: [],
            data: [],
            loading: false,
            formatBank: false,
            usernam: '',
            stk: '',
            tentk: '',
            tennh: '',
            phone: '',
            passnew: '',
            address: '',
            male: '',
            endTime: moment(new Date()).format("DD/MM/YYYY"),

        }
    }
    componentDidMount() {
        GetListCTV({
            USERNAME: this.props.username,
            SEARCH: '',
            ID_CITY: '',
            I_PAGE: 1,
            NUMOFPAGE: 25,
            IDSHOP: "F6LKFY",
        })
            .then((res) => {
                if (res.data.ERROR == "0000") {
                    this.setState({
                        data: res.data.INFO
                    })
                } else {
                    this.showToast(res);
                }
            })
            .catch((err) => {
                this.setState({ data: [] })
                alert('Không có dữ liệu')
            });
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
    }
    render() {
        const { data, modalVisible, Rose, usernam, passold, passnew, phone, address } = this.state;
        const { username } = this.props;
        console.log("abccccc", data);
        return (
            <View>
                {data.map((Val, key) => {
                    return (
                        <View>
                            <View>
                                <View style={{ height: 4.5, backgroundColor: '#AAAAAA' }}></View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 20 }}>
                                    <View style={{ width:sizeWidth(100),backgroundColor:'#4d7335' }}>
                                        <Text style={{ fontSize: 16,padding:10,fontWeight:'bold',color:'white' }}>Tài khoản ngân hàng</Text> 
                                    </View>

                                    <View>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View style={styles.content}>
                                    <Text>Số tài khoản:</Text>
                                    <Text>{Val.STK}</Text>
                                </View>

                                <View style={styles.content}>
                                    <Text>Tên tài khoản:</Text>
                                    <Text>{Val.TENTK}</Text>
                                </View>
                                <View style={styles.content}>
                                    <Text>Ngân hàng, chi nhánh:</Text>
                                    <Text>{Val.TEN_NH}</Text>
                                </View>
                            </View>
                            <View style={{ height: 4.5, backgroundColor: '#AAAAAA' }}></View>
                        </View>


                    )
                })}

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
)(BankChildren);

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
    }
})
