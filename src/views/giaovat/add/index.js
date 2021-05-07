import React, { Component } from 'react'
import { StyleSheet, TextInput, Text, View, Image, Switch, TouchableOpacity, Keyboard, Alert, BackHandler, Modal, TouchableWithoutFeedback } from 'react-native'
import { connect } from "react-redux";
import moment from "moment";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker/src';
import { sizeWidth, sizeHeight, sizeFont } from '../../../utils/helper/size.helper';
import { COLOR } from '../../../utils/color/colors';
import { UpdateProduct, getText } from '../../../service/giaovat';
import { ElementCustom, AlertCommon } from "../../../components/error";
import Spinner from "react-native-loading-spinner-overlay";


var numeral = require("numeral");

const options = {
    title: "Select Avatar",
    storageOptions: {
        skipBackup: true,
        path: "images",
    },
    maxWidth: 720,
    maxHeight: 1080,
};
class Addread extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Data: [],
            isDatePickerVisible: false,
            inDateEndPicker: false,
            loading: false,
            momney: '',
            value: '',
            isEnabled: true,
            typeinfo: 'Chọn loại tin',
            typeid: '',
            type: 'Chọn loại hàng hoá',
            modalVisible: false,
            typeidProduct: '',
            content: '',
            IMG1: '',
            IMG2: '',
            IMG3: '',
            numberPick: '',
        }
    }
    addProduct = () => {
        const { content, shipcode, typeid, typeidProduct, IMG1, IMG2, IMG3, isEnabled } = this.state;
        if (content.length > 1000) {
            Alert.alert('Thông báo', 'Bạn đã nhập quá số ký tự cho phép')
        } else if (typeidProduct == '') {
            Alert.alert('Thông báo', 'Bạn chưa chọn loại hàng hoá')
        } else if (typeid == '') {
            Alert.alert('Thông báo', 'Bạn chưa chọn loại tin')
        }
        else {
            UpdateProduct({
                ACTION: 'I',
                TYPE: typeid,
                ID: '',
                PRODUCT_TYPE_ID: typeidProduct,
                STATUS: shipcode,
                DESCRIPTION: content,
                IMG1: IMG1,
                IMG2: IMG2,
                IMG3: IMG3,
                SHOW_MOBILE: isEnabled ? 1 : 0
            }).then((res) => {
                this.props.navigation.goBack();
                this.props.route.params.reload();
            }).catch((err) => err)
        }
    }
    toggleSwitch = () => {
        this.setState({
            isEnabled: !this.state.isEnabled
        })
    }
    upload = (source, data, type) => {
        console.log("hhhhhhh===",source)
        if (source != null) {
          var photo = { ...source, name: "image.jpg", type: "image/jpeg" };
          this.setState({
            loading: true,
          });
          const data = new FormData();
          data.append("name", "imagefile");
          data.append("image", photo);
          fetch("https://f5sell.com/f/upload_avatar.jsp", {
            method: "post",
            body: data,
            headers: {
              "Content-Type": "multipart/form-data; ",
              "Content-Disposition": "form-data",
            },
          })
            .then(async (res) => {
              let responseJson = await res.json();
              if (responseJson.ERROR == "0000") {
                if (type === 1) {
                  this.setState(
                    {
                      IMG1: responseJson.URL,
                    },
                    () => this.setState({ loading: false,modalVisible:!this.state.modalVisible })
                  );
                } else if (type === 2) {
                  this.setState(
                    {
                      IMG2: responseJson.URL,
                    },
                    () => this.setState({ loading: false,modalVisible:!this.state.modalVisible })
                  );
                } else if (type === 3) {
                  this.setState(
                    {
                      IMG3: responseJson.URL,
                    },
                    () => this.setState({ loading: false,modalVisible:!this.state.modalVisible })
                  );
                }
              } else {
                this.setState(
                  {
                    loading: false,
                  },
                  () => {
                    this.message = setTimeout(
                      () =>
                        AlertCommon("Thông báo", responseJson.RESULT, () => null),
                      10
                    );
                  }
                );
              }
            })
            .catch((err) => {
              this.setState({ loading: false });
              this.message = setTimeout(
                () => AlertCommon("Thông báo", "Có lỗi xảy ra", () => null),
                5
              );
            });
        }
      };
    handleImage = (type) => {
        launchImageLibrary(options, async (response) => {
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                const source = { uri: response.uri };
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState(
                    {
                        loading: true,
                    },
                    () => this.upload(source, response.data, type)
                );
            }
        });
    };
    handleImageCamera = (type) => {
        launchCamera(options, async (response) => {
            console.log("Response = ", response);

            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.error) {
                console.log("ImagePicker Error: ", response.error);
            } else if (response.customButton) {
                console.log("User tapped custom button: ", response.customButton);
            } else {
                const source = { uri: response.uri };
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState(
                    {
                        loading: true,
                    },
                    () => this.upload(source, response.data, type)
                );
            }
        });
    }
    componentDidMount() {

    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    typeinfoProduct = (text) => {
        this.setState({
            typeinfo: text.NAME,
            typeid: text.ID,
        })
    }
    changeDistrictChild = (text) => {
        this.setState({
            type: text.NAME,
            typeidProduct: text.ID,
        })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.props.navigation.goBack(null);
        return true;
    };
    render() {
        const { isEnabled, shipcode, content, type, typeinfo, IMG1, IMG2, IMG3, modalVisible, numberPick,loading } = this.state;
        return (
            <View style={{ padding: 10 }} >
                <Spinner
                    visible={loading}
                    customIndicator={<ElementCustom />}
                //overlayColor="#ddd"
                />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <TouchableOpacity style={{ width: sizeWidth(55), justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#494848', alignItems: 'center' }}
                                    onPress={() => this.props.navigation.navigate("typeProduct", {
                                        onSetDistrictChild: this.changeDistrictChild,
                                        text: true
                                    })}
                                >
                                    <Text>{type}</Text>
                                </TouchableOpacity>
                                <Image
                                    source={require('../../../assets/images/dowmenu.png')}
                                    style={{ width: 10, height: 10 }}
                                />
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <TouchableOpacity style={{ width: sizeWidth(30), justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#494848', alignItems: 'center' }}
                                    onPress={() => this.props.navigation.navigate("typeinfo", {
                                        typeinfo: this.typeinfoProduct
                                    })}
                                >
                                    <Text>{typeinfo}</Text>
                                </TouchableOpacity>
                                <Image
                                    source={require('../../../assets/images/dowmenu.png')}
                                    style={{ width: 10, height: 10 }}
                                />
                            </View>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ marginTop: 10, marginBottom: 10 }}><Text style={{ fontWeight: 'bold', fontSize: 15 }}>Nội dung </Text><Text style={{ color: '#999999', fontSize: 13 }}>({content.length}/1000)</Text></Text>
                            <TextInput
                                multiline={true}
                                placeholder="Nhập nội dung"
                                style={{ textAlignVertical: 'top',width: sizeWidth(95), height: 200, backgroundColor: '#EEEEEE', paddingLeft: 10, fontSize: 15 }}
                                onChangeText={(text) => { this.setState({ content: text }) }}
                            />
                        </View>
                        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>

                            <TouchableOpacity style={{ width: sizeWidth(30), height: sizeHeight(15), backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => this.setState({
                                    modalVisible: true,
                                    numberPick: 1,
                                })}
                            >
                                {IMG1 == '' ? <View><Image
                                    source={require('../../../assets/images/addimage.png')}
                                    style={{ width: sizeWidth(18), height: sizeHeight(10) }}
                                />
                                    <Text style={{ marginTop: 10 }}>Thêm hình</Text></View> : <Image
                                        source={{ uri: IMG1 }}
                                        style={{ width: sizeWidth(30), height: sizeHeight(15) }}
                                    />}
                            </TouchableOpacity>

                            {IMG1 == '' ? null : <TouchableOpacity style={{ width: sizeWidth(30), height: sizeHeight(15), backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => this.setState({
                                    modalVisible: true,
                                    numberPick: 2,
                                })}
                            >
                                {IMG2 == '' ? <View><Image
                                    source={require('../../../assets/images/addimage.png')}
                                    style={{ width: sizeWidth(18), height: sizeHeight(10) }}
                                />
                                    <Text style={{ marginTop: 10 }}>Thêm hình</Text></View> : <Image
                                        source={{ uri: IMG2 }}
                                        style={{ width: sizeWidth(30), height: sizeHeight(15) }}
                                    />}
                            </TouchableOpacity>}
                            {IMG2 == '' ? <View style={{ width: sizeWidth(30), height: sizeHeight(15), justifyContent: 'center', alignItems: 'center' }}></View> : <TouchableOpacity style={{ width: sizeWidth(30), height: sizeHeight(15), backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => this.setState({
                                    modalVisible: true,
                                    numberPick: 3,
                                })}
                            >
                                {IMG3 == '' ? <View><Image
                                    source={require('../../../assets/images/addimage.png')}
                                    style={{ width: sizeWidth(18), height: sizeHeight(10) }}
                                />
                                    <Text style={{ marginTop: 10 }}>Thêm hình</Text></View> : <Image
                                        source={{ uri: IMG3 }}
                                        style={{ width: sizeWidth(30), height: sizeHeight(15) }}
                                    />}
                            </TouchableOpacity>}
                        </View>
                        <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 15 }}>Hiển thị số điện thoại</Text>
                            <View style={{ flexDirection: 'row', height: sizeHeight(4), alignItems: 'center', marginLeft: 30 }}>
                                <View >
                                    <Switch
                                        trackColor={{ false: "#f4f3f4", true: "#EEEEEE" }}
                                        thumbColor={isEnabled ? "#4a8939" : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={this.toggleSwitch}
                                        value={isEnabled}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: sizeHeight(20) }}>
                            <TouchableOpacity
                                style={{ width: sizeWidth(80), height: sizeHeight(5), backgroundColor: content.length != 0 ? COLOR.HEADER : '#EEEEEE', justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => this.addProduct()}
                                disabled={content.length != 0 ? false : true}
                            >
                                <Text style={{ color: '#fff', fontWeight: '600', fontSize: 17 }}>Đăng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={{ position: 'absolute', bottom: sizeHeight(20), justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.handleImage(numberPick)
                                        }}
                                    >
                                        <Text style={{ fontSize: sizeFont(5), color: '#2196F3', textDecorationLine: 'underline' }}>Chọn từ thư viện...</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.handleImageCamera(numberPick)}
                                    >
                                        <Text style={{ fontSize: sizeFont(5), color: '#2196F3', textDecorationLine: 'underline', marginTop: sizeHeight(2) }}>Chọn từ camera...</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ ...styles.openButton }}
                                        onPress={() => {
                                            this.setState({
                                                modalVisible: !modalVisible
                                            })
                                        }}
                                    >
                                        <Text style={styles.textStyle}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>


                            </View>
                        </View>
                    </Modal>
                    <View>

                    </View>
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
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: sizeWidth(100),
        height: sizeHeight(50),
        backgroundColor: "white",

        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        paddingTop: 10,
        elevation: 2
    },
    textStyle: {
        color: "#2196F3",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: sizeFont(5),
        marginTop: sizeHeight(1),
    },
})
