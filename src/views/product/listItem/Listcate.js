import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import {
    sizeFont,
    sizeHeight,
    sizeWidth,
} from "../../../utils/helper/size.helper";

export default class Listcate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false,
            idType: '',
        }
    }
    componentDidMount() {

    }
    render() {
        const { Value,navigation } = this.props.route.params;
        console.log("his value", Value)
        const { active, idType } = this.state;
       console.log("this navigation==",navigation)
        return (
            <ScrollView>
                {Value ? Value.map((Val, index) =>
                (
                    <View style={{}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: sizeWidth(100), height: sizeHeight(6), backgroundColor: 'white', color: '#149CC6', fontSize: 16, paddingLeft: 10, borderTopColor: '#149CC6', borderTopWidth: 1 }}>
                            <Text
                                style={{ justifyContent: 'center', alignContent: 'center' }}
                                onPress={() => {
                                    navigation.navigate("ChildListItem", {
                                        name: Val.NAME,
                                        ID: Val.ID,
                                    });
                                }}
                            >{Val.NAME}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ active: !active, idType: Val.ID })
                                }}
                            >
                                {active == index ? <Image
                                    source={require('../../../assets/images/dowmenu.png')}
                                    style={{ width: 15, height: 15, marginRight: 10 }}
                                /> : <Image
                                        source={require('../../../assets/images/leftmenu.png')}
                                        style={{ width: 15, height: 15, marginRight: 10 }}
                                    />}
                            </TouchableOpacity>
                        </View>
                        {active ? (
                            <View >
                                {Val.INFO.map((value) => (
                                    <View>
                                        {
                                            value.SUB_ID_PARENT == idType ?
                                                <View style={{backgroundColor:'#fff'}}>
                                                    <Text
                                                        style={{ justifyContent: 'center', alignContent: 'center', padding: 10, paddingLeft: 20 }}
                                                        onPress={() => {
                                                            navigation.navigate("SubChildItem", {
                                                                SUB_ID_PAR: value.SUB_ID_PARENT,
                                                                ID: value.SUB_ID,
                                                                name: value.SUB_NAME,
                                                                NAME: "listproduct",
                                                            });
                                                        }}
                                                    >{value.SUB_NAME}</Text>
                                                </View> : null
                                        }
                                    </View>
                                ))}
                            </View>
                        ) : false}
                    </View>
                )

                ) : null}

            </ScrollView>
        )
    }
}