import React, { Component } from 'react'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert, TouchableHighlightComponent } from 'react-native'
import ComponentTextInput from '../../../../components/search'
import { connect } from 'react-redux';
import IconComponets from '../../../../components/icon';
import { sizeFont } from '../../../../utils/helper/size.helper';
import StartThu from '../../../../action/authAction';
import { getShopInfo } from '../../../../service/products'
import { _retrieveData } from "../../../../utils/asynStorage";
import { IDSHOP } from "../../../../utils/asynStorage/store";
import { GetIdShop } from "../../../../action/authAction";
import { getShop } from "../../../../action/authAction";

class StartTwo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            startThu: '',
            con:false,
        }
    }
    handload = async () => {
        let [username, password] = ['', ''];
        await _retrieveData(IDSHOP).then((result) => {
            if (result) {
                username = result.substr(1).slice(0, -1)
            }
        })
        if (username != '') {
            await this.props.GetIdShop({
                IDSHOP: username,
                USERNAME: '',
            })
                .then((res) => {
                    if (res.data.ERROR == "0000") {
                        this.setState({con:true})
                        this.props.navigation.navigate("screenHome");
                    }

                    else {
                        Alert.alert('Thông báo', 'Sai thông tin mã shop, xin vui lòng thử lại')
                    }
                })
                .catch((err) => {
                });
        }else{

        }
    }
    componentDidMount(){
      
    }
    render() {
        return (
            <View>
                <ImageBackground
                source={require('../../../../assets/images/stacktwo.png')}
                style={styles.container}
            >
                <TouchableOpacity
                    style={styles.button2}
                    onPress={() => {
                        this.setState({ loading: true }, async () => {
                            await this.props.GetIdShop({
                                IDSHOP: this.state.startThu,
                                USERNAME: '',
                            })
                                .then((res) => {
                                    if (res.data.ERROR == "0000") {
                                        this.props.navigation.popToTop();
                                        this.props.navigation.navigate("Account", {
                                            discription: res.data.SHOP_DES,
                                            full_name: res.data.SHOP_NAME,
                                        });
                                    }

                                    else {
                                        Alert.alert('Thông báo', 'Sai thông tin mã shop, xin vui lòng thử lại')
                                    }
                                })
                                .catch((err) => {
                                });
                            this.setState({ loading: false });

                        });

                    }}
                >
                    <IconComponets
                        color={"#fff"}
                        size={sizeFont(7)}
                        name="angle-right"
                        light
                    />
                </TouchableOpacity>
                <ComponentTextInput
                    style={styles.inputext}
                    placeholder="Nhập mã shop"
                    placeholderTextColor=""
                    type="name"
                    onChangeText={(text) => this.setState({ startThu: text })}
                />

            </ImageBackground>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        GetIdShop: (data) => dispatch(GetIdShop(data))

    }
}
export default connect(null, mapDispatchToProps)(StartTwo);
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        height: 700,
        alignItems: "center",
        width: 395,
    },
    button2: {
        borderRadius: 50,
        top: '30%',
        width: '30%',
        alignItems: "center",
        backgroundColor: "#149CC6",
        padding: 5
    },
    inputext: {
        top: '14%',
    }
})
