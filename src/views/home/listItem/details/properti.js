import React, { Component } from "react";
import Share1 from 'react-native-share';
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    TouchableHighlight,
    Image,
    Share,
    Button,
    Clipboard,
    Picker,
    Alert,
    Modal,
} from "react-native";

import {
    sizeFont,
    sizeWidth,
    sizeHeight,
} from "../../../../utils/helper/size.helper";
import { connect } from "react-redux";

import {
    AlertCommon,
    AlertCommonLogin,
    ElementCustom,
} from "../../../../components/error";

import _ from "lodash";
var numeral = require("numeral");
class DetailProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setSelectedValue: false,
            propety:[],
        };
        this.arrayImage = [];
        this.refs._carousel;
        //this.activeTab = 1;
    }
    componentDidMount() {
    }
    render() {
        const { setSelectedValue } = this.state;
        const { status, authUser, data, basedata } = this.props;
        console.log("this is data nè", data);
        return (
            <View >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={setSelectedValue}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{ flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: 1, paddingBottom: 10 }}>
                                <View>
                                    <Image
                                        source={{ uri: basedata.IMAGE_COVER }}
                                        style={{ width: 100, height: 100 }}
                                    />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ color: 'red', fontSize: 16 }}>{numeral(basedata.PRICE).format("0,0")} đ</Text>
                                    <Text><Text style={{ fontStyle: 'italic', fontSize: 12 }}>75.000 đ</Text> -49%</Text>
                                    <Text>{this.state.propety}</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                {data.length != 0 ? data.map((val) => {
                                    return (
                                        <View>
                                            <Text style={{ marginLeft: 10, fontSize: 11 }}>{val.NAME}</Text>
                                            <View style={{ flexDirection: 'row',marginBottom:sizeHeight(5),width:sizeWidth(40) }}>
                                                {val.INFO.map((value) => (
                                                    <View style={{marginTop:15,width:sizeWidth(25),height:sizeHeight(5),borderRadius:50,
                                                    backgroundColor:'#EEEEEE',justifyContent:'center',alignItems:'center'}}
                                                    onPress={()=>{
                                                        console.log(value.SUB_PROPERTIES)
                                                    }}
                                                    >
                                                        <Text>{value.SUB_PROPERTIES}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    )
                                }) : null}
                            </View>

                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: "#2196F3", marginTop: 200 }}
                                onPress={() => {
                                    this.setState({ setSelectedValue: !setSelectedValue })
                                }}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View
                    style={styles.openButton1}
                    
                >
                    <Text style={styles.textStyle}>Đơn vị tính :</Text>
                    <View style={{}}>
                                {data.length != 0 ? data.map((val) => {
                                    return (
                                        <View>
                                            
                                            <View style={{ flexDirection: 'row',width:sizeWidth(20) }}>
                                                {val.INFO.map((value) => (
                                                    <View 
                                                    onPress={()=>{
                                                        console.log(value.SUB_PROPERTIES)
                                                    }}
                                                    >
                                                        <Text>{value.SUB_PROPERTIES}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    )
                                }) : null}
                            </View>

                </View  >
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        status: state.authUser.status,
        authUser: state.authUser.authUser,
        username: state.authUser.username,
        listItem: state.order.listItem,
        idshop: state.product.database,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {}
};
const styles = StyleSheet.create({
    
    openButton1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textStyle: {
        color: "#000",
        fontWeight: 'bold',
    },
    modalText: {
        textAlign: "center",
    }
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailProducts);
