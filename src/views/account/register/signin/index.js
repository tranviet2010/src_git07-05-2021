import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert
} from "react-native";
import { Toast, Container } from "native-base";
import Feather from "react-native-vector-icons/Feather";
import LogoApp from '../../logo';
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../../utils/helper/size.helper";
import { COLOR } from "../../../../utils/color/colors";
import { connect } from "react-redux";
import { LoginPhone } from "../../../../action/authAction";
import Loading from "../../../../components/loading";
import {getShopInfo} from '../../../../service/products';
import ErrorDisplay, {
  AlertCommon,
} from "../../../../components/error";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneText: "",
      password: "",
      loading: false,
      shopname:'',
      isdisvisi: true,
    };
    this.times;
    this.message = "";
  }
  showToast = (res) => {
    Toast.show({
      text: res.data.RESULT,
      duration: 3000,
      textStyle: {
        color: "red",
        fontSize: sizeFont(4),
        textAlign: "center",
      },
      style: {
        backgroundColor: "#ddd",
        borderRadius: 6,
      },
    });
  };
  componentDidMount() {
    getShopInfo({
      IDSHOP: 'F6LKFY',
      USERNAME: '',
    }).then((res) => {
      if (res.data.ERROR == "0000") {
        this.setState({
          shopname: res.data.SHOP_NAME
        })
      }

      else {

      }
    })
      .catch((err) => {
      });
    

  }
  render() {
    const { phoneText, password, loading, isdisvisi,shopname } = this.state;
    return (
      <View style={{ height: sizeHeight(100), backgroundColor: COLOR.HEADER, alignItems: 'center' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: sizeHeight(50), marginTop: sizeHeight(0) }}>
          <View style={{ alignItems: 'center', justifyContent: 'space-between', padding: 20, flexDirection: 'row', position: 'absolute', right: -30, top: 15 }}>
            <View></View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("screenHome")}
            >
              <Image
                source={require('../../../../assets/images/daux1.png')}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: sizeHeight(10) }}>
            <LogoApp />
          </View>
          <View>
            <Text style={{color:'#fff',fontWeight:'bold',marginBottom:sizeHeight(5),fontSize:sizeFont(5)}}>{shopname}</Text>
          </View>
          <View>
            <Text style={{ color: '#fff', fontSize: 16, marginBottom: 7}}>T??n ????ng nh???p</Text>
            <View style={{
              flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: sizeWidth(90),
              backgroundColor: '#f8f9fa3d', borderRadius: 5
            }}>
              <Image
                source={require('../../../../assets/images/user2.png')}
                style={{ width: 25, height: 25 }}
              />
              <TextInput
                placeholder="L?? m?? c??n h???, VD: 1802A4"
                autoCapitalize="characters"
                placeholderTextColor='#e3e3e5'
                onChangeText={(text) => this.setState({ phoneText: text })}
                style={{ width: sizeWidth(80), height: sizeHeight(7), padding: 10, color: '#fff' }}
              />
            </View>
          </View>
          <View style={{ marginTop: sizeHeight(5) }}>
            <Text style={{ color: '#fff', fontSize: 16, marginBottom: 7 }}>M???t kh???u</Text>
            <View style={{
              flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: sizeWidth(90),
              backgroundColor: '#f8f9fa3d', borderRadius: 5
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={require('../../../../assets/images/pass1.png')}
                  style={{ width: 25, height: 25 }}
                />
                <TextInput
                  placeholder="Nh???p m???t kh???u"
                  placeholderTextColor='#e3e3e5'
                  secureTextEntry={isdisvisi ? true : false}
                  onChangeText={(text) => this.setState({ password: text })}
                  style={{ width: sizeWidth(70), height: sizeHeight(7), padding: 10, color: '#fff' }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ isdisvisi: !isdisvisi })

                }}
                style={{ width: sizeWidth(10) }}
              >
                {
                  isdisvisi ? <Image
                    name="eye-off"
                    color="grey"
                    source={require('../../../../assets/images/eye.png')}
                    style={{ width: 40, height: 40 }}

                  /> : <Image
                  name="eye-off"
                  color="grey"
                  source={require('../../../../assets/images/eye_hidden.png')}
                  style={{ width: 40, height: 40 }}

                />
                }
              </TouchableOpacity>
            </View>
          </View>
          <View>
          </View>
        </View>
        <View style={{ width: sizeWidth(95), justifyContent: 'center', marginTop: sizeHeight(15), alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontStyle: 'italic' }}>M???t kh???u ????ng nh???p l???n ?????u l?? 123456, n???u ???? ?????i h??y so???n tin nh???n MKH GD g???i 8079 ????? l???y l???i m???t kh???u (c?????c tin nh???n: 1000??)</Text>
        </View>
        <View style={{ marginTop: sizeHeight(10) }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ loading: true }, async () => {
                if (phoneText == " " && phoneText == "") {
                  AlertCommon("Th??ng b??o", "Vui l??ng nh???p s??? ??i???n tho???i", () => null);
                } else if (password == "") {
                  AlertCommon("Th??ng b??o", "Vui l??ng nh???p m???t kh???u", () => null);
                } else {
                  await this.props
                    .LoginPhone({
                      IDSHOP: 'F6LKFY',
                      USERNAME: phoneText,
                      PASSWORD: password,
                    })
                    .then((res) => {
                      if (res.data.ERROR == "0000") {
                        this.props.navigation.popToTop();
                        this.props.navigation.navigate("screenHome");
                      } else {
                        Alert.alert('Th??ng b??o', 'Qu?? kh??ch nh???p sai t??n ????ng nh???p ho???c m???t kh???u. Xin vui l??ng th??? l???i!')
                      }
                    })
                    .catch((err) => {
                    });
                }
                this.setState({ loading: false });
              });
            }}
            style={{
              backgroundColor: "#fff",
              paddingVertical: sizeHeight(1.5),
              borderRadius: 100,
              width: sizeWidth(65),
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                color: COLOR.MAIN,
                textAlign: "center",
                fontSize: sizeFont(4),
                fontWeight: 'bold',
              }}
            >
              ????NG NH???P
              </Text>
          </TouchableOpacity>
          {this.message ? <ErrorDisplay message={this.message} /> : null}
          {loading ? <Loading /> : null}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    idshop: state.product.database,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { LoginPhone: (data) => dispatch(LoginPhone(data)) };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);