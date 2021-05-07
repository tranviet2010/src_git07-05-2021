import React, { Component } from 'react'
import { StyleSheet, TextInput, Text, View, Image, Switch, TouchableOpacity, ScrollView, Alert, BackHandler, FlatList } from 'react-native'
import { connect } from "react-redux";
import moment from "moment";
import { sizeWidth, sizeHeight } from '../../../utils/helper/size.helper';
import { COLOR } from '../../../utils/color/colors';
import { UpdateProduct, getComment, deleteCom } from '../../../service/giaovat';

var numeral = require("numeral");
class CommentChil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            dataconfix: [],
        }
    }
    deleteComment = (id) => {
        deleteCom({
            ID: id
        }).then((res) => {
            this.props.onchange(this.props.ID)
        })
    }
    alertDelete = (text) => {
        Alert.alert(
            "Thông báo",
            'Bạn có chắc chắn muốn xoá comment này không?',
            [
                {
                    text: "Không",
                    style: "destructive",
                },
                {
                    text: "Có",
                    onPress: () => { this.deleteComment(text) },
                    style: "default",
                },
            ],
            { cancelable: false }
        );
    }
    getComment = () => {
        const {data}=this.state;
        getComment({
            ID: '',
            MARKETPLACE_ID: data[0].PARENT_ID,
            PAGE: 1,
            NUMOFPAGE: 10
        }).then((res) => {
            console.log("data comment", res);
            this.setState({
                data: res.data.INFO,
            })
        }).catch((err) => err)
    }
    componentDidMount() {
        
    }
    componentDidUpdate(prevProps) {
        if (this.props.data != prevProps.data) {
            this.setState({
                data: this.props.data
            })
        }
    }
    render() {
        const { isEnabled, shipcode, content, type, typeinfo, data, dataconfix } = this.state;

        console.log("dataa confix", data);
        const { ID, username, navigation,id_baiviet,status } = this.props;
        console.log('status=====', status);
        return (
            <View style={{ marginTop: -30, marginBottom: 30 }}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.ID}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ marginLeft: sizeWidth(10), marginTop: 10 }}>
                                {item.PARENT_ID==ID?<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View>
                                        <Image
                                            source={item.AVATAR != null ? { uri: item.AVATAR } : require('../../../assets/images/user.png')}
                                            style={{ width: 35, height: 35, borderRadius: 50 }}
                                        />
                                    </View>
                                    <View style={{ width: sizeWidth(75), backgroundColor: '#f0f1f5', padding: 10, borderRadius: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontWeight: '500', fontSize: 15 }}>{item.FULL_NAME}</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                {username == item.USERNAME ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <TouchableOpacity
                                                        style={{ marginRight: 10 }}
                                                        onPress={() => navigation.navigate("editcom", {
                                                            AVATAR:item.AVATAR,
                                                            ID: item.ID,
                                                            IDCONTENT:id_baiviet,
                                                            CONTENT: item.CONTENT,
                                                            TYPE: item.PRODUCT_TYPE_NAME,
                                                            TYPE_ID: item.PRODUCT_TYPE_ID,
                                                            TYPEINFO: item.TYPE_NAME,
                                                            STATUS: item.STATUS,
                                                            LEVEL: item.LEVEL,
                                                            reload:this.getComment,
                                                        })}
                                                    >
                                                        <Image
                                                            source={require('../../../assets/images/edit.png')}
                                                            style={{ width: 15, height: 15 }}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => {this.alertDelete(item.ID)}}
                                                    >
                                                        <Image
                                                            source={require('../../../assets/images/delete.png')}
                                                            style={{ width: 15, height: 15 }}
                                                        />
                                                    </TouchableOpacity>
                                                </View> : null}
                                            </View>
                                        </View>
                                        
                                        <Text style={{ fontSize: 15 }}>{item.CONTENT}</Text>
                                    </View>
                                </View>:null}
                            </View>
                        );
                    }}
                />
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
)(CommentChil);

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
