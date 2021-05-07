import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Platform,
  TextInput,
  Animated,
  ScrollView
} from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
import styles from "./styles";
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../utils/helper/size.helper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { COLOR } from "../../../utils/color/colors";
import IconComponets from "../../../components/icon";
export default class HeaderHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleScreen = (text, title, type) => {
    const { navigation } = this.props;
    navigation.navigate(text, { TITLE: title, TYPE: type });
  };

  render() {
    const {
      navigation,
      search,
      see,
      handleSearch,
      loadingSearch,
      onBlurs,
      onFocuss,
      onChange,
      loadingSear,
      deleteSearch,
    } = this.props;
    return (
      <View>
        <StatusBar
          barStyle={"light-content"}
          backgroundColor={COLOR.HEADER}
          //translucent
        />
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: sizeWidth(1.5),
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            borderBottomColor: "#999",
            borderBottomWidth: 1,
          }}
        >
          <TouchableOpacity
            style={styles.touchView}
            onPress={(text) =>
              this.handleScreen("ComponentTrend", "Sản phẩm bán chạy", 2)
            }
          >
            <Image
              source={require("../../../assets/images/icon-bestsale_2.png")}
              style={{
                width: sizeWidth(10),
                height: sizeWidth(10),
              }}
            />
            <Text style={styles.textView}>Sản phẩm bán chạy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchView}
            onPress={(text) =>
              this.handleScreen("ComponentTrend", "Sản phẩm nổi bật", 1)
            }
          >
            <Image
              source={require("../../../assets/images/icon-feature_2.png")}
              //resizeMode=
              style={{
                width: sizeWidth(10),
                height: sizeWidth(10),
              }}
            />
            <Text style={[styles.textView]}>Sản phẩm nổi bật</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchView}
            onPress={(text) =>
              this.handleScreen("ComponentTrend", "Sản phẩm mới", 3)
            }
          >
            <Image
              source={require("../../../assets/images/icon-new_2.png")}
              style={{
                width: sizeWidth(10),
                height: sizeWidth(10),
              }}
            />
            <Text style={styles.textView}>Sản phẩm mới</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: sizeWidth(95),
            alignSelf: "center",
            marginTop: sizeHeight(1),
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
              borderRadius: 6,
              borderWidth: 1,
              borderColor: "#ddd",
              paddingHorizontal: sizeWidth(2),
            }}
          >
            <TextInput
              placeholder="Tìm kiếm"
              value={search}
              returnKeyType="search"
              onFocus={onFocuss}
              onBlur={() => onBlurs()}
              onChangeText={(text) => onChange(text)}
              returnKeyLabel="Search"
              onSubmitEditing={async () => {
                await loadingSear();
                await handleSearch();
              }}
              style={{
                width: sizeWidth(73),
                paddingVertical: sizeHeight(1.2),
              }}
            />
            <IconComponets
              onPress={() => deleteSearch()}
              name="times-circle"
              size={sizeFont(4)}
              color={see == false ? "#fff" : "#888"}
              soild
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("NameItems", {
                NAME: "Home",
              });
            }}
          >
            <Image
              source={require("../../../assets/images/filter-2.png")}
              style={{
                width: sizeWidth(10),
                height: sizeHeight(5),
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
