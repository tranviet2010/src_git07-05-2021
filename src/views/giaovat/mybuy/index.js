import React, { Component } from 'react'
import { StyleSheet, TextInput, Text, View, Image, Button, TouchableOpacity, ScrollView, Alert, FlatList } from 'react-native'
import { connect } from "react-redux";
import moment from "moment";
import { sizeWidth, sizeHeight } from '../../../utils/helper/size.helper';
import { COLOR } from '../../../utils/color/colors';
import ReadMore from 'react-native-read-more-text';
import { getText, DeleteProduct, LikeProduct } from '../../../service/giaovat';
import Picture from '../needbuy/picture';
import { Platform } from 'react-native';

var numeral = require("numeral");
class Giaovat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startTime: moment()
                .add(-60, "day")
                .format("DD/MM/YYYY"),
            endTime: moment(new Date()).format("DD/MM/YYYY"),
            Data: [],
            isDatePickerVisible: false,
            inDateEndPicker: false,
            loading: false,
            searchText: 'Tất cả',
            momney: '',
            data: [],
            data1: [],

        }
    }
    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={{ color: '#000', marginTop: 2 }} onPress={handlePress}>
                Xem thêm
            </Text>
        );
    }
    handleText = () => {
        getText({
            TYPE: 'me',
            STATUS: '',
            PAGE: 1,
            NUMOFPAGE: 30,
            SEARCH: '',
            ID: '',
            START_TIME: '',
            END_TIME: ''
        }).then((res) => {
            this.setState({
                data: res.data.INFO
            })
        }).catch((err) => err)
    }
    deleteProduct = (text) => {
        DeleteProduct({
            ID: text
        }).then((res) => {
            this.handleText()
        }).catch((err) => err)
    }
    likeProduct = (text) => {
        LikeProduct({
            ID: text
        }).then((res) => {
            this.handleText();
        }).catch((err) => err)
    }
    changeDistrictChild=(text)=>{
        getText({
            TYPE: 'me',
            STATUS: '',
            PAGE: 1,
            NUMOFPAGE: 10,
            SEARCH: '',
            PRODUCT_TYPE_ID: text.ID,
            ID: '',
            START_TIME: '',
            END_TIME: ''
        }).then((res) => {
            this.setState({
                data1: res.data.INFO,
                searchText: text.NAME
            })

        }).catch((err) => err)
    }
    alertDelete = (text) => {
        Alert.alert(
            "Thông báo",
            'Bạn có chắc chắn muốn xoá bài viết này không?',
            [
                {
                    text: "Không",
                    style: "destructive",
                },
                {
                    text: "Có",
                    onPress: () => { this.deleteProduct(text) },
                    style: "default",
                },
            ],
            { cancelable: false }
        );
    }
    _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={{ color: '#000', marginTop: 2 }} onPress={handlePress}>
                Ẩn bớt
            </Text>
        );
    }
    componentDidMount() {
        this.handleText();
    }
    render() {
        const { navigation } = this.props;
        const { data,searchText,data1 } = this.state;
        return (
            <ScrollView>
                {data.length != 0 ?
                    <View style={{ marginBottom: Platform.OS=='ios'?sizeHeight(12):sizeHeight(32) }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, padding: 10 }}>
                            <Image
                                source={require('../../../assets/images/filter.png')}
                                style={{ width: 20, height: 20 }}
                            />
                            <TouchableOpacity style={{ width: sizeWidth(60), justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#494848' }}
                                onPress={() => navigation.navigate("typeProduct", {
                                    onSetDistrictChild: this.changeDistrictChild
                                })}
                            >
                                <Text>{searchText == undefined ? 'Tất cả' : searchText}</Text>
                            </TouchableOpacity>
                            <Image
                                source={require('../../../assets/images/dowmenu.png')}
                                style={{ width: 10, height: 10 }}
                            />
                        </View>

                        <FlatList
                            data={searchText!='Tất cả'?data1:data}
                            keyExtractor={(item) => item.ID}
                            renderItem={({ item, index }) => {
                                return (
                                    <View>
                                        <View style={{ marginTop: 10, padding: 10 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View>
                                                    <Image
                                                        source={item.AVATAR != null ? { uri: item.AVATAR } : require('../../../assets/images/user.png')}
                                                        style={{ width: 40, height: 40, borderRadius: 50 }}
                                                    />
                                                </View>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ fontWeight: '600', fontSize: 17 }}>{item.FULL_NAME}</Text>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: sizeWidth(80) }}>
                                                        <Text style={{ color: '#999999', fontSize: 13 }}>{item.VIEWS} view</Text>
                                                        <Text><Text style={{ color: '#999999', fontSize: 13 }}>Loại tin: </Text><Text style={{ fontSize: 13 }}>{item.TYPE_NAME}</Text></Text>
                                                        <Text><Text style={{ color: '#999999', fontSize: 13 }}>Trạng thái: </Text><Text style={{ fontSize: 13 }}>{item.STATUS == 1 ? 'Hiện' : 'Ẩn'}</Text></Text>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <TouchableOpacity
                                                                style={{ marginRight: 10 }}
                                                                onPress={() => navigation.navigate("editread", {
                                                                    ID: item.ID,
                                                                    CONTENT: item.DESCRIPTION,
                                                                    TYPE: item.PRODUCT_TYPE_NAME,
                                                                    TYPE_ID: item.PRODUCT_TYPE_ID,
                                                                    TYPEINFO: item.TYPE_NAME,
                                                                    STATUS: item.STATUS,
                                                                    SHOW_MOBILE: item.SHOW_MOBILE,
                                                                    ITEM: item,
                                                                    reload:this.handleText
                                                                })}
                                                            >
                                                                <Image
                                                                    source={require('../../../assets/images/edit.png')}
                                                                    style={{ width: 15, height: 15 }}
                                                                />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                onPress={() => this.alertDelete(item.ID)}
                                                            >
                                                                <Image
                                                                    source={require('../../../assets/images/delete.png')}
                                                                    style={{ width: 15, height: 15 }}
                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                            <View>
                                                <Text style={{ color: '#999999', fontSize: 13, marginTop: 5 }}>Cập nhật lần gần nhất: {item.UPDATED_TIME}</Text>
                                            </View>
                                            <View style={{ flex: 1, marginTop: 5, marginBottom: 10 }}>
                                                <ReadMore
                                                    numberOfLines={3}
                                                    renderTruncatedFooter={this._renderTruncatedFooter}
                                                    renderRevealedFooter={this._renderRevealedFooter}
                                                    onReady={this._handleTextReady}>
                                                    <Text style={styles.cardText}>
                                                        {item.DESCRIPTION}
                                                    </Text>

                                                </ReadMore>
                                            </View>
                                            <View>
                                                <Picture data={item} />
                                            </View>
                                            <View style={{ marginTop: 10, marginBottom: 10 }}>
                                                <Text style={{ color: '#999999' }}>Thông tin liên hệ</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                                        <Image
                                                            source={require('../../../assets/images/local.png')}
                                                            style={{ width: 20, height: sizeHeight(3) }}
                                                        />
                                                        <Text style={{ fontWeight: '500', marginLeft: 3 }}>{item.USERNAME}</Text>
                                                    </View>
                                                    {item.SHOW_MOBILE == 1 ? <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginLeft: sizeWidth(10) }}>
                                                        <View
                                                            style={{ backgroundColor: '#4285F4', marginRight: 5, width: sizeWidth(20), justifyContent: 'center', alignItems: 'center', borderRadius: 40, height: sizeHeight(3) }}
                                                        >
                                                            <Text style={{ color: '#fff' }}>Gọi ngay</Text>
                                                        </View>
                                                        <Text>{item.MOBILE}</Text>
                                                    </View> : null}
                                                </View>

                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#999999', paddingTop: 10 }}>
                                                <TouchableOpacity style={{ flexDirection: 'row', marginRight: 30,justifyContent:'center',alignItems:'center' }}
                                                    onPress={() => this.likeProduct(item.ID)}
                                                >
                                                    <Image
                                                        source={item.IS_LIKED == 0 ? require('../../../assets/images/tym.png') : require('../../../assets/images/tymactive.png')}
                                                        style={{ width: 23, height: 23, marginRight: 8 }}
                                                    />
                                                    <Text style={{ color: '#999999', fontSize: 13 }}>{item.LIKES}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ flexDirection: 'row',justifyContent:'center',alignItems:'center' }} onPress={() => navigation.navigate("comment", {
                                                    ID: item.ID
                                                })}>

                                                    <Image
                                                        source={require('../../../assets/images/comment.png')}
                                                        style={{ width: 23, height: 23, marginRight: 8 }}
                                                    />
                                                    <Text style={{ color: '#999999', fontSize: 13 }}>{item.COMMENTS}</Text>

                                                </TouchableOpacity>
                                            </View>
                                        </View>



                                        <View style={{ height: 6, backgroundColor: '#999999' }}></View>
                                    </View>
                                );
                            }}
                        />
                    </View> : <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: sizeHeight(15), padding: 10 }}>
                        <Image
                            source={require('../../../assets/images/logo.png')}
                            style={{ width: 130, height: 130, marginBottom: sizeHeight(3) }}
                        />

                        <Text style={{ textAlign: 'center', fontWeight: '500' }}>Bạn chưa có thông báo nào. Nếu bạn có nhu cầu mua/bán hoặc trao đổi hàng hoá, đồ dùng, hãy đăng thông tin cho những người hàng xóm của bạn.</Text>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("addread")}
                            style={{ backgroundColor: COLOR.HEADER, width: sizeWidth(40), height: sizeHeight(5), justifyContent: 'center', alignItems: 'center', marginTop: sizeHeight(5), borderRadius: 5 }}
                        >
                            <Text style={{ color: '#fff' }}>Đăng thông báo</Text>
                        </TouchableOpacity>
                    </View>}
            </ScrollView>
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
)(Giaovat);

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
    },
    cardText: {
        fontSize: 15,
    }
})
