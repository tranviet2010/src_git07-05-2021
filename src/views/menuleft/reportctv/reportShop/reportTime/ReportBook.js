import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, ScrollView,RefreshControl } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { sizeHeight, sizeWidth } from '../../../../../utils/helper/size.helper';
import { connect } from 'react-redux';
var numeral = require("numeral");
class ReportBook extends Component {
    
    render() {
        console.log("this is status",this.props.authUser.GROUPS)
        const {navigation}=this.props;
        return (
            <View >
                
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
)(ReportBook);
