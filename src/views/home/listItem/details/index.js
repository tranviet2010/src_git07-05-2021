import React, { Component } from "react";
import { _retrieveData } from '../../../../utils/asynStorage';
import { DATAITEM } from '../../../../utils/asynStorage/store';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Share,
  Button,
  Alert,
  Dimensions,
  Modal,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import IconComponets from "../../../../components/icon";
import ImageViewer from 'react-native-image-zoom-viewer';
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
import _ from "lodash";
import { IGNORED_TAGS } from "react-native-render-html/src/HTMLUtils";
import { GetProperties } from "../../../../service/order";
var numeral = require("numeral");
const tags = _.without(
  IGNORED_TAGS,
  "table",
  "caption",
  "col",
  "colgroup",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr"
);
const tableDefaultStyle = {
  flex: 1,
  justifyContent: "flex-start",
};
const tableColumnStyle = {
  ...tableDefaultStyle,
  flexDirection: "column",
  alignItems: "center",
};

const tableRowStyle = {
  ...tableDefaultStyle,
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 0.3,
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
};
const tdStyle = {
  ...tableDefaultStyle,
  borderRightWidth: 0.5,
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
};
const thStyle = {
  ...tdStyle,
  //backgroundColor: "#CCCCCC",
  alignItems: "center",
};
const renderers = {
  table: (x, c) => <View style={tableColumnStyle}>{c}</View>,
  col: (x, c) => <View style={tableColumnStyle}>{c}</View>,
  colgroup: (x, c) => <View style={tableRowStyle}>{c}</View>,
  tbody: (x, c) => <View style={tableColumnStyle}>{c}</View>,
  tfoot: (x, c) => <View style={tableRowStyle}>{c}</View>,
  th: (x, c) => <View style={thStyle}>{c}</View>,
  thead: (x, c) => <View style={tableRowStyle}>{c}</View>,
  caption: (x, c) => <View style={tableColumnStyle}>{c}</View>,
  tr: (x, c) => <View style={tableRowStyle}>{c}</View>,
  td: (x, c) => <View style={tdStyle}>{c}</View>,
};
class DetailProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      activeTab: 1,
      cartLength: this.props.listItem.length,
      loading: true,
      refreshing: false,
      data: [],
      image: [],
      dataImage: [],
      inside: true,
      active: false,
      color1: '#96CD01',
      color: '#F5F5F5',
      properties: '',
      setSelectedValue: '',
    };
    this.arrayImage = [];
    this.refs._carousel;
    //this.activeTab = 1;
  }
  countPlus = () => {
    this.setState({ count: this.state.count + 1 });
  };
  countNagative = () => {
    if (this.state.count == 1) {
      return;
    } else this.setState({ count: this.state.count - 1 });
  };
  confixImage = () => {
    const { data } = this.state;
    var dataSlidebox = [data.IMG1, data.IMG2, data.IMG3];
    var arrayImage = dataSlidebox.filter((value) => {
      return value != null;
    });
    return arrayImage
  }
  async componentDidMount() {
    const { authUser, navigation, status } = this.props;
    //ID_PRODUCT
    const { ID_PRODUCT } = this.props.route.params;
    await getDetails({
      USERNAME: status === "" ? null : authUser.USERNAME,
      IDSHOP: "F6LKFY",
      IDPRODUCT: ID_PRODUCT,
    })
      .then((result) => {
        if (result.data.ERROR === "0000") {
          this.setState({ data: result.data.INFO[0] }, () =>
            this.setState({
              loading: false,
              // image: [{
              //   url: result.data.INFO[0].IMG1,
              // },{
              //   url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
              // }
              // ]
              dataImage: result.data.INFO[0].MEDIA_FB.split("||")
            })
          );
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
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
    navigation.setParams({
      NAVIGATE: () => null,
    });
  }
  handleTouchAdd = async (data) => {
    const { cartLength } = this.state;
    const { status, navigation } = this.props;
    data.qualyty = 1;
    if (status == "") {
      return AlertCommonLogin(
        "Th??ng b??o",
        "Vui l??ng ????ng nh???p tr?????c khi ?????t h??ng",
        () => null,
        () => {
          navigation.popToTop();
          navigation.navigate("SignIn");
        },
        "Hu??? b???",
        "????ng nh???p"
      );
    }
    let dataCart = await _retrieveData(DATAITEM);
    let cart = JSON.parse(dataCart);
    await this.props.addToCart({cart,data});
    if (cartLength == this.props.listItem.length) {
      AlertCommon("Th??ng b??o", "S???n ph???m ???? c?? trong gi??? h??ng", () => null);
    } else {
      Alert.alert(
        "Th??ng b??o",
        "Th??m s???n ph???m v??o gi??? h??ng th??nh c??ng",
        [
          {
            text: "Ti???p t???c mua h??ng",
            onPress: () => {
              navigation.popToTop();
              navigation.navigate("HomePay")
            },
            style: "destructive",
          },
          {
            text: "V??o gi??? h??ng",
            onPress: () => {
              navigation.navigate("CartHome", {
                NAME: "HomePay",
              })
            },
            style: "default",
          },
        ],
        { cancelable: false }
      );
      this.setState({
        cartLength: cartLength + 1,
      });
    }
  }
  checkTime = (a, b) => {
    var start = a;
    var end = b;
    var datePart1 = start.split("/");
    var datePart2 = end.split("/");

    var dateObject1 = new Date(+datePart1[2], datePart1[1] - 1, +datePart1[0]);
    var dateObject2 = new Date(+datePart2[2], datePart2[1] - 1, +datePart2[0]);
    return dateObject2 - dateObject1;
  }
  getDataImage = () => {
    const { dataImage } = this.state;
    let newArray = [];
    const pushObjject = (item: string) => {
      return { url: item }
    }
    dataImage.map((item: string) => {
      newArray.push(pushObjject(item))
    })
    return newArray;
  }
  render() {
    const { count, activeTab, active, cartLength, image, loading, data, inside, properties, dataImage, setSelectedValue } = this.state;
    const { status, authUser } = this.props;
    console.log("this is dataImage", dataImage);
    return loading ? (
      <Spinner
        visible={loading}
        customIndicator={<ElementCustom />}
      // overlayColor="#ddd"
      />
    ) : (

        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <ScrollView>
            <SliderBox
              autoplay={true}
              images={this.confixImage()}
              dotColor={COLOR.BUTTON}
              resizeMode="contain"
              inactiveDotColor={COLOR.HEADER}
              ImageComponentStyle={{
                marginTop: 5,
                height: sizeHeight(40),
                width: sizeWidth(95)
              }}
            />
            <View style={{ marginTop: sizeHeight(3) }}>
              <Text
                style={{
                  fontSize: sizeFont(4),
                  marginLeft: sizeWidth(2),
                  paddingBottom: sizeHeight(1),
                  fontWeight: "bold"
                }}
              >
                {data.PRODUCT_NAME}
              </Text>
              <View style={styles.viewChildDetail}>
                <Text style={{ fontSize: sizeFont(4), color: COLOR.BUTTON, fontWeight: "500" }}>
                  Gi??: {data.END_PROMOTION && this.checkTime(data.START_PROMOTION, data.END_PROMOTION) > 0 ? <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: 'red', marginRight: 10 }}>{numeral(data.PRICE_PROMOTION).format("0,0")} ??</Text>
                      <Text style={{ textDecorationLine: 'line-through', color: 'gray', fontSize: sizeFont(3.5) }}>{numeral(data.PRICE).format("0,0")} ??</Text>
                    </View>
                  </View> : <Text >
                      {numeral(data.PRICE).format("0,0")} ??
                          </Text>}
                </Text>
              </View>
              {/* <View style={{marginHorizontal: sizeWidth(2),}}>
              {this.props.authUser.GROUPS == 8 || this.props.authUser.GROUPS == undefined ? null :
                  <Text style={{ color: '#006699' }}>Hoa h???ng s???n ph???m: {data.END_PROMOTION && this.checkTime(data.START_PROMOTION, data.END_PROMOTION) > 0 ?
                    <Text>{numeral(data.COMISSION_PRODUCT * data.PRICE_PROMOTION * 0.01).format("0,0")}?? ({data.COMISSION_PRODUCT}%)</Text> :
                    <Text>{numeral(data.COMISSION_PRODUCT * data.PRICE * 0.01).format("0,0")}?? ({data.COMISSION_PRODUCT}%)</Text>}</Text>}
              </View> */}
              {properties ? <View style={{ paddingLeft: 10, marginBottom: 10 }}>
                {properties != [] ? properties.map((val, key) => {
                  return (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                      <Text style={{ fontWeight: '400' }}>{val.NAME}: </Text>

                      <View style={{ borderColor: '#4d7335', alignItems: 'center' }}>

                        {
                          val.INFO.map((val2) => {
                            return (
                              <Text style={{ fontWeight: '400' }}>{val2.SUB_PROPERTIES}</Text>
                            )
                          })

                        }

                      </View>
                    </View>
                  )
                }) : null}
              </View> : null}

              <View style={{ paddingLeft: 10, flexDirection: 'row' }}>
                <Image
                  source={require('../../../../assets/images/ship.png')}
                  style={{ width: 45, height: 25 }}
                />
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("Chi ti???t ch??nh s??ch", {
                      item: '566',
                    })
                  }
                >
                  <Text style={{ fontSize: 17, width: sizeWidth(77), marginLeft: 10, fontStyle: 'italic', textDecorationLine: 'underline' }}>Ch??nh s??ch giao h??ng</Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 10, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                {status === "" || (status !== "" && authUser.GROUPS !== "3") ? (
                  <View
                    style={{
                      flexDirection: "row",
                      height: isIphoneX() ? sizeHeight(6) : sizeHeight(5.5),
                      width: sizeWidth(90)
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.handleTouchAdd(data)}
                      style={styles.touchSafeAddCart}
                    >
                      <IconComponets name="cart-plus" size={sizeFont(5)} color="#fff" />
                      <Text style={{ color: "#fff", marginLeft: sizeWidth(4), textAlign: 'center' }}>
                        Th??m v??o gi??? h??ng
              </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
              <View style={{ height: 4, backgroundColor: '#F1F2F2' }}></View>
              <View style={{ marginTop: sizeHeight(3) }}>

                <View style={{ width: sizeWidth(96), alignSelf: "center" }}>
                  <Text style={{ fontWeight: '500', fontSize: sizeFont(4.5) }}>M?? t??? s???n ph???m: </Text>
                  <HTML
                    ignoredTags={tags}
                    html={
                      data.CONTENT_FB === null
                        ? "<h5>M?? t???:...</h5>"
                        : data.CONTENT_FB
                    }
                    onLinkPress={(event, href) =>
                      console.log("clicked link: ", href)
                    }
                    renderers={renderers}
                    baseFontStyle={{ fontSize: sizeFont(4) }}
                  />
                </View>
              </View>
            </View>
            {dataImage && dataImage.length == 0 ? null : <View style={{ width: sizeWidth(100) }}>
              <Text style={{ fontWeight: '500', fontSize: sizeFont(4.5), marginLeft: sizeWidth(2) }}>???nh s???n ph???m: </Text>
              <ScrollView
                horizontal={true}
              // style={{ flexDirection: 'row', padding: 10 }}
              // onPress={() => {
              //   this.setState({
              //     active: true
              //   })
              // }}
              >
                {dataImage.map((val, index) => (
                  <TouchableOpacity style={{ padding: 10 }}
                    onPress={() => {
                      this.setState({
                        active: true
                      })
                    }}
                  >
                    <Image
                      source={{ uri: val }}
                      style={{ width: sizeWidth(35), height: sizeHeight(20) }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>}
            {/* <View>
              <FlatList
                data={dataImage}
                renderItem={(item) => (
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={{ uri: item }}
                      style={{ width: sizeWidth(20), height: sizeHeight(10) }}
                    />
                  </View>
                )}
                keyExtractor={item => item.index}
              />
            </View> */}
          </ScrollView>
          <View>
            <Modal visible={active} >
              <Text style={{ position: 'absolute', top: 50, color: '#fff', right: 30, fontSize: 17 }} onPress={() => this.setState({ active: false })}>X</Text>
              <ImageViewer imageUrls={this.getDataImage()} style={{ zIndex: -1 }} />
            </Modal>
          </View>
        </SafeAreaView>

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
  return { addToCart: (text) => dispatch(addToCart(text)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailProducts);
