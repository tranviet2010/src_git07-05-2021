import React, { Component } from 'react'
import { StyleSheet, TextInput, Text, View, Image, Switch, TouchableOpacity, ScrollView, Alert, BackHandler, FlatList,KeyboardAvoidingView } from 'react-native'
import { connect } from "react-redux";
import moment from "moment";
import { sizeWidth, sizeHeight } from '../../../utils/helper/size.helper';
import { COLOR } from '../../../utils/color/colors';
import { UpdateProduct, getComment, comment, deleteCom } from '../../../service/giaovat';

var numeral = require("numeral");
class CommentChil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            content: '',
            value:this.props.route.params.item.FULL_NAME

        }
    }

    deleteComment = (id) => {
        deleteCom({
            ID: id
        }).then((res) => {
            this.getComment();
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
        const { data } = this.state;
        const { item, idw } = this.props.route.params;
        getComment({
            ID: '',
            MARKETPLACE_ID: idw,
            PAGE: 1,
            NUMOFPAGE: 100
        }).then((res) => {
            console.log("data comment", res);
            this.setState({
                data: res.data.INFO.filter((val) => val.PARENT_ID == item.ID),
            })
        }).catch((err) => err)
    }
    componentDidMount() {
        const { navigation,listItem } = this.props;
        this.props.route.params.text==true?this.refs.myInput.focus():null;
        this.getComment();
        navigation.setParams({
            reload:()=>{this.props.route.params.reload1()}
        })

    }
    commnet = () => {
        const { item, idw } = this.props.route.params;
        comment({
            ACTION: 'I',
            ID: '',
            MARKETPLACE_ID: idw,
            CONTENT: this.state.content,
            PARENT_ID: item.ID
        }).then((res) => {
            console.log("data comment 1111", res);
            this.getComment();
            this.setState({
                content: '',
            })
        }).catch((err) => err)
    }
    render() {
        const { isEnabled, shipcode, content, type, typeinfo, data, dataconfix,value } = this.state;

        console.log("dataa confix", data);
        const { ID, username, navigation, id_baiviet, status } = this.props;

        const { item, idw,text } = this.props.route.params;
        console.log(
            "hí item", item
        );
        console.log('IDW===', idw);
        return (
            <KeyboardAvoidingView
                keyboardVerticalOffset={100}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View style={{ margin: 10, flex: 1 }}>
                    <View style={{ flex: 9 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Image
                                    source={item.AVATAR != null ? { uri: item.AVATAR } : require('../../../assets/images/user.png')}
                                    style={{ width: 45, height: 45, borderRadius: 50 }}
                                />
                            </View>
                            <View style={{ width: sizeWidth(82), backgroundColor: '#f0f1f5', padding: 10, borderRadius: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: '500', fontSize: 15 }}>{item.FULL_NAME}</Text>
                                    {username == item.USERNAME ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableOpacity
                                            style={{ marginRight: 10 }}
                                            onPress={() => navigation.navigate("editcom", {
                                                AVATAR: item.AVATAR,
                                                ID: item.ID,
                                                IDCONTENT: idw,
                                                CONTENT: item.CONTENT,
                                                TYPE: item.PRODUCT_TYPE_NAME,
                                                TYPE_ID: item.PRODUCT_TYPE_ID,
                                                TYPEINFO: item.TYPE_NAME,
                                                STATUS: item.STATUS,
                                                LEVEL: item.LEVEL,
                                                reload: this.getComment
                                            })}
                                        >
                                            <Image
                                                source={require('../../../assets/images/edit.png')}
                                                style={{ width: 15, height: 15 }}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => { this.alertDelete(item.ID) }}
                                        >
                                            <Image
                                                source={require('../../../assets/images/delete.png')}
                                                style={{ width: 15, height: 15 }}
                                            />
                                        </TouchableOpacity>
                                    </View> : null}

                                </View>
                                <Text style={{ fontSize: 15, marginTop: 5 }}>{item.CONTENT}</Text>
                            </View>
                        </View>
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.ID}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ marginLeft: sizeWidth(10), marginTop: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
                                                                    AVATAR: item.AVATAR,
                                                                    ID: item.ID,
                                                                    IDCONTENT: id_baiviet,
                                                                    CONTENT: item.CONTENT,
                                                                    TYPE: item.PRODUCT_TYPE_NAME,
                                                                    TYPE_ID: item.PRODUCT_TYPE_ID,
                                                                    TYPEINFO: item.TYPE_NAME,
                                                                    STATUS: item.STATUS,
                                                                    LEVEL: item.LEVEL,
                                                                    reload: this.getComment,
                                                                })}
                                                            >
                                                                <Image
                                                                    source={require('../../../assets/images/edit.png')}
                                                                    style={{ width: 15, height: 15 }}
                                                                />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                onPress={() => { this.alertDelete(item.ID) }}
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
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: .9 }}>
                        <TextInput
                            style={{ width: sizeWidth(85), height: sizeHeight(5), backgroundColor: '#f0f1f5', borderRadius: 50, paddingLeft: 20 }}
                            placeholder="Viết bình luận"
                            value={content}
                            ref="myInput"
                            onChangeText={(text) => this.setState({ content: text })}
                        />
                        <TouchableOpacity
                            onPress={() => this.commnet()}
                        >
                            <Image
                                source={require('../../../assets/images/loc.png')}
                                style={{ width: 35, height: 35 }}
                            />
                        </TouchableOpacity>

                    </View>
                </View>
            </KeyboardAvoidingView>
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
