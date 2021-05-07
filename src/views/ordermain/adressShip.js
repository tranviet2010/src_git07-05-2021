import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { sizeHeight, sizeWidth } from '../../utils/helper/size.helper';
import { connect } from 'react-redux';
import { GetDistrict } from '../../service/countries';

class OrderMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            city: '',
            district: '',
            citymain: '',
        }
    }
    checkCity = () => {
        const { Data } = this.props;
        const { city } = this.props;
        for (let i = 0; i < city.length; i++) {
            if (Data.ID_CITY == city[i].MATP) {
                return city[i].NAME
            }
        }
    }
    componentDidMount() {
        const { Data } = this.props;
        GetDistrict({
            ID_CITY: Data.ID_CITY
        }).then((res) => {
            for (let i = 0; i < res.data.INFO.length; i++) {
                if (res.data.INFO[i].MAQH == Data.ID_DISTRICT) {
                    this.setState({
                        district: res.data.INFO[i].NAME
                    })
                }
            }
        })
    }
    render() {
        const { Data } = this.props;
        const { district } = this.state;
        return (
            <View style={styles.status}>
                <View style={styles.status1}><Text>Nhận hàng tại</Text></View>
                {district!=''?<View style={styles.status2}><Text>{Data&&Data.ADDRESS_RECEIVER+'- '+ district + '-' + this.checkCity()}. Từ {Data&&Data.REQUEST_TIME_START} đến {Data&&Data.REQUEST_TIME_END} ngày {Data&&Data.REQUEST_DATE}</Text></View>:
                <View style={styles.status2}><Text>{Data.ADDRESS_RECEIVER}</Text></View>
            }
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
    confix: {
        fontSize: 15,
        borderColor: '#4a8939',
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 2,
        borderRadius: 15,
    },
    confix1: {
        marginTop: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    confix2: {
        borderColor: '#4a8939',
        borderWidth: 2,
        width: sizeWidth(40),
        height: sizeHeight(7),
        borderRadius: 15,
    },
    status: {
        flexDirection: 'row',
        borderRadius: 50,
        paddingLeft: 10
    },
    status1: {
        width: sizeWidth(30),
        borderColor: '#CCCECE',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'baseline',
        paddingLeft: 10
    },
    status12: {
        width: sizeWidth(30),
        borderColor: '#CCCECE',
        borderWidth: 1,
        height: sizeHeight(8),
        justifyContent: 'center',
        alignItems: 'baseline',
        paddingLeft: 10
    },
    status2: {
        width: sizeWidth(70),
        borderColor: '#CCCECE',
        borderWidth: 1,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight:10,
    },
    confix15: {
        justifyContent: 'center',
        width: sizeWidth(40),
        borderColor: '#4a8939',
        padding: 5,
        height: sizeHeight(5.6),
        borderWidth: 1,
        borderRadius: 5,

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "#fff",
        width: sizeWidth(90),
        height: sizeHeight(40),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,

    },
})
export default connect(
    mapStateToProps,
    null
)(OrderMain);
