import React, { Component } from 'react'
import { StyleSheet, TextInput, Text, View, Image, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Keyboard, Platform, FlatList } from 'react-native'
import { connect } from "react-redux";
import moment from "moment";
import { sizeWidth, sizeHeight } from '../../../utils/helper/size.helper';
import { COLOR } from '../../../utils/color/colors';
import { UpdateProduct, getComment, comment, deleteCom } from '../../../service/giaovat';
import CommentChild from './com_child';

var numeral = require("numeral");

var localLocale = moment();

class Addread extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            dataconfix: [],
            status: true,
            content: '',
            conID: '',
            value: '',
            namecom: '',
            check: '',
            idw:this.props.route.params.ID,
        }
    }
    getComment = () => {
        const {idw}=this.state;
        getComment({
            ID: '',
            MARKETPLACE_ID: idw,
            PAGE: 1,
            NUMOFPAGE: 100
        }).then((res) => {
            console.log("data comment", res);
            this.setState({
                data: res.data.INFO,
            })
        }).catch((err) => err)
    }
    confixComment = (value) => {
        const { data } = this.state;
        let data_chil = [];
        if (data != []) {
            data_chil = data.filter((val) => {
                return val.PARENT_ID == value
            })
        } else {
        }
        this.setState({
            dataconfix: data_chil,
            status: !this.state.status
        })
    }
    deleteComment = (id) => {
        deleteCom({
            ID: id
        }).then((res) => {
            this.getComment();
        })
    }
    getComment1 = (text) => {
        this.getComment();
        this.confixComment();
        this.setState({
            conID: text
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
    commnet = () => {
        const { value } = this.state;
        comment({
            ACTION: 'I',
            ID: '',
            MARKETPLACE_ID: this.props.route.params.ID,
            CONTENT: this.state.content,
            PARENT_ID: value == '' ? '' : value
        }).then((res) => {
            console.log("data comment 1111", res);
            this.getComment();
            this.confixComment();
            this.setState({
                content: '',
            })
        }).catch((err) => err)
    }
    countView = (id) => {
        let count = 0;
        console.log('iddd', id);
        const { data } = this.state;
        var data1 = data.filter((val) => {
            return val.LEVEL == 2
        })
        if (data != [] && data1 != []) {
            for (let i = 0; i < data1.length; i++) {
                if (data1[i].PARENT_ID == id) {
                    count = count + 1;
                } else {

                }
            }
        }
        return count;
    }
    confixTime = (pDate) => {
        // let pDate='02/03/2021 11:00:00';
        if (pDate != undefined) {
            let dd = pDate.split("/")[0].padStart(2, "0");
            let mm = pDate.split("/")[1].padStart(2, "0");
            let yyyy = pDate.split("/")[2].split(" ")[0];
            let hh = pDate.split("/")[2].split(" ")[1].split(":")[0].padStart(2, "0");
            let mi = pDate.split("/")[2].split(" ")[1].split(":")[1].padStart(2, "0");
            let secs = pDate.split("/")[2].split(" ")[1].split(":")[2].padStart(2, "0");

            mm = (parseInt(mm) - 1).toString(); // January is 0

            let data = new Date();
            let data1 = new Date(yyyy, mm, dd, hh, mi, secs);
            let dataAll = data.getTime() - data1.getTime();
            let phut = (dataAll / 1000) / 60;
            let gio = phut / 60;
            let ngay = gio / 24;
            if (dataAll / 1000 < 60) {
                return 'Vừa xong'
            } else if (phut < 60) {
                return `${Math.floor(phut)} phút`
            } else if (gio < 24) {
                return `${Math.floor(gio)} giờ`
            } else if (gio > 24 && gio < 48) {
                return `Hôm qua, ${hh}:${mi}`
            } else if (gio > 48) {
                return `${dd}/0${mm}, ${hh}:${mi}`
            } else if (ngay > 365) {
                return `${dd}/0${mm}/${yyyy}, ${hh}:${mi}`
            }
        } else {
            console.log("errrrrrrrrrr");
        }
    }
    onsetRef = () => {
        localLocale.locale('vi');
        localLocale.format();
        var time = moment().format();
        console.log(time);
    }
    componentDidMount() {
        this.getComment();
    }
    render() {
        const { data, dataconfix, status, conID, value, content, namecom, check,idw } = this.state;
        const { username } = this.props;
        var data1 = data.filter((val) => {
            return val.LEVEL == 1
        })
        const { navigation } = this.props;

        // console.log("real time",moment.utc('24/02/2021 15:51:12').toDate());
        console.log("data1====", data1);
        console.log('conID===', conID);
        console.log("dataconfix===", dataconfix);

        return (
            <KeyboardAvoidingView
                keyboardVerticalOffset={100}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View style={{ margin: 10, flex: 1 }}>
                    <View style={{ flex: 9 }}>
                        <FlatList
                            data={data1}
                            keyExtractor={(item) => item.ID}
                            renderItem={({ item, index }) => {
                                return (
                                    <View >
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View>
                                                <Image
                                                    source={item.AVATAR != null ? { uri: item.AVATAR } : require('../../../assets/images/user.png')}
                                                    style={{ width: 45, height: 45, borderRadius: 50 }}
                                                />
                                            </View>
                                            <View style={{ width: sizeWidth(82), backgroundColor: '#f0f1f5', padding: 10, borderRadius: 10 }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    {/* {item.USERNAME == '0987654321' ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Image
                                                            source={require('../../../assets/images/fancung.png')}
                                                            style={{ width: 12, height: 12, marginRight: 5 }}
                                                        />
                                                        <Text style={{ fontSize: 12 }}>Fan cứng</Text>
                                                    </View> : <View></View>} */}
                                                    <Text style={{ fontWeight: '500', fontSize: 15 }}>{item.FULL_NAME}</Text>
                                                    {username == item.USERNAME ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <TouchableOpacity
                                                            style={{ marginRight: 10 }}
                                                            onPress={() => navigation.navigate("editcom", {
                                                                AVATAR: item.AVATAR,
                                                                ID: item.ID,
                                                                IDCONTENT: this.props.route.params.ID,
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
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                            <View style={{ width: 45, height: 45, borderRadius: 50, color: '' }}>
                                            </View>
                                            <View style={{ width: sizeWidth(80), flexDirection: 'row' }}>
                                                <Text style={{ marginRight: 20, fontSize: 13, color: '#999999' }}>{this.confixTime(item.UPDATED_TIME)}</Text>
                                                <TouchableOpacity
                                                    style={{ marginRight: 20 }}
                                                    onPress={() => {navigation.navigate("detailcomment", {
                                                        item,
                                                        idw,
                                                        text:true,
                                                        reload1:this.getComment
                                                    }) }}
                                                >
                                                    <Text style={{ fontSize: 13, color: '#999999' }}>Trả lời</Text>
                                                </TouchableOpacity>
                                                {this.countView(item.ID) != 0 ? <TouchableOpacity
                                                    style={{ marginRight: 20 }}
                                                    onPress={() => { this.setState({ conID: item.ID }), this.confixComment(item.ID),
                                                    navigation.navigate("detailcomment", {
                                                        item,
                                                        idw,
                                                        reload1:this.getComment
                                                    })
                                                }}
                                                >
                                                    <Text style={{ fontSize: 13, color: '#999999' }}>{`Xem ${this.countView(item.ID)} trả lời`}</Text>
                                                </TouchableOpacity> : null}
                                            </View>
                                        </View>
                                        {/* {conID==item.ID && !status ? <CommentChild data={dataconfix} ID={conID} navigation={navigation} id_baiviet={this.props.route.params.ID} onchange={this.getComment1} status={status} /> : null} */}
                                    </View>
                                );
                            }}
                        />
                    </View>
                    {/* <View>
                        {value != '' ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text>Đang trả lời {namecom}</Text>
                            <TouchableOpacity
                                onPress={() => this.setState({ value: '' })}
                            >
                                <Image
                                    source={require('../../../assets/images/xoa.png')}
                                    style={{ width: 12, height: 12, marginLeft: 10 }}
                                />
                            </TouchableOpacity>
                        </View> : null}

                    </View> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: .9,alignItems:'center' }}>
                        <TextInput
                            style={{ width: sizeWidth(85), height: sizeHeight(5), backgroundColor: '#f0f1f5', borderRadius: 50, paddingLeft: 20 }}
                            placeholder="Viết bình luận"
                            // value={namecom != '' ? namecom : content}
                            value={content}
                            ref="myInput"
                            onChangeText={(text) => this.setState({ content: text, check: 2 })}
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
)(Addread);

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
