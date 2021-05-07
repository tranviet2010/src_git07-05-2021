import React, { Component } from 'react'
import { StyleSheet, TextInput, Text, View, Image, Platform, TouchableOpacity, ScrollView, Alert, FlatList, Linking, RefreshControl } from 'react-native'
import { connect } from "react-redux";
import moment from "moment";
import { sizeWidth, sizeHeight } from '../../../utils/helper/size.helper';
import { COLOR } from '../../../utils/color/colors';
import ReadMore from 'react-native-read-more-text';
import { getText, LikeProduct } from '../../../service/giaovat';
import { TouchableHighlight } from 'react-native';
import Loading from '../../../components/loading';
import Picture from './picture';

var numeral = require("numeral");

class Giaovat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Data: [],
            isDatePickerVisible: false,
            inDateEndPicker: false,
            loading: false,
            momney: '',
            searchText: 'Tất cả',
            data: [],
            like: 0,
            refreshing: true
        }
    }
    handleText = () => {
        getText({
            TYPE: 'sell',
            STATUS: '',
            PAGE: 1,
            NUMOFPAGE: 30,
            SEARCH: '',
            ID: '',
            START_TIME: '',
            END_TIME: ''
        }).then((res) => {
            if (res.data.ERROR == "0000") {
                this.setState({
                    data: res.data.INFO,
                    refreshing: false
                })
            }else{
                this.setState({
                    refreshing: false
                })
            }
            
        }).catch((err) => err)
    }
    likeProduct = (text) => {
        LikeProduct({
            ID: text
        }).then((res) => {
            this.handleText();
        }).catch((err) => err)
    }
    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={{ color: '#999999', marginTop: 2 }} onPress={handlePress}>
                Xem thêm
            </Text>
        );
    }

    _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={{ color: '#999999', marginTop: 2 }} onPress={handlePress}>
                Ẩn bớt
            </Text>
        );
    }
    changeDistrictChild = (text) => {
        getText({
            TYPE: 'sell',
            STATUS: '',
            PAGE: 1,
            NUMOFPAGE: 10,
            SEARCH: '',
            PRODUCT_TYPE_ID: text.ID,
            ID: '',
            START_TIME: '',
            END_TIME: ''
        }).then((res) => {
            console.log("hello", res);
            this.setState({
                data: res.data.INFO,
                searchText: text.NAME
            })
        }).catch((err) => err)
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
            let ddmm=pDate.slice(0,5);
            let ddmmyy=pDate.slice(0,10)

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
                return `Hôm qua,${hh}:${mi}`
            } else if (gio > 48) {
                return `${ddmm}, ${hh}:${mi}`
            } else if (ngay > 365) {
                return `${ddmmyy}, ${hh}:${mi}`
            }
        } else {
            console.log("errrrrrrrrrr");
        }
    }
    componentDidMount() {
        this.handleText();
    }
    render() {
        const { navigation } = this.props;
        const { data, searchText, refreshing } = this.state;
        return (
            <ScrollView style={{ marginBottom: Platform.OS=='ios'?sizeHeight(12):sizeHeight(32) }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={()=>this.handleText()} />
                }
            >
                <View>
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
                        data={data}
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

                                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                                    <Text style={{ color: '#999999', fontSize: 13 }}>{this.confixTime(item.UPDATED_TIME)} •</Text>

                                                    <Image
                                                        source={require('../../../assets/images/face.png')}
                                                        style={{ width: 24, height: 24, marginLeft: -5 }}
                                                    />
                                                </View>
                                            </View>
                                        </View>

                                        <View style={{ flex: 1, marginTop: 10, marginBottom: 10 }}>
                                            <ReadMore
                                                numberOfLines={7}
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
                                                    <TouchableOpacity
                                                        style={{ backgroundColor: '#4285F4', marginRight: 5, width: sizeWidth(20), justifyContent: 'center', alignItems: 'center', borderRadius: 40, height: sizeHeight(3) }}
                                                        onPress={() => Linking.openURL(`tel:${item.MOBILE}`)}
                                                    >
                                                        <Text style={{ color: '#fff' }}>Gọi ngay</Text>
                                                    </TouchableOpacity>
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
                                    <View style={{ height: 4, backgroundColor: '#999999' }}></View>
                                </View>
                            );
                        }}
                    />
                </View>
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
