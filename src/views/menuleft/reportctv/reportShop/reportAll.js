import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, ScrollView, RefreshControl } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { sizeHeight, sizeWidth } from '../../../../utils/helper/size.helper';
import { connect } from 'react-redux';
var numeral = require("numeral");
import Loading from '../../../../components/loading';
import { ReportDefault } from "../../../../service/account";
import ReportYear from "./reportyear";
import ReportMonth from './ReportMonth';
import ReportDay from './ReportDay';
import DropDownPicker from 'react-native-dropdown-picker';

class ReportAll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Data: [],
            selectedValue: '',
        }
    }
    config=(item)=>{
        console.log("item",item);
        if(item==1){
            return (<ReportYear item={item} navigation={this.props.navigation}/>);
        }else if(item==2){
            return <ReportMonth item={item}/>
        }else{
            return <ReportDay item={item} navigation={this.props.navigation}/>
        }
    }
    render() {
        const { selectedValue } = this.state;
        return (
            <View >
                <View style={{zIndex:-1}}>
                    {this.config(1)}
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
    container: {

        borderColor: '#4d7335',
        borderWidth: 2,
        borderRadius:15,
        alignItems: "center"
    },
   
})

export default connect(
    mapStateToProps,
    null
)(ReportAll);
