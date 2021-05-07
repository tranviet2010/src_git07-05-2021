import React, { Component } from "react";
import {
    View,
    Text,
} from "react-native";
import {
    sizeHeight,
    sizeFont,
    sizeWidth,
} from "../../../utils/helper/size.helper";
import { COLOR } from "../../../utils/color/colors";
import { connect } from "react-redux";
import { getConfigCommission, getConfigcom } from '../../../service/order';
var numeral = require("numeral");
class Carts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            loading: true,
            SUM: 0,
            ok: false,
            rose: '',
            sumall: '',
            gioihan: '',
            moneyAll: 0,
            tramtong: '',
            roseAll:[],
        };
    }
    handleHH = () => {
        const { data } = this.props;

        getConfigCommission({
            USERNAME: this.props.authUser.USERNAME,
            VALUES: data,
            IDSHOP: 'F6LKFY'
        })
            .then((res) => {
                this.setState({
                    gioihan: res.data.DISCOUNT_UP,
                    tramtong: res.data.VALUE,
                })
            })
            .catch(() => {
                
            })

            getConfigcom({
            USERNAME: this.props.authUser.USERNAME,
            IDSHOP: 'F6LKFY'
        })
            .then((res) => {
                this.setState({
                    roseAll:res.data.INFO
                })
            })
            .catch(() => {
                
            })

    }
    componentDidMount() {
        this.handleHH();
    }
    checkKM = (a) => {
        const { data } = this.props;
        const { roseAll } = this.state;
        var b;
        // for(let i=0;i<roseAll.length;i++){
        //     if(data>=roseAll[i].DISCOUNT_DOWN*0.8){
        //         return roseAll[i].va
        //     }
        // }
        if(a>=80000 && a<100000){
             b=3;
        }else if(a>=320000 && a<500000){
             b=4;
        }else if(a>=800000 && a<1000000){
             b=5;
        }else{
             b=0;
        }
        return b;

        
    }
    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data || this.props.rose !== prevProps.rose) {
            this.handleHH();
            this.setState({
                rose: this.props.rose
            })
        }
    }
    render() {
        const { data, authUser } = this.props;
        const { tramtong, rose, gioihan,roseAll } = this.state;
        // console.log("tramtong=====",tramtong);
        // console.log("DATA=====",data);
        // console.log("rose=====",rose);
        return (
            <View>
                {this.props.authUser.GROUPS == 8 ? null : <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginVertical: sizeHeight(1),
                        paddingHorizontal: sizeWidth(2),
                    }}
                >
                    <Text style={{ fontSize: sizeFont(4), fontWeight: "bold" }}>
                        Điểm thưởng:
            </Text>
                    <Text style={{ fontSize: sizeFont(4), fontWeight: "bold", color: "#149CC6" }}>
                        {numeral(data * tramtong * 0.01 + authUser.COMISSION * 0.01 * data).format("0,0")} VNĐ
            </Text>
                </View>}
                {data < 50000 ?
                    <Text style={{ fontSize: 14, paddingLeft: 10, fontStyle: 'italic' }}>(Chúng tôi chỉ nhận các đơn hàng có giá trị tối thiểu 50.000đ, vui lòng chọn thêm hàng. Xin cảm ơn)</Text> : null}
                {this.checkKM(data) == 0 ? null : <Text style={{ fontSize: 14, paddingLeft: 10, fontStyle: 'italic' }}>Đơn hàng của quý khách gần đủ giá trị {numeral(this.state.gioihan).format("0,0")} đ để hưởng tích điểm {this.checkKM(data)}%, hãy mua thêm để được ưu đãi nhiều hơn</Text>}
            </View>
        );
    }
}


// giỏ hàng backra bị đơ
// mua nhanh các màn khác chưa hiển thị




const mapStateToProps = (state) => {
    return {
        status: state.authUser.status,
        authUser: state.authUser.authUser,
        username: state.authUser.username,
        listItem: state.order.listItem,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeToCart: (text) => dispatch(removeToCart(text)),
        addToCart: (text) => dispatch(addToCart(text)),
        removeAllToCart: (text) => dispatch(removeAllToCart()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Carts);
