
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
class SetupAccout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        }
    }
    componentDidMount() {

    }
    render() {
        const { data } = this.state;
        const { username } = this.props;
        const { SetupAccout } = this.props.route.params;
        const arr = [{ stt: 1, name: 'Khách Hàng' }, { stt: 2, name: 'Cộng tác viên' }]
        return (
            <View>
                {arr.map((val) => (
                    <Text
                        style={{ height: sizeHeight(5), width: sizeWidth(95), borderBottomColor: 'red', borderBottomWidth: 10 }}
                        onPress={() => {
                            SetupAccout(val.name);
                            this.props.navigation.goBack();
                        }}>{val.name}</Text>
                ))}
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
)(SetupAccout);

const styles = StyleSheet.create({

})
