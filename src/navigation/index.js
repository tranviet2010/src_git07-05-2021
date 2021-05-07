import React, { useState, useEffect } from "react";
import { Easing } from "react-native";
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import {
  Image
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from "react-native-vector-icons/FontAwesome5";
import MyHomeStack from "./homeNavigation";
import OrderStack from "./orderNavigation";
import MyProductStack from "./productNavigation";
import { connect } from "react-redux";
import RoseNavigation from '../navigation/roseNavigation'
import DrawerContent from '../navigation/homeNavigation/DrawerContent'
import StartNavigation from './startNavigation';
import Signin from '../views/account/register/signin/index'
import SignUp from '../views/account/register/signup/index'
import { _retrieveData } from '../utils/asynStorage'
import { TOKEN } from '../utils/asynStorage/store'
import SplashScreen from "../views/splashScreen";
import { sizeHeight, sizeFont, sizeWidth } from "../utils/helper/size.helper";
import { isIphoneX } from 'react-native-iphone-x-helper';
import StartOne from '../views/account/register/start/startOne';
import StartTwo from '../views/account/register/start/startTwo';
import Accout from '../views/account';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

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
const AppStack = (props) => {

  return (
    <Tab.Navigator
      // initialRouteName="account"
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name == "Home") {
            const image = focused
              ? require('../assets/images/homeactive.png')
              : require('../assets/images/home.png')
            return (
              <Image
                source={image}
                style={{ width: 25, height: 25 }}
              />
            );
          } else if (route.name == "order") {
            const image = focused
              ? require('../assets/images/orderactive.png')
              : require('../assets/images/order.png')
            return (
              <Image
                source={image}
                style={{ width: 25, height: 25 }}
              />
            );
          }
          else if (route.name == "product"){
            const image = focused
              ? require('../assets/images/product1active.png')
              : require('../assets/images/product1.png')
            return (
              <Image
                source={image}
                style={{ width: 25, height: 25 }}
              />
            );

          }else if (route.name == "rose"){
            const image = focused
              ? require('../assets/images/roseactive.png')
              : require('../assets/images/rose.png')
            return (
              <Image
                source={image}
                style={{ width: 25, height: 25 }}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: "#4d7335",
        inactiveTintColor: "#969696",
        tabStyle: {
          paddingTop: 10,
          backgroundColor: "#fff",
        },
        labelStyle: {
          flex: 1,
          fontSize: isIphoneX() ? sizeFont(3) : sizeFont(3),
        },
        labelPosition: "below-icon",
        style: {
          height: isIphoneX() ? sizeHeight(12) : sizeHeight(8),
        }
      }}
    >
      <Stack.Screen
        name="Home"
        component={MyHomeStack}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="product"
        component={MyProductStack}
        options={{ title: "Đi chợ" }}
      />
       <Stack.Screen
        name="order"
        component={OrderStack}
        options={{ title: "Đơn hàng" }}
      />
      <Stack.Screen
        name="rose"
        component={RoseNavigation}
        options={{ title: "Rao vặt"}}
      />
    </Tab.Navigator>
  )
}
const DrawerNavigator = (props) => {
  // const { CODE } = props.route.params;
  // console.log("see code",CODE);
  return (
  <Drawer.Navigator
    initialRouteName="home"
    drawerContent={props => <DrawerContent {...props} />}
    drawerStyle={{
      width: sizeWidth(80),
    }}

  >
    <Drawer.Screen
      title='Home'
      component={AppStack}
      name="home"
    />
  </Drawer.Navigator>
)}
function AppNavigation(props) {
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: false,
          headerShown: false,
          transitionSpec: {
            open: configNavigation,
            close: configNavigation,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Tab.Screen name="SplashScreen" component={SplashScreen} />
        <Tab.Screen name="screenHome" component={DrawerNavigator} />
        <Tab.Screen name="SignIn" component={Signin} />
        <Tab.Screen name="SignUp" component={SignUp} />
        <Tab.Screen name="dicho" component={MyProductStack} />
        <Tab.Screen name="Account" component={Accout} />
        <Tab.Screen name="StartTwo" component={StartTwo} />
        <Tab.Screen name="MyProductStack" component={MyProductStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNavigation);
