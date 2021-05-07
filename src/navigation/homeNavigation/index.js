import React, { useState, useEffect } from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { TouchableOpacity, StyleSheet, TextInput, Image, Easing, Linking, Platform } from "react-native";
import Home from "../../views/home";
import { COLOR } from "../../utils/color/colors";

import {
  sizeFont,
  sizeWidth,
  sizeHeight,
} from "../../utils/helper/size.helper";
import Notification from "../../views/notification";
import {
  HeaderLeftComponet,
  HeaderRightComponet,
  HeaderRightTool,
} from "../../components/header";
import Carts from "../../views/carts";
import ChildListItem from "../../views/home/childitem";
import { connect } from "react-redux";
import { View } from "native-base";
import DetailProducts from "../../views/home/listItem/details";
import DetailOrder from "../../views/ordermain/detailorder";
import DetailAddressCart from "../../views/carts/addresscart";
import ListCountries from "../../views/orders/collaborator/countries";
import ListDistrict from "../../components/district";
import ListDistrictChild from "../../components/districtChild";
import bank from "../../components/bank";
import { Badge, Text } from "react-native-paper";
import SubChildItem from "../../views/home/subchilditem";
import ComponentTrend from "../../views/products/trend";
import NameItems from "../../views/home/nameitem";
import InfoCTV from "../../views/menuleft/infoctv";
// import Info from "../../views/menuleft/infoctv/usechildren";
import Info from "../../views/account/profile/update/index";
import EducateCTV from "../../views/account/profile/infor/traning";
import IntroduceCTV from "../../views/account/profile/infor/introduction/Introduction";
import NewCTV from "../../views/account/profile/infor/news/News";
import Polycitech from "../../views/account/profile/infor/policy/Policy";
import TitleTraning from "../../views/account/profile/infor/traning/TitleTraning";
import DetailPolicy from "../../views/account/profile/infor/policy/DetailPolicy";
import Product from "../productNavigation";
import CtvDetail from "../../views/menuleft/infoctv/cvtdetail";
import { searchHome } from "../../action/notifyAction";
import Report from "../../views/menuleft/reportctv/index";
import Reportall from "../../views/menuleft/reportctv/reportShop/reportAll";
import ReportTime from "../../views/menuleft/reportctv/reportShop/reportTime";
import ReportCTV from "../../views/menuleft/reportctv/reportShop/reportCTV";
import ReportProduct from "../../views/menuleft/reportctv/reportShop/reportProduct";
import DetailNew from "../../views/account/profile/infor/news/DetailNews";
import Subchilditem from "../../views/rose/subchilditem";
import FullItem from "../../views/home/listItem/FullItem";
import { isIphoneX } from 'react-native-iphone-x-helper';
import ReportDay from "../../views/menuleft/reportctv/reportShop/ReportDay";
import SetupAccout from "../../views/menuleft/infoctv/setupaccout";
import Editctv from "../../views/menuleft/infoctv/EditCtv";
import UpdateAccount from "../../views/account/profile/updateadmin";
import ChangePass from "../../views/account/password/changePass";
import {getShopInfo} from "../../service/products";

const HomeStack = createStackNavigator();

const configNavigation = {
  // animation: "spring",
  // config: {
  //   stiffness: 1000,
  //   damping: 500,
  //   mass: 7,
  //   overshootClamping: true,
  //   restDisplacementThreshold: 0.01,
  //   restSpeedThreshold: 0.01,
  // },
  animation: "timing",
  config: {
    duration: 300,
    easing: Easing.bezier(0, 0.25, 0.5, 0.75, 1),
  }
}

MyHomeStack = (props) => {
  const { status, navigation, route, authUser, listItem, countNotify } = props;
  console.log({ listItem });
  const [value, setvalue] = useState('');
  var confixData = () => {
    getShopInfo({
      IDSHOP: 'F6LKFY',
      USERNAME: '',
    }).then((res) => {
      if (res.data.ERROR == "0000") {
        setvalue(res.data)
      }

      else {

      }
    })
      .catch((err) => {
      });
  }
  useEffect(() => {
    confixData();
  }, [])
  console.log("value=====", value)
  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }
  return (
    <HomeStack.Navigator
      screenOptions={{
        transitionSpec: {
          open: configNavigation,
          close: configNavigation,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        cardStyle: { backgroundColor: '#fff' }
      }}
    >
      <HomeStack.Screen
        name="HomePay"
        component={Home}
        options={({ route }) => ({
          title: "",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
            height: Platform.OS == "ios" ? sizeHeight(12) : sizeHeight(9),
          },
          headerTitleStyle: {
            color: COLOR.HEADER,
          },
          headerTitle: () => {
            return (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: sizeFont(5), marginRight: sizeWidth(15), fontWeight: 'bold' }}>{value.SHOP_NAME}</Text>
              </View>
            )
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={require('../../assets/images/list.png')}
                style={{
                  width: 28,
                  height: 28,
                  marginLeft: sizeWidth(3.5)
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => {
            return (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: sizeWidth(32), marginRight: 10 }}>
                <TouchableOpacity
                  onPress={() => Linking.openURL(`tel:${value.MOBILE}`)}
                >
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      source={require("../../assets/images/call.png")}
                      style={{ width: 27, height: 27, justifyContent: 'center', alignItems: 'center', marginLeft: sizeWidth(1) }}
                    />
                  </View>
                </TouchableOpacity >
                <TouchableOpacity
                  onPress={() => Linking.openURL(`http://m.me/${value.FB_PAGE}`)}
                >
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      source={require("../../assets/images/mess.png")}
                      style={{ width: 27, height: 27, justifyContent: 'center', alignItems: 'center', marginLeft: sizeWidth(1) }}
                    />
                  </View>
                </TouchableOpacity >

                <TouchableOpacity
                  navigation={navigation}
                  onPress={() => navigation.navigate("Info", {
                    NAME: "HomePay",
                  })}

                >
                  <Image
                    source={require('../../assets/images/ring.png')}
                    style={{ width: 30, height: 30 }}
                  />
                  {countNotify == 0 ? null : <View style={styles.viewList}>
                    {countNotify < 100 ? <Text
                      style={{
                        color: "#fff",
                        textAlign: "center",
                        fontSize: sizeFont(3),
                      }}
                    >
                      {countNotify}
                    </Text> : <Text style={{
                      fontSize: sizeFont(2), color: "#fff",
                    }}>99+</Text>}
                  </View>}
                </TouchableOpacity>

                <TouchableOpacity

                >
                  {authUser.GROUPS != 3 ? <TouchableOpacity
                    navigation={navigation}
                    onPress={() =>
                      navigation.navigate("CartHome", {
                        NAME: "HomePay",
                      })
                    }
                  >
                    <Image
                      source={require('../../assets/images/cart1.png')}
                      style={{ width: 30, height: 30 }}
                    />
                  </TouchableOpacity> : null}
                  {listItem.length != 0 ? (
                    <View style={styles.viewList}>
                      <Text
                        style={{
                          color: "#fff",
                          textAlign: "center",
                          fontSize: sizeFont(3),
                        }}
                      >
                        {listItem.length}
                      </Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              </View>
            );
          },
        })}
      />
      <HomeStack.Screen
        name="Info"
        component={Notification}
        options={({ route }) => ({
          title: 'Thông báo',
          headerTitleAlign: "center",
          headerBackTitle: null,
          headerStyle: {
            height: Platform.OS == "ios" ? sizeHeight(12) : sizeHeight(9),
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate(route.params.NAME)}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => (
            <HeaderRightComponet
              navigation={navigation}
              onPress={() => route.params.allNoti()}
              name="list"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        })}
      />
      <HomeStack.Screen
        name="ComponentTrend"
        component={ComponentTrend}
        options={({ route }) => ({
          headerTitleAlign: "center",
          title: route.params.TITLE,
          headerBackTitle: null,
          headerStyle: {
            height: Platform.OS == "ios" ? sizeHeight(12) : sizeHeight(9),
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },

          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate("Home")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        })}
      />

      <HomeStack.Screen
        name="ChildListItem"
        component={ChildListItem}
        options={({ route }) => ({
          title: route.params.name,
          headerTitleAlign: "center",
          headerBackTitle: null,
          headerStyle: {
            height: Platform.OS == "ios" ? sizeHeight(12) : sizeHeight(9),
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate("Home")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        })}
      />
      <HomeStack.Screen
        name="FullItem"
        component={FullItem}
        options={({ route }) => ({
          title: route.params.name,
          headerTitleAlign: "center",
          headerBackTitle: null,
          headerStyle: {
            height: Platform.OS == "ios" ? sizeHeight(12) : sizeHeight(9),
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate("HomePay")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => {
            return (
              <View>
                <TouchableOpacity
                  style={{ marginRight: sizeWidth(3) }}
                >
                  {authUser.GROUPS != 3 ? <TouchableOpacity
                    navigation={navigation}
                    onPress={() =>
                      navigation.navigate("CartHome", {
                        NAME: "FullItem",
                      })
                    }
                    name="shopping-cart"
                    size={sizeFont(6)}
                    color="#fff"
                  >
                    <Image
                      source={require('../../assets/images/cart1.png')}
                      style={{ width: 30, height: 30 }}
                    />
                  </TouchableOpacity> : null}
                  {listItem.length != 0 ? (
                    <View style={styles.viewList}>
                      <Text
                        style={{
                          color: "#fff",
                          textAlign: "center",
                          fontSize: sizeFont(3),
                        }}
                      >
                        {listItem.length}
                      </Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              </View>
            )
          },
        })}
      />
      <HomeStack.Screen
        name="DetailOrder"
        component={DetailOrder}
        options={({ route }) => ({
          title: "Chi tiết đơn hàng",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
            height: sizeHeight(10),
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: 'white',
          },
          headerTintColor: '#fff'
        })}
      />
      <HomeStack.Screen
        name="CartHome"
        component={Carts}
        options={({ route }) => ({
          headerTitleAlign: "center",
          title: "Giỏ hàng",
          headerBackTitle: null,
          headerStyle: {
            height: Platform.OS == "ios" ? sizeHeight(12) : sizeHeight(9),
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate('HomePay')}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => (
            <HeaderRightComponet
              navigation={navigation}
              onPress={() => route.params.onDelete()}
              name="trash-alt"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        })}
      />
      <HomeStack.Screen
        name="DetailAddressCart"
        component={DetailAddressCart}
        options={({ route }) => ({
          title: "Tạo đơn hàng",
          headerTitleAlign: "center",
          headerBackTitle: null,
          headerStyle: {
            height: Platform.OS == "ios" ? sizeHeight(12) : sizeHeight(9),
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },

          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate('CartHome')}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        })}
      />
      <HomeStack.Screen
        name="Chính sách"
        component={Polycitech}
        options={{
          headerStyle: {
            height: Platform.OS == "ios" ? sizeHeight(12) : sizeHeight(9),
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate('HomePay')}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="report"
        component={Report}
        options={{
          title: 'Báo cáo',
          headerStyle: {
            height: Platform.OS == "ios" ? sizeHeight(12) : sizeHeight(9),
            backgroundColor: COLOR.HEADER,
          },
          headerTitleAlign: "center",
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate('HomePay')}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="detailrose"
        component={Subchilditem}
        options={{
          title: 'Chi tiết hoa hồng theo CTV',
          headerStyle: {
            height: Platform.OS == "ios" ? sizeHeight(12) : sizeHeight(9),
            backgroundColor: COLOR.HEADER
          },
          headerTintColor: '#fff',
        }}
      />
      <HomeStack.Screen
        name="setupaccout"
        component={SetupAccout}
        options={{
          title: 'Chỉnh sửa thông tin CTV/ KH',
          headerStyle: {
            height: Platform.OS == "ios" ? sizeHeight(12) : sizeHeight(9),
            backgroundColor: COLOR.HEADER
          },
          headerTintColor: '#fff',
        }}
      />
      <HomeStack.Screen
        name="reportall"
        component={Reportall}
        options={{
          title: 'Báo cáo chung',
          headerStyle: {
            height: Platform.OS == "ios" ? sizeHeight(12) : sizeHeight(9),
            backgroundColor: COLOR.HEADER,
          },
          headerTitleAlign: "center",
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate('HomePay')}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="editctv"
        component={Editctv}
        options={{
          title: 'Cập nhật thông tin CTV/KH',
          headerStyle: {
            height: Platform.OS == "ios" ? sizeHeight(12) : sizeHeight(9),
            backgroundColor: COLOR.HEADER,
          },
          headerTitleAlign: "center",
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate('HomePay')}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="reportTime"
        component={ReportTime}
        options={{
          title: 'Báo cáo theo mặt hàng',
          headerStyle: {
            height: Platform.OS == "ios" ? sizeHeight(12) : sizeHeight(9),
            backgroundColor: COLOR.HEADER,
          },
          headerTitleAlign: "center",
          headerTintColor: '#fff',
        }}
      />
      <HomeStack.Screen
        name="reportProduct"
        component={ReportProduct}
        options={{
          title: 'Báo cáo biến động',
          headerStyle: {
            height: Platform.OS == "ios" ? sizeHeight(12) : sizeHeight(9),
            backgroundColor: COLOR.HEADER,
          },
          headerTitleAlign: "center",
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate('HomePay')}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="Thông tin CTV"
        component={Info}
        options={{
          title: 'Thông tin khách hàng',
          headerStyle: {
            height: Platform.OS == "ios" ? sizeHeight(12) : sizeHeight(9),
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate('HomePay')}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}

      />
      <HomeStack.Screen
        name="ctvdow"
        component={InfoCTV}
        options={{
          title: authUser.GROUPS == 3 ? 'Danh sách CTV/ KH' : 'Danh sách CTV ',
          headerStyle: {
            height: Platform.OS == "ios" ? sizeHeight(12) : sizeHeight(9),
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
        }}

      />
      <HomeStack.Screen
        name="Đào tạo"
        component={EducateCTV}
        options={{
          headerStyle: {
            height: Platform.OS == "ios" ? sizeHeight(12) : sizeHeight(9),
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate('HomePay')}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}

      />
      <HomeStack.Screen
        name="Chi tiết chính sách"
        component={DetailPolicy}
        options={{
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate('Chính sách')}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="Chi tiết đào tạo"
        component={TitleTraning}
        options={{
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
        }}
      />
      <HomeStack.Screen
        name="Tin tức-sự kiện"
        component={NewCTV}
        options={{
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate('HomePay')}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}

      />
      <HomeStack.Screen
        name="detailNew"
        component={DetailNew}
        options={{
          title: 'Chi tiết',
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
        }}

      />

      <HomeStack.Screen
        name="reportCTV"
        component={ReportCTV}
        options={{
          title: 'Báo cáo theo CTV',
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
        }}

      />
      <HomeStack.Screen
        name="reportday"
        component={ReportDay}
        options={{
          title: 'Báo cáo chung',
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
        }}

      />

      <HomeStack.Screen
        name="Product"
        component={Product}
        options={{
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
        }}
      />
      <HomeStack.Screen
        name="Giới thiệu"
        component={IntroduceCTV}
        options={{
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate('HomePay')}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="Listbank"
        component={bank}
        options={({ route }) => ({
          title: "Chọn Ngân Hàng",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate(route.params.NAME)}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => null,
        })}
      />
      <HomeStack.Screen
        name="Detail container"
        component={CtvDetail}
        options={{
          title: "Chi tiết CTV/ KH",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
        }}
      />

      <HomeStack.Screen
        name="DetailProducts"
        component={DetailProducts}
        options={({ route }) => ({
          title: "Chi tiết sản phẩm",
          headerTitleAlign: "center",
          headerBackTitle: null,
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
          headerRight: () => {
            return (
              <View>
                <TouchableOpacity
                  style={{ marginRight: sizeWidth(3) }}
                >
                  {authUser.GROUPS != 3 ? <TouchableOpacity
                    navigation={navigation}
                    onPress={() =>
                      navigation.navigate("CartHome", {
                        NAME: "DetailProducts",
                      })
                    }
                    name="shopping-cart"
                    size={sizeFont(6)}
                    color="#fff"
                  >
                    <Image
                      source={require('../../assets/images/cart1.png')}
                      style={{ width: 30, height: 30 }}
                    />
                  </TouchableOpacity> : null}
                  {listItem.length != 0 ? (
                    <View style={styles.viewList}>
                      <Text
                        style={{
                          color: "#fff",
                          textAlign: "center",
                          fontSize: sizeFont(3),
                        }}
                      >
                        {listItem.length}
                      </Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              </View>
            )
          },
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate('HomePay')}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        })}
      />

      <HomeStack.Screen
        name="ListCountries"
        component={ListCountries}
        options={({ route }) => ({
          title: "Chọn Tỉnh/Thành phố",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate(route.params.NAME)}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => null,
        })}
      />
      <HomeStack.Screen
        name="UpdateAccount"
        component={ChangePass}
        options={{
          title: 'Đổi mật khẩu',
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate('HomePay')}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="ListDistrict"
        component={ListDistrict}
        options={({ route }) => ({
          title: "Chọn Quận/Huyện",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate(route.params.NAME)}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => null,
        })}
      />
      <HomeStack.Screen
        name="ListDistrictChild"
        component={ListDistrictChild}
        options={({ route }) => ({
          title: "Chọn Phường/Xã",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate(route.params.NAME)}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => null,
        })}
      />
      <HomeStack.Screen
        name="SubChildItem"
        component={SubChildItem}
        options={({ route }) => ({
          title: route.params.name,
          headerTitleAlign: "center",
          headerBackTitle: null,
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },

          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate(route.params.NAME)}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        })}
      />

      <HomeStack.Screen
        name="NameItems"
        component={NameItems}
        options={({ route }) => ({
          title: "Danh mục sản phẩm",
          headerTitleAlign: "center",
          headerBackTitle: null,
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },

          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate(route.params.NAME)}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () =>
            authUser.GROUPS === "3" ? (
              <HeaderRightComponet
                navigation={navigation}
                onPress={() => route.params.showModal()}
                name="plus"
                size={sizeFont(5)}
                color="#fff"
                style={styles.touchPlus}
              />
            ) : null,
        })}
      />

    </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  touchPlus: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: sizeFont(4),
    width: sizeFont(8),
    height: sizeFont(8),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: sizeWidth(4),
  },
  viewList: {
    width: sizeWidth(5),
    height: sizeWidth(5),
    backgroundColor: "red",
    color: "#fff",
    borderRadius: sizeWidth(2.5),
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: sizeHeight(-1),
    right: sizeWidth(-1),
  },
});

const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    listItem: state.order.listItem,
    countNotify: state.notify.countNotify,
    idshop: state.product.database,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchHome: (text) => dispatch(searchHome(text))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyHomeStack);
