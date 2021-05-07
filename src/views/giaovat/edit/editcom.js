import React, { Component } from 'react'
import { StyleSheet, TextInput, Text, View, Image, Switch, TouchableOpacity, ScrollView, Alert, BackHandler } from 'react-native'
import { connect } from "react-redux";
import moment from "moment";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker/src';
import { sizeWidth, sizeHeight, sizeFont } from '../../../utils/helper/size.helper';
import { COLOR } from '../../../utils/color/colors';
import { UpdateProduct,comment } from '../../../service/giaovat';

var numeral = require("numeral");
class EditCom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: this.props.route.params.CONTENT,
            val:'',
        }
    }

    changeText = (text) => {
        this.setState({
            content: text,
            val:text
        })
    }
    editcom=()=>{
        comment({
            ACTION: 'U',
            ID: this.props.route.params.ID,
            MARKETPLACE_ID: this.props.route.params.IDCONTENT,
            CONTENT: this.state.content,
            PARENT_ID: ''
        }).then((res) => {
            console.log("thành công ",res);
            this.setState({
                value: ''
            })
            this.props.navigation.goBack(),
            this.props.route.params.reload()
        }).catch((err) => err)
    }
    componentDidMount() {
            
    }
    render() {
        const { AVATAR } = this.props.route.params;
        const { content,val } = this.state;
        console.log("conterntttt", this.props.route.params.IDCONTENT);
        return (
            <View style={{ padding: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Image
                        source={AVATAR != null ? { uri: AVATAR } : require('../../../assets/images/user.png')}
                        style={{ width: 35, height: 35, borderRadius: 50 }}
                    />
                    <TextInput
                        style={{ width: sizeWidth(85), height: sizeHeight(5), backgroundColor: '#f0f1f5', borderRadius: 50, paddingLeft: 20 }}
                        value={content}
                        onChangeText={(text) => this.changeText(text)}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View></View>
                    <TouchableOpacity
                        style={{width:sizeWidth(25),backgroundColor:val==''?'#999999':COLOR.HEADER,justifyContent:'center',alignItems:'center',height:sizeHeight(4),marginTop:20,borderRadius:5}}
                        onPress={()=>this.editcom()}
                    >
                        <Text style={{color:'#fff'}}>Cập nhật</Text>
                    </TouchableOpacity>
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
)(EditCom);

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',

    },
    headerText: {
        width: sizeWidth(30),
        height: sizeHeight(4),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLOR.HEADER,
        borderWidth: 1,
        borderRadius: 50,
    }
})
