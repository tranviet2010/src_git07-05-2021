import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import PropTypes from "prop-types";
import IconComponets from "../icon";
import {
  sizeWidth,
  sizeFont,
  sizeHeight,
} from "../../utils/helper/size.helper";

import Menu, {
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { isIphoneX } from "react-native-iphone-x-helper";
import { COLOR } from "../../utils/color/colors";
import { Image } from "react-native";

export class HeaderLeftComponet extends Component {
  render() {
    const { navigation, onPress, name, size, color } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          marginLeft: sizeWidth(1),
          paddingHorizontal: sizeWidth(2),
          flexDirection: "row",
        }}
      >
        <Image source={require('../../assets/images/leftname1.png')} style={{width:20,height:20}}/>
      </TouchableOpacity>
    );
  }
}

HeaderLeftComponet.propTypes = {
  onPress: PropTypes.func,
  navigation: PropTypes.object,
};
export class HeaderRightComponet extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    const { navigation, onPress, name, size, color, style } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          {
            marginRight: sizeWidth(2.5),
            paddingHorizontal: sizeWidth(2),
          },
          style,
        ]}
      >
        <IconComponets name={name} size={size} color={color} light />
      </TouchableOpacity>
    );
  }
}
const ToolComponents = (props) => {
  const { onPress, onCloses } = props;
  //alert(onPress);
  console.log("///", onCloses);

  return (
    <View>
      <TouchableOpacity
        style={stylesTool.viewComponet}
        onPress={() => {
          onPress();
          //onClose.toggleTooltip();
        }}
      >
        <IconComponets
          name={"plus-circle"}
          size={sizeFont(7)}
          color={"#fff"}
          light
        />
        <Text style={stylesTool.textTool}>Thêm mới</Text>
      </TouchableOpacity>
      <TouchableOpacity style={stylesTool.viewComponet}>
        <IconComponets
          name={"retweet"}
          size={sizeFont(6)}
          color={"#fff"}
          soild
        />
        <Text style={stylesTool.textTool}>Đồng bộ kho</Text>
      </TouchableOpacity>
      <TouchableOpacity style={stylesTool.viewComponet}>
        <IconComponets
          name={"ellipsis-h"}
          size={sizeFont(7)}
          color={"#fff"}
          soild
        />
        <Text style={stylesTool.textTool}>Thuộc tính SP</Text>
      </TouchableOpacity>
    </View>
  );
};
export class HeaderRightTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.refs.tool;
  }
  componentDidMount() {
    console.log("okokokoko", this.props);
  }
  render() {
    const {
      navigation,
      onPress,
      name,
      size,
      color,
      style,
      onPressOne,
      onPressTwo,
      onPressThree,
    } = this.props;
    return (
      <Menu ref={(ref) => (this.tool = ref)}>
        <MenuTrigger
          customStyles={{
            triggerWrapper: {
              paddingHorizontal: sizeWidth(5),
            },
          }}
          children={
            <IconComponets name={name} size={size} color={color} light />
          }
        />
        <MenuOptions
          customStyles={{
            optionsContainer: {
              width: sizeWidth(50),
              height: isIphoneX()
                ? sizeHeight(20)
                : Platform.OS == "ios"
                ? sizeHeight(22)
                : sizeHeight(24),
              backgroundColor: "#444",
              opacity: 0.8,
              paddingHorizontal: sizeWidth(2),
              paddingVertical: sizeWidth(2),
            },
          }}
        >
          <MenuOption
            onSelect={() => onPressOne()}
            children={
              <View style={stylesTool.viewComponet}>
                <IconComponets
                  name={"plus-circle"}
                  size={sizeFont(7)}
                  color={"#fff"}
                  light
                />
                <Text style={stylesTool.textTool}>Thêm mới</Text>
              </View>
            }
          />
          <MenuOption
            onSelect={() => onPressTwo()}
            children={
              <View style={stylesTool.viewComponet}>
                <IconComponets
                  name={"retweet"}
                  size={sizeFont(6)}
                  color={"#fff"}
                  soild
                />
                <Text style={stylesTool.textTool}>Đồng bộ kho</Text>
              </View>
            }
          />
          <MenuOption
            onSelect={() => onPressThree()}
            children={
              <View style={stylesTool.viewComponet}>
                <IconComponets
                  name={"ellipsis-h"}
                  size={sizeFont(7)}
                  color={"#fff"}
                  soild
                />
                <Text style={stylesTool.textTool}>Thuộc tính SP</Text>
              </View>
            }
          />
        </MenuOptions>
      </Menu>
    );
  }
}

export class ButtonShowStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.refs.tool;
  }
  componentDidMount() {
    console.log("okokokoko", this.props);
  }
  render() {
    const {
      navigation,
      onPress,
      name,
      size,
      color,
      style,
      onPressOne,
    } = this.props;
    return (
      <Menu ref={(ref) => (this.tool = ref)}>
        <MenuTrigger
          customStyles={{
            triggerWrapper: {
              paddingHorizontal: sizeWidth(5),
            },
          }}
          children={
            <IconComponets name={name} size={size} color={color} light />
          }
        />
        <MenuOptions
          customStyles={{
            optionsContainer: {
              width: sizeWidth(50),
              height: isIphoneX()
                ? sizeHeight(20)
                : Platform.OS == "ios"
                ? sizeHeight(22)
                : sizeHeight(24),
              backgroundColor: "#444",
              opacity: 0.8,
              paddingHorizontal: sizeWidth(2),
              paddingVertical: sizeWidth(2),
            },
          }}
        >
          <MenuOption
            onSelect={() => onPressOne()}
            children={
              <View style={stylesTool.viewComponet}>
                <IconComponets
                  name={"backspace"}
                  size={sizeFont(7)}
                  color={"#fff"}
                  light
                />
                <Text style={stylesTool.textTool}>Gỡ đồng bộ kho</Text>
              </View>
            }
          />
          <MenuOption
            //onSelect={() => onPress()}
            children={
              <View style={stylesTool.viewComponet}>
                <IconComponets
                  name={"history"}
                  size={sizeFont(6)}
                  color={"#fff"}
                  soild
                />
                <Text style={stylesTool.textTool}>Lịch sử giá</Text>
              </View>
            }
          />
          <MenuOption
            //onSelect={() => onPress()}
            children={
              <View style={stylesTool.viewComponet}>
                <IconComponets
                  name={"bookmark"}
                  size={sizeFont(7)}
                  color={"#fff"}
                  soild
                />
                <Text style={stylesTool.textTool}>Thông tin KM</Text>
              </View>
            }
          />
        </MenuOptions>
      </Menu>
    );
  }
}

// HeaderRightComponet.propTypes = {
//   onPress: PropTypes.func,
//   navigation: PropTypes.object,
// };

const stylesTool = StyleSheet.create({
  viewComponet: {
    flexDirection: "row",
    marginVertical: sizeHeight(1),
    alignItems: "center",
    alignContent: "center",
  },
  textTool: {
    color: "#fff",
    marginLeft: sizeWidth(4),
    fontSize: sizeFont(4),
    fontWeight: "400",
  },
});
