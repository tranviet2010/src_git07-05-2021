import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, ScrollView, RefreshControl } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { sizeHeight, sizeWidth, sizeFont } from '../../../../utils/helper/size.helper';
import { connect } from 'react-redux';
var numeral = require("numeral");
import Loading from '../../../../components/loading';
import IconComponets from "../../../../components/icon";

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
        }
    }
    render() {
        const { loading } = this.state;
        return (
            <View>
                <View>
                    <TouchableOpacity
                        style={styles.touch}
                        onPress={() => this.props.navigation.navigate("reportall")}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require('../../../../assets/images/chinh.png')}
                                style={{ width: 30, height: 30 }}
                            />
                            <Text style={styles.text}>Báo cáo chung</Text>
                        </View>
                        <IconComponets
                            name="chevron-right"
                            size={sizeFont(5)}
                            color={"#4d7335"}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.touch}
                        onPress={() => {
                            this.props.navigation.navigate("reportCTV")
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require('../../../../assets/images/info.png')}
                                style={{ width: 30, height: 30 }}
                            />
                            <Text style={styles.text}>Thống kê theo CTV </Text>
                        </View>

                        <IconComponets
                            name="chevron-right"
                            size={sizeFont(5)}
                            color={"#4d7335"}
                        />
                    </TouchableOpacity>
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
    };
};
const styles = StyleSheet.create({
    touch: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        paddingVertical: sizeHeight(2),
        paddingHorizontal: sizeWidth(2.5),
        paddingLeft: sizeWidth(5),
        alignItems: 'center',
    },
    bar: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: sizeHeight(2),
        paddingHorizontal: sizeWidth(2.5),
        paddingLeft: sizeWidth(5),
    },
    text: {
        fontSize: sizeFont(4),
        marginLeft: 7,
    },
})

export default connect(
    mapStateToProps,
    null
)(index);
