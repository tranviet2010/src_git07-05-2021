import React, { Component } from 'react'
import { StyleSheet, View, Image, Alert, Share, SafeAreaView, Linking } from 'react-native'
import { DrawerItem } from '@react-navigation/drawer'
import { _retrieveData } from "../../utils/asynStorage";
import {
  Avatar,
  Title,
  Drawer,
  Text,
} from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { _removeData } from "../../utils/asynStorage";
import { TOKEN, USER_NAME, PASSWORD, IDSHOP } from "../../utils/asynStorage/store";
import { addToCart, removeAllToCart, removeToCart } from "../../action/orderAction";
import { connect } from "react-redux";
import { LogOut } from "../../action/authAction";
import { countNotify } from "../../action/notifyAction";
import { sizeHeight, sizeWidth } from '../../utils/helper/size.helper';
import { COLOR } from '../../utils/color/colors';
import { getShopInfo } from '../../service/products';
import OneSignal from 'react-native-onesignal';

class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlertOption: false,
      data: 12,
      shopname: '',
    };
  }
  show = async () => {
    const deviceState = await OneSignal.getDeviceState();
    return Alert.alert(
      "Đăng xuất",
      "Bạn chắc chắn muốn đăng xuất?",
      [
        {
          text: "Cancel",
          style: "destructive",
        },
        {
          text: "OK",
          onPress: () => {
            Promise.all(_removeData(TOKEN));
            Promise.all(_removeData(USER_NAME));
            Promise.all(_removeData(PASSWORD));
            this.props.countNotify(0);
            deviceState.userId == '';
            this.props.removeAllToCart();
            this.props.LogOut();
            this.props.navigation.navigate('HomePay')
          },
          style: "default",
        },
      ],
      { cancelable: false }
    );
  };
  show1 = () => {
    return Alert.alert(
      "Thông báo",
      "Bạn chắc chắn muốn thay đổi shop và đăng xuất ?",
      [
        {
          text: "Cancel",
          style: "destructive",
        },
        {
          text: "OK",
          onPress: () => {
            Promise.all(_removeData(TOKEN));
            Promise.all(_removeData(USER_NAME));
            Promise.all(_removeData(PASSWORD));
            Promise.all(_removeData(IDSHOP));
            this.props.countNotify(0);
            this.props.LogOut();
            this.props.navigation.navigate('StartTwo')
          },
          style: "default",
        },
      ],
      { cancelable: false }
    );
  };
  shareApp = () => {
    const onShare = () => {
      Share.share({ message: `Đi chợ hàng ngày với ${this.state.shopname} rất hay, đồ luôn TƯƠI NGON, GIAO HÀNG MIỄN PHÍ TẬN NHÀ, ĐÚNG GIỜ. Tải App GDShop về nhé, đừng quên nhập mã giới thiệu ${this.props.authUser.USER_CODE} để nhận ưu đãi', Link tải App: 'https://f5sell.com/buy/f5sell.jsp?idshop=2IIMUL` },
        {
          dialogTitle: 'Chia sẻ đến',
          excludedActivityTypes: [
            'com.apple.mobilenotes.SharingExtension',
            'com.apple.reminders.RemindersEditorExtension'
          ]
        }).then(({ action, activityType }) => {
          if (action === Share.dismissedAction) console.log('Share dismissed');
          else console.log('Share successful');
        });
    }

    const onShare1 = () => {
      Share.share({ message: `Đi chợ hàng ngày với ${this.state.shopname} rất hay, đồ luôn TƯƠI NGON, GIAO HÀNG MIỄN PHÍ TẬN NHÀ, ĐÚNG GIỜ. Tải App GDShop về nhé, Link tải App: 'https://f5sell.com/buy/f5sell.jsp?idshop=2IIMUL` },
        {
          dialogTitle: 'Chia sẻ đến',
          excludedActivityTypes: [
            'com.apple.mobilenotes.SharingExtension',
            'com.apple.reminders.RemindersEditorExtension'
          ]
        }).then(({ action, activityType }) => {
          if (action === Share.dismissedAction) console.log('Share dismissed');
          else console.log('Share successful');
        });
    }
    return Alert.alert(
      "Thông báo",
      // `Hãy giới thiệu ${this.props.idshop.SHOP_NAME} cho bạn bè để cùng xây dựng cộng đồng ${this.props.idshop.SHOP_NAME} Xin cảm ơn`,
      `Hãy giới thiệu những tiện ích tuyệt vời của ${this.state.shopname} cho bạn bè để cùng tận hưởng những sản phẩm TƯƠI NGON, GIAO HÀNG MIỄN PHÍ TẬN NHÀ, ĐÚNG GIỜ. Trân trọng cảm ơn`,
      [
        {
          text: "Để sau",
          style: "destructive",
        },
        {
          text: "Chia sẻ",
          onPress: () => { this.props.status == '' ? onShare1() : onShare() },
          style: "default",
        },
      ],
      { cancelable: false }
    );
  };
  handleLoad = async () => {
    await _retrieveData(USER_NAME)
      .then((res) => {
        this.setState({
          data: res
        })
      })

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
  componentDidMount() {
    this.handleLoad();
  }
  render() {
    const { authUser, status } = this.props;
    const { data } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.MAIN }}>
        {status != '' ? <View><TouchableOpacity style={{ flexDirection: 'row', backgroundColor: "#4d7335", height: 100, justifyContent: 'space-between', alignItems: "center", paddingLeft: 10 }}
          onPress={() => { this.props.navigation.navigate('Thông tin CTV') }}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={{
              width: 60, height: 60, borderRadius: 50,
              justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'
            }}>
              <Image
                source={authUser.AVATAR == null ? require('../../assets/images/logo.png') : { uri: authUser.AVATAR }}
                style={{ width: 60, height: 60, borderRadius: 50 }}
              />
            </View>
            <View style={{ marginLeft: 16, flexDirection: 'column' }}>
              <Title style={{ fontSize: 20, color: 'white' }}>{authUser.USERNAME}</Title>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Mã KH: {authUser.USER_CODE}</Text>
            </View>
          </View>
          <View>
            <Image
              source={require('../../assets/images/leftname.png')}
              style={{ width: 30, height: 40 }}
            />
          </View>

        </TouchableOpacity></View> : <View style={{ flexDirection: 'row', backgroundColor: "#4d7335", height: 100, alignItems: "center", paddingLeft: sizeWidth(5) }}

        >
            <View style={{
              width: 60, height: 60, borderRadius: 50,
              justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'
            }}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={{ width: 50, height: 50 }}
              />
            </View>
            <View style={{
              flexDirection: 'row', alignItems: "center", justifyContent: 'center'

            }}>
              <TouchableOpacity
                style={{ borderWidth: 1, backgroundColor: 'white', borderColor: 'white', borderRadius: 2, width: sizeWidth(27), height: sizeHeight(5), alignItems: 'center', justifyContent: 'center', marginLeft: sizeWidth(25) }}
                onPress={() => {
                  this.props.navigation.navigate('SignIn')
                }}
              >
                <Text style={{ color: '#4d7335', fontSize: 14, fontWeight: '500' }}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>}
        <Drawer.Section>
          {this.props.status === 3 ? <DrawerItem
            icon={({ color, size }) => (
              <Image
                source={require('../../assets/images/info.png')}
                style={{ width: 30, height: 30 }}
              />
            )}
            style={{ backgroundColor: '#fff', justifyContent: 'center' }}
            label={({ focused, color }) => <View><Text style={{ color: '#4d7335', fontSize: 16 }}>Danh sách CTV/ KH</Text></View>}
            onPress={() => { this.props.navigation.navigate('ctvdow') }}
          /> : null}

          <DrawerItem
            icon={({ color, size }) => (
              <Image
                source={require('../../assets/images/report.png')}
                style={{ width: 30, height: 30 }}
              />
            )}
            label={({ focused, color }) => <Text style={{ color: '#4d7335', fontSize: 16 }}>Chính sách</Text>}
            style={{ backgroundColor: '#fff', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.navigate('Chính sách') }}
          />
          {this.props.status == '' ? null : <DrawerItem
            icon={({ color, size }) => (
              <Image
                source={require('../../assets/images/new.png')}
                style={{ width: 30, height: 30 }}
              />
            )}

            label={({ focused, color }) => <Text style={{ color: '#4d7335', fontSize: 16 }}>Tin tức, sự kiện</Text>}
            style={{ backgroundColor: '#fff', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.navigate('Tin tức-sự kiện') }}
          />}
          <DrawerItem
            icon={({ color, size }) => (
              <Image
                source={require('../../assets/images/share1.png')}
                style={{ width: 30, height: 30 }}
              />
            )}
            label={({ focused, color }) => <Text style={{ color: '#4d7335', fontSize: 16 }}>Chia sẻ ứng dụng</Text>}
            style={{ backgroundColor: '#fff', justifyContent: 'center' }}
            onPress={() => this.shareApp()}

          />
          {this.props.status == '' ? null : <DrawerItem
            icon={({ color, size }) => (
              <Image
                source={require('../../assets/images/pw.png')}
                style={{ width: 30, height: 30 }}
              />
            )}
            label={({ focused, color }) => <Text style={{ color: '#4d7335', fontSize: 16 }}>Đổi mật khẩu</Text>}
            style={{ backgroundColor: '#fff', justifyContent: 'center' }}
            onPress={() => this.props.navigation.navigate("UpdateAccount")}

          />}
          <DrawerItem
            icon={({ color, size }) => (
              <Image
                source={require('../../assets/images/logo.png')}
                style={{ width: 30, height: 30 }}
              />
            )}
            label={({ focused, color }) => <Text style={{ color: '#4d7335', fontSize: 16 }}>Giới thiệu GD Shop</Text>}
            style={{ backgroundColor: '#fff', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.navigate('Giới thiệu') }}
          />
        </Drawer.Section>
        <View>
          {this.props.status === "" ? null : (
            <TouchableOpacity style={{ flexDirection: 'row', height: 100, alignItems: "center", justifyContent: 'center' }}
              onPress={() => {
                this.setState({ showAlertOption: true });
                this.show();
              }}
            >
              <Image
                source={require('../../assets/images/logout.png')}
                style={{ width: 27, height: 27, marginRight: 10 }}
              />
              <Text style={{ color: 'red', fontSize: 16 }}>Đăng xuất</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{ position: 'absolute', bottom: sizeHeight(10), width: sizeWidth(80) }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View>
              <TouchableOpacity
                onPress={() => Linking.openURL('https://www.facebook.com/GD-SHOP-109994943759427')}
              >
                <Image
                  source={require('../../assets/images/facebook.png')}
                  style={{ width: 45, height: 45 }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => Linking.openURL('https://www.facebook.com/groups/2405478959715184')}
              >
                <Image
                  source={require('../../assets/images/group.png')}
                  style={{ width: 45, height: 45 }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => Linking.openURL('https://gdshop.com.vn')}
              >
                <Image
                  source={require('../../assets/images/infomation.png')}
                  style={{ width: 45, height: 45 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>Phiên bản 1.1</Text>
        </View>
      </SafeAreaView>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    LogOut: (data) => dispatch(LogOut(data)),
    countNotify: (text) => dispatch(countNotify(text)),
    removeAllToCart: (text) => dispatch(removeAllToCart()),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    idshop: state.product.database,
  }
}
const styles = StyleSheet.create({
  bottomDrawerSection: {
    marginTop: 25,
    borderBottomColor: 'white',
  },
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerContent);
