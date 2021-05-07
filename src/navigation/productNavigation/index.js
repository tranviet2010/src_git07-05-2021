import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, TextInput, Image, Easing } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { searchProduct } from "../../action/notifyAction";
import Product from "../../views/product";
import { isIphoneX } from 'react-native-iphone-x-helper';
import { COLOR } from "../../utils/color/colors";
import Polycitech from "../../views/account/profile/infor/policy/Policy";
import Listproduct from "../../views/product/listItem/Listcate";
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
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import ChildListItem from "../../views/product/childitem";
import { connect } from "react-redux";
import { View } from "native-base";
import DetailProducts from "../../views/product/listItem/details";
import DetailAddressCart from "../../views/carts/addresscart";
import ListCountries from "../../views/orders/collaborator/countries";
import ListDistrict from "../../components/district";
import ListDistrictChild from "../../components/districtChild";
import { Badge, Text } from "react-native-paper";
import SubChildItem from "../../views/product/subchilditem";
import NameItems from "../../views/product/nameitem";
import NewItem from "../../views/products/newitem";
import Policy from "../../views/menuleft/polyci/policyCar";


const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
  const { status, navigation, route, authUser, listItem, countNotify, searchProduct } = props;
  console.log({ props });
  const [value, setvalue] = useState('')
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

      }}
    >
      <HomeStack.Screen
        name="Product"
        component={Product}
        options={({ route }) => ({
          headerShown: false,
          title: "",
          headerStyle: {
            backgroundColor: COLOR.HEADER,

          },
          headerTitleStyle: {
            color: COLOR.HEADER,
          }
        })}
      />
      <HomeStack.Screen
        name="notiProduct"
        component={Notification}
        options={({ route }) => ({
          title: 'Thông báo',
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
          headerRight: () => (
            <HeaderRightComponet
              navigation={navigation}
              onPress={() => null}
              name="list"
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
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate("Product")}
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
                        NAME: "ChildListItem",
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
        name="Carts"
        component={Carts}
        options={({ route }) => ({
          headerTitleAlign: "center",
          title: "Giỏ hàng",
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
        name="chính sách"
        component={Policy}
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
              soild
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
                      navigation.navigate("Carts", {
                        NAME: "DetailProducts",
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
            )
          },
        })}
      />
      <HomeStack.Screen
        name="listproduct"
        component={Listproduct}
        options={({ route }) => ({
          title: "Tất cả sản phẩm",
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
              onPress={() => navigation.navigate("Product")}
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
                        NAME: "SubChildItem",
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
        name="Chính sách"
        component={Polycitech}
        options={{
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
        }}
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
      <HomeStack.Screen
        name="NewItem"
        component={NewItem}
        options={({ route }) => ({
          title: "Thêm sản phẩm mới",
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
              onPress={() => navigation.navigate("Product")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchProduct: (text) => dispatch(searchProduct(text))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyHomeStack);
