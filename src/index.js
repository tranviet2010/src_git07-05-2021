import React, { Component } from "react";
import { View, Image, Text, SafeAreaView, Alert } from "react-native";
import AppNavigation from "./navigation";
import { Provider, connect } from "react-redux";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Root } from "native-base";
import { store, persistor } from "./store";
import { NavigationContainer } from "@react-navigation/native";
import { YellowBox } from "react-native";
import { _storeData } from "./utils/asynStorage";
import { MenuProvider } from "react-native-popup-menu";
// import codePush from "react-native-code-push";
import SplashScreen from "react-native-splash-screen";
import { sizeWidth, sizeHeight, sizeFont } from "./utils/helper/size.helper";
import { COLOR } from "./utils/color/colors";
import { Platform } from "react-native";
import OneSignal from 'react-native-onesignal';
import { getUserAgent, getDeviceType, getUniqueId, getVersion, getDeviceName } from "react-native-device-info";
import { PUSH_TOKEN } from './utils/asynStorage/store';
import { getDevice } from './service/device';


var totalPercen = 0;


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
      timeout: 0,
      syncMessage: "",
      loading: false,
      isSubscribed: '',
      tolal: 1,
      recived: 0,
      idDeviced: '',
    };
  }
  async confixOne() {
    OneSignal.setAppId("1c9dfa77-62b5-4045-a255-2f6086c7eda4");
    OneSignal.setLogLevel(6, 0);
    OneSignal.setRequiresUserPrivacyConsent(false);
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
      this.OSLog("Prompt response:", response);
    });
    /* O N E S I G N A L  H A N D L E R S */
    OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
      this.OSLog("OneSignal: notification will show in foreground:", notifReceivedEvent);
      let notif = notifReceivedEvent.getNotification();
      const button1 = {
        text: "Cancel",
        onPress: () => { notifReceivedEvent.complete(); },
        style: "cancel"
      };
      const button2 = { text: "Complete", onPress: () => { notifReceivedEvent.complete(notif); } };

      // Alert.alert("Complete notification?", "Test", [button1, button2], { cancelable: true });
    });
    OneSignal.setNotificationOpenedHandler(notification => {
      this.OSLog("OneSignal: notification opened:", notification);
    });
    OneSignal.setInAppMessageClickHandler(event => {
      this.OSLog("OneSignal IAM clicked:", event);
    });
    OneSignal.addEmailSubscriptionObserver((event) => {
      this.OSLog("OneSignal: email subscription changed: ", event);
    });
    OneSignal.addSubscriptionObserver(event => {
      this.OSLog("OneSignal: subscription changed:", event);
      this.setState({ isSubscribed: event.to.isSubscribed })
    });
    OneSignal.addPermissionObserver(event => {
      this.OSLog("OneSignal: permission changed:", event);
    });

    const deviceState = await OneSignal.getDeviceState();
    this.setState({
      isSubscribed: deviceState.isSubscribed,

    });
  }
  // getDevice = () => {
  //   getDevice({
  //     USERNAME: username,
  //     APP_VERSION: getVersion(),
  //     MODEL_NAME: nameDevice,
  //     TOKEN_KEY: 'fXZEodQWSNGARv5Q92LRLp:APA91bGB4txqzgYj75ATX3e8mZcmsFVWEPv8O4_HFH3Wi1-Ud6Nn2KAOPccON9oRTUEW1aZ52ytMWVoAkCB8c6VzwTX4C7rDIo42gvNyEuwP4qh_46-u3A6003sc2QzK0e5BYqgJ9gtt',
  //     DEVICE_TYPE: Platform.OS,
  //     OS_VERSION: getVersion(),
  //     UUID: getUniqueId(),
  //     IDSHOP: 'F6LKFY'
  //   }).then((res) => {
  //     console.log("updatedata", res);
  //   })
  // }
  componentDidMount() {
    this.confixOne();
    SplashScreen.hide();
   
  }
  OSLog = (message, optionalArg) => {

    if (optionalArg) {
      message = message + JSON.stringify(optionalArg);
    }

    console.log(message.notificationId);

    let consoleValue;

    if (this.state.consoleValue) {
      consoleValue = this.state.consoleValue + "\n" + message
    } else {
      consoleValue = message;
    }
    this.setState({ consoleValue });
  }
  onError = (error) => {
    console.log("An error occurred. " + error);
  };
  render() {
    return this.state.loading == true ? (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          marginTop: sizeHeight(25),
        }}
      >
        <Image
          source={require("./assets/images/logo.png")}
          resizeMode="contain"
          style={{
            width: Platform.OS === "android" ? sizeWidth(55) : sizeWidth(60),
            height: sizeHeight(15),
            //marginBottom: sizeHeight(2),
          }}
        />
        <Text
          style={{
            textAlign: "center",
            color: "#000",
            fontSize: sizeFont(4),
            marginBottom: sizeHeight(1),
          }}
        >
          Cập nhật phiên bản mới !{" "}
        </Text>
      </View>
    ) : (
        <Root>
          <SafeAreaProvider>
            {/* <SafeAreaView> */}
            <Provider store={store}>

              <AppNavigation />

            </Provider>
            {/* </SafeAreaView> */}
          </SafeAreaProvider>
        </Root>
      );
  }
}
