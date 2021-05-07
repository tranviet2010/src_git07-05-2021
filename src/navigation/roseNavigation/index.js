import * as React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { TouchableOpacity, StyleSheet, TextInput, Image, Easing, View, Platform } from "react-native";
import DetailOrder from "../../views/ordermain/detailorder";
import Rose from "../../views/rose/listItem/index";
import { COLOR } from "../../utils/color/colors";
import DetailRose from '../../views/rose/subchilditem/detailrose';
import {
  sizeFont,
  sizeWidth,
  sizeHeight,
} from "../../utils/helper/size.helper";
import Notification from "../../views/notification";
import Subchilditem from "../../views/rose/subchilditem";
import Info from "../../views/account/profile/update/index";
import getwithdawal from "../../views/rose/subchilditem/getwithdawal";
import Giaovat from '../../views/giaovat';
import addRead from '../../views/giaovat/add';
import editRead from '../../views/giaovat/edit';
import typeProduct from '../../views/giaovat/datafilter/type_product';
import typeInfo from '../../views/giaovat/datafilter/type_info';
import comment from '../../views/giaovat/comment/comment';
import EditCom from '../../views/giaovat/edit/editcom';
import DetailCom from '../../views/giaovat/comment/comment_detail';

import {
  HeaderLeftComponet,
  HeaderRightComponet,
} from "../../components/header";
import { connect } from "react-redux";
import { Badge, Text } from "react-native-paper";

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
        name="Rose"
        component={Giaovat}
        navigation={navigation}
        options={({ route }) => ({
          title: "",
          headerShown: false,
          headerStyle: {
            backgroundColor: COLOR.HEADER,
            height: Platform.OS == 'ios' ? sizeHeight(12) : sizeHeight(9),
            color: '#fff',
          },
          headerTitleAlign: "center",
          
          headerTitleStyle: {
            color: COLOR.HEADER,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>

            </TouchableOpacity>
          ),
        })}
      />

      <HomeStack.Screen
        name="addread"
        component={addRead}
        options={({ route }) => ({
          title: "Đăng bài",
          headerStyle: {
            backgroundColor: '#999999',
            height: Platform.OS === 'ios' ? sizeHeight(10) : sizeHeight(7),
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: '#fff',
            fontSize: 17
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Rose")}
            >
              <Image
                source={require('../../assets/images/daux.png')}
                style={{ width: 20, height: 20, marginLeft: 20 }}
              />
            </TouchableOpacity>
          ),
          headerTintColor: '#fff'
        })}
      />
      <HomeStack.Screen
        name="comment"
        component={comment}
        options={({ route }) => ({
          title: "Bình luận",
          headerStyle: {
            backgroundColor: '#d8d8d8',
            height: Platform.OS === 'ios' ? sizeHeight(10) : sizeHeight(7),

          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: '#000',
            fontSize: 17
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Rose")}
            >
              <Image
                source={require('../../assets/images/daux.png')}
                style={{ width: 20, height: 20, marginLeft: 20 }}
              />
            </TouchableOpacity>
          ),
          headerTintColor: '#fff'
        })}
      />
      <HomeStack.Screen
        name="detailcomment"
        component={DetailCom}
        options={({ route }) => ({
          title: "Trả lời",
          headerStyle: {
            backgroundColor: '#d8d8d8',
            height: Platform.OS === 'ios' ? sizeHeight(10) : sizeHeight(7),

          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: '#000',
            fontSize: 17
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => { navigation.navigate("comment"), route.params.reload() }}
            >
              <Image
                source={require('../../assets/images/daux.png')}
                style={{ width: 20, height: 20, marginLeft: 20 }}
              />
            </TouchableOpacity>
          ),
          headerTintColor: '#fff'
        })}
      />
      <HomeStack.Screen
        name="editcom"
        component={EditCom}
        options={({ route }) => ({
          title: "Chỉnh sửa",
          headerStyle: {
            backgroundColor: '#d8d8d8',
            height: Platform.OS === 'ios' ? sizeHeight(10) : sizeHeight(7),

          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: '#000',
            fontSize: 17
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("comment")}
            >
              <Image
                source={require('../../assets/images/daux.png')}
                style={{ width: 20, height: 20, marginLeft: 20 }}
              />
            </TouchableOpacity>
          ),
          headerTintColor: '#fff'
        })}
      />
      <HomeStack.Screen
        name="editread"
        component={editRead}
        options={({ route }) => ({
          title: "Chỉnh sửa",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
            height: Platform.OS === 'ios' ? sizeHeight(10) : sizeHeight(7),
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: '#fff',
          },
          headerTintColor: '#fff'
        })}
      />
      <HomeStack.Screen
        name="typeProduct"
        component={typeProduct}
        options={({ route }) => ({
          title: "Chọn hàng hoá",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
            height: Platform.OS === 'ios' ? sizeHeight(10) : sizeHeight(7),
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: '#fff',
          },
          headerTintColor: '#fff'
        })}
      />
      <HomeStack.Screen
        name="typeinfo"
        component={typeInfo}
        options={({ route }) => ({
          title: "Chọn loại tin",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
            height: Platform.OS === 'ios' ? sizeHeight(10) : sizeHeight(7),
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: '#fff',
          },
          headerTintColor: '#fff'
        })}
      />

      <HomeStack.Screen
        name="DetailOrder"
        component={DetailOrder}
        options={({ route }) => ({
          title: "Chi tiết đơn hàng",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
            height: Platform.OS === 'ios' ? sizeHeight(10) : sizeHeight(7),
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: '#fff',
          },
          headerTintColor: '#fff'
        })}
      />

      <HomeStack.Screen
        name="Thông báo"
        component={Notification}
        options={{
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
              onPress={() => navigation.navigate("Rose")}
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
        }}
      />
      <HomeStack.Screen
        name="Chi tiết hoa hồng theo CTV"
        component={Subchilditem}
        options={{
          headerStyle: {
            backgroundColor: COLOR.HEADER
          },
          headerTintColor: '#fff',
        }}
      />
      <HomeStack.Screen
        name="detailrose"
        component={DetailRose}
        options={{
          title: "Yêu cầu thanh toán hoa hồng",
          headerStyle: {
            backgroundColor: COLOR.HEADER
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate("Rose")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="Yêu cầu thanh toán"
        component={getwithdawal}
        options={{
          headerStyle: {
            backgroundColor: COLOR.HEADER
          },
          headerTintColor: '#fff',
        }}
      />
    </HomeStack.Navigator>
  )

};

const styles = StyleSheet.create({
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
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyHomeStack);
