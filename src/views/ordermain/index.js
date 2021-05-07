import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, ScrollView } from 'react-native'
import { connect } from 'react-redux';
var numeral = require("numeral");
import { getListOrder } from '../../service/order';
import { sizeHeight } from '../../utils/helper/size.helper';
import Shoporder from './listorder/shoporder';
import UserOrder from './listorder/userOrder';

class OrderMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }
    }
    render() {
        const { selectedValue, Data } = this.state;
        const {navigation}=this.props;
        const {GROUPS} =this.props.authUser;

        return (
            <View>
                {GROUPS==3?<Shoporder navigation={navigation}/>:<UserOrder navigation={navigation}/>}
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
export default connect(
    mapStateToProps,
    null
)(OrderMain);
