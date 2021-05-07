import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    ScrollView
} from "react-native";
import { GetInformation } from "../../../../../service/account";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { ElementCustom } from "../../../../../components/error";
import { Image } from "react-native-elements";
import { sizeWidth, sizeHeight } from "../../../../../utils/helper/size.helper";
import moment from "moment";
import _ from "lodash";
import { COLOR } from "../../../../../utils/color/colors";
import HTML from "react-native-render-html";

// 1: gioi thieu; 2: chinh sach ;3 :dao tao; 4: tin tuc
//(danh mục chỉ trên TYPES =daotao thì có, ko thì trống)

class DetailNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
        };
    }
    componentDidMount() {
        const { authUser } = this.props;

        GetInformation({
            USERNAME: authUser.USERNAME,
            TYPES: 4,
            CATEGORY: "",
            IDSHOP: "F6LKFY",
        })
            .then((result) => {
                if (result.data.ERROR === "0000") {
                    this.setState(
                        {
                            data: result.data.INFO,

                        },
                        () => this.setState({ loading: false })
                    );
                } else {
                    this.setState({ loading: false });
                }
            })
            .catch((err) => {
                this.setState({ loading: false });
            });
    }
    render() {
        const { loading, data } = this.state;
        const { item } = this.props.route.params;
        return (
            <View>
                {data.length != 0 ? data.map((val) => {
                    if (val.ID === item) {
                        return (
                            <ScrollView style={{padding:5}}>
                                {/* <Image
                                    source={
                                        val.IMAGE_COVER == null
                                            ? require("../../../../../assets/images/logo.png")
                                            : { uri: val.IMAGE_COVER }
                                    }
                                    resizeMode="center"
                                    style={{ width: sizeWidth(30), height: sizeHeight(20), }}
                                /> */}
                                <View>
                                    <HTML
                                        html={val.CONTENT}
                                    />
                                </View>
                            </ScrollView>
                        )

                    }
                }) : null}
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

const styles = StyleSheet.create({

});
const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailNews);
