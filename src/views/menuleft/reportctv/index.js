import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, ScrollView,RefreshControl } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { sizeHeight, sizeWidth } from '../../../utils/helper/size.helper';
import { connect } from 'react-redux';
var numeral = require("numeral");
import Loading from '../../../components/loading';
import ReportUser from "./reportUser";
import ReportShop from "./reportShop";
class index extends Component {
    
    render() {
        console.log("this is status",this.props.authUser.GROUPS)
        const {navigation}=this.props;
        return (
            <View >
                {this.props.authUser.GROUPS==3?<ReportShop navigation={navigation}/>:<ReportUser navigation={navigation}/>}
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
    
})

export default connect(
    mapStateToProps,
    null
)(index);
