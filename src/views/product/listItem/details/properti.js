import React, { Component } from "react";
import Share1 from 'react-native-share';
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Share,
    Button,
    Clipboard,
    Picker,
    Alert
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import IconComponets from "../../../../components/icon";
import {
    sizeFont,
    sizeWidth,
    sizeHeight,
} from "../../../../utils/helper/size.helper";
import { COLOR } from "../../../../utils/color/colors";
import styles from "../style";
import { connect } from "react-redux";
import { isIphoneX } from "react-native-iphone-x-helper";
import {
    AlertCommon,
    AlertCommonLogin,
    ElementCustom,
} from "../../../../components/error";
import { addToCart } from "../../../../action/orderAction";
import { getDetails } from "../../../../service/products";
import Spinner from "react-native-loading-spinner-overlay";
import HTML from "react-native-render-html";
import { handleMoney } from "../../../../components/money";
import FooterAdmin from "../footeradmin";
import _ from "lodash";
import { IGNORED_TAGS } from "react-native-render-html/src/HTMLUtils";
import { GetProperties } from "../../../../service/order";
var numeral = require("numeral");
class DetailProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setSelectedValue: '',
        };
        this.arrayImage = [];
        this.refs._carousel;
        //this.activeTab = 1;
    }
    componentDidMount() {
        const { authUser, navigation, status } = this.props;
        {
            GetProperties({
                USERNAME: this.props.username,
                LIST_PROPERTIES: this.state.data.ID_PRODUCT_PROPERTIES,
            })
                .then((res) => {
                    this.setState({
                        properties: res.data.DETAIL
                    })
                })
                .catch((err) => { })
        }
    }
    render() {
        const { count, activeTab, cartLength, loading, data, inside, properties, setSelectedValue } = this.state;
        const { status, authUser } = this.props;
        return (
            <View >
                <Text>hí anh em</Text>
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
    return { addToCart: (text, property) => dispatch(addToCart(text, property)) };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailProducts);
