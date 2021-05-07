import React, { Component } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Text } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay";
import { ElementCustom, AlertCommon } from "../../../components/error";
import { getListTrend } from "../../../service/products";
import {
  sizeWidth,
  sizeHeight,
  sizeFont,
} from "../../../utils/helper/size.helper";
import { Image } from "react-native-elements";
var numeral = require("numeral");
import { COLOR } from "../../../utils/color/colors";
import { connect } from "react-redux";
import { GetTrendProduct } from "../../../action/productAction";

class ComponentTrend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
    };
    this.message;
  }
  componentDidMount() {
    const { TYPE } = this.props.route.params;
    const { GetTrendProduct } = this.props;
    GetTrendProduct({ USERNAME: null, IDSHOP: "BABU12", STT_TREND: TYPE })
      .then((result) => {
        if (result.data.ERROR !== "0000") {
          this.setState({ loading: false }, () => {
            this.message = setTimeout(
              () => AlertCommon("Thông báo", result.data.RESULT, () => null),
              10
            );
          });
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentWillUnmount() {
    clearTimeout(this.message);
  }
  render() {
    const { data, loading, refreshing } = this.state;
    const { navigation, bestProduct, newProduct, popularProduct } = this.props;
    const { TYPE } = this.props.route.params;
    return loading ? (
      <Spinner
        visible={loading}
        customIndicator={<ElementCustom />}
        //overlayColor="#ddd"
      />
    ) : (
      <View style={{ width: sizeWidth(96), alignSelf: "center" }}>
        <FlatList
          numColumns={2}
          data={
            TYPE === 1 ? popularProduct : TYPE === 2 ? bestProduct : newProduct
          }
          keyExtractor={(item) => item.ID}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.touchFlatListChild}
                onPress={() =>
                  navigation.navigate("DetailProducts", {
                    ID_PRODUCT: item.ID_PRODUCT,
                    NAME: "ComponentTrend",
                  })
                }
              >
                <Image
                  source={{ uri: item.IMAGE_COVER }}
                  PlaceholderContent={<ActivityIndicator />}
                  resizeMode="cover"
                  style={styles.imageSize}
                />
                <Text style={styles.textName}>{item.PRODUCT_NAME} </Text>
                <Text style={styles.textCode}>{item.MODEL_PRODUCT} </Text>
                <Text style={styles.textPrice}>
                  {numeral(item.PRICE).format("0,0")}VNĐ
                </Text>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={() => (
            <View>
              <Text>Không có dữ liệu</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  touchFlatListChild: {
    borderRadius: 6,
    borderColor: COLOR.BUTTON,
    borderWidth: 0.5,
    marginVertical: sizeHeight(1),
    width: sizeWidth(47),
    overflow: "hidden",
    marginRight: sizeWidth(2),
  },
  imageSize: {
    width: sizeWidth(47),
    // width: sizeWidth(30),
    height: sizeHeight(20),
    //height: sizeHeight(20),
    overflow: "visible",
  },
  textName: {
    fontSize: sizeFont(4),
    paddingVertical: sizeHeight(3.5),
    paddingHorizontal: sizeWidth(2),
    paddingTop: sizeHeight(4.5),
    paddingVertical: sizeHeight(1),
  },
  textCode: {
    fontSize: sizeFont(4),
    fontWeight: "bold",
    paddingHorizontal: sizeWidth(2),
  },
  textPrice: {
    color: COLOR.BUTTON,
    fontSize: sizeFont(3.8),
    paddingVertical: sizeHeight(1),
    paddingHorizontal: sizeWidth(2),
  },
});

const mapStateToProps = (state) => {
  return {
    bestProduct: state.product.bestProduct,
    popularProduct: state.product.popularProduct,
    newProduct: state.product.newProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetTrendProduct: (data) => dispatch(GetTrendProduct(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentTrend);