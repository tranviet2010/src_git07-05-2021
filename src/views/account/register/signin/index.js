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
            <Text style={{ color: '#fff', fontSize: 16, marginBottom: 7}}>Tên đăng nhập</Text>
            <View style={{
              flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: sizeWidth(90),
              backgroundColor: '#f8f9fa3d', borderRadius: 5
            }}>
              <Image
                source={require('../../../../assets/images/user2.png')}
                style={{ width: 25, height: 25 }}
              />
              <TextInput
                placeholder="Là mã căn hộ, VD: 1802A4"
                autoCapitalize="characters"
                placeholderTextColor='#e3e3e5'
                onChangeText={(text) => this.setState({ phoneText: text })}
                style={{ width: sizeWidth(80), height: sizeHeight(7), padding: 10, color: '#fff' }}
              />
            </View>
          </View>
          <View style={{ marginTop: sizeHeight(5) }}>
            <Text style={{ color: '#fff', fontSize: 16, marginBottom: 7 }}>Mật khẩu</Text>
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
                  placeholder="Nhập mật khẩu"
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
          <Text style={{ color: '#fff', fontStyle: 'italic' }}>Mật khẩu đăng nhập lần đầu là 123456, nếu đã đổi hãy soạn tin nhắn MKH GD gửi 8079 để lấy lại mật khẩu (cước tin nhắn: 1000đ)</Text>
        </View>
        <View style={{ marginTop: sizeHeight(10) }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ loading: true }, async () => {
                if (phoneText == " " && phoneText == "") {
                  AlertCommon("Thông báo", "Vui lòng nhập số điện thoại", () => null);
                } else if (password == "") {
                  AlertCommon("Thông báo", "Vui lòng nhập mật khẩu", () => null);
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
                        Alert.alert('Thông báo', 'Quý khách nhập sai tên đăng nhập hoặc mật khẩu. Xin vui lòng thử lại!')
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
              ĐĂNG NHẬP
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