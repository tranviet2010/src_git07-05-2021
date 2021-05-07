import React, { Component } from 'react'
import { StyleSheet, TextInput, Text, View, Image, Modal,Platform } from 'react-native'
import { connect } from "react-redux";
import moment from "moment";
import { sizeWidth, sizeHeight } from '../../../utils/helper/size.helper';
import { COLOR } from '../../../utils/color/colors';
import ImageViewer from 'react-native-image-zoom-viewer';
import ReadMore from 'react-native-read-more-text';
import { getText, LikeProduct } from '../../../service/giaovat';
import { TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

var numeral = require("numeral");

class Picture extends Component {
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
            active: false,
            dataImage: [],
        }
    }
    getDataImage = () => {
        const { data } = this.props;
        var dataImage = [];
        if (data.IMG1 != '') {
            dataImage = [...dataImage, data.IMG1]
        } if (data.IMG2 != '') {
            dataImage = [...dataImage, data.IMG2]
        } if (data.IMG3 != '') {
            dataImage = [...dataImage, data.IMG3]
        }
        let newArray = [];
        const pushObjject = (item: string) => {
            return { url: item }
        }
        dataImage.map((item: string) => {
            newArray.push(pushObjject(item))
        })
        console.log({ newArray });
        return newArray;
    }
    componentDidMount() {

    }
    render() {
        const { data } = this.props;
        const { active } = this.state;
        console.log("hey data", data);
        return (
            <View>
                {data.IMG1 != '' && data.IMG2 == '' && data.IMG3 == '' ? <TouchableOpacity onPress={() => this.setState({ active: true })}><Image
                    source={{ uri: data.IMG1 }}
                    style={{ width: sizeWidth(98), height: sizeHeight(35), marginLeft: -5 }}
                /></TouchableOpacity> : data.IMG1 != '' && data.IMG2 != '' && data.IMG3 == '' ? <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => this.setState({ active: true })}>
                        <Image
                            source={{ uri: data.IMG1 }}
                            style={{ width: sizeWidth(47.5), height: sizeHeight(30), marginLeft: -5 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ active: true })}>
                        <Image
                            source={{ uri: data.IMG2 }}
                            style={{ width:Platform.OS=='ios'?sizeWidth(48):sizeWidth(49), height: sizeHeight(30), marginLeft: -5 }}
                        />
                    </TouchableOpacity>
                </View> : data.IMG1 != '' && data.IMG2 != '' && data.IMG3 != '' ? <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => this.setState({ active: true })}>
                        <Image
                            source={{ uri: data.IMG1 }}
                            style={{ width: Platform.OS=='ios'?sizeWidth(46):sizeWidth(47.5), height: sizeHeight(30), marginLeft: -5 }}
                        />
                    </TouchableOpacity>
                    <View style={{ width: sizeWidth(48), flexDirection: 'column', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => this.setState({ active: true })}>
                            <Image
                                source={{ uri: data.IMG2 }}
                                style={{ width: sizeWidth(48), height: sizeHeight(15), marginLeft: -5 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ active: true })}>
                            <Image
                                source={{ uri: data.IMG3 }}
                                style={{ width: sizeWidth(48), height: sizeHeight(14.7), marginLeft: -5 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View> : null}

                <View>
                    <Modal visible={active} >
                        <Text style={{ position: 'absolute', top: 50, color: '#fff', right: 30, fontSize: 17 }} onPress={() => this.setState({ active: false })}>X</Text>
                        <ImageViewer imageUrls={this.getDataImage()} style={{ zIndex: -1 }} />
                    </Modal>
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
)(Picture);

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
