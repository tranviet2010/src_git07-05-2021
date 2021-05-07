import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-paper";
import {
  sizeWidth,
  sizeFont,
  sizeHeight,
} from "../../utils/helper/size.helper";
import FontAwesome5Pro from "react-native-vector-icons/FontAwesome5";
import { COLOR } from "../../utils/color/colors";
export class FormTextInputNoIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eye: true,
      show: true,
    };
  }
  onchangeShow = () => {
    this.setState({ show: !this.state.show });
  };
  render() {
    const {
      type,
      size,
      name,
      onChangeText,
      placeholder,
      placeholderTextColor,
      primary,
      color,
      value,
      onDelete,
      style,
    } = this.props.props;
    const {
      eye,
      onSetSee,
      styleTextInput,
      styleChild,
      onPressCustom,
      changeColor,
    } = this.props;
    return (
      <View style={[styles.viewTextInput, style]}>
        <View style={[styles.viewChild, styleChild]}>
          <TouchableOpacity
            onPress={onPressCustom}
            disabled={type == "email" ? false : true}
          >
            <View style={styles.viewChildNest} {...this.props}>
              <TextInput
                mode="flat"
                label={placeholder}
                placeholder={placeholder}
                onChangeText={(text) => {
                  onChangeText(text);
                }}
                value={value}
                onFocus={() => {
                  this.setState({ show: false });
                }}
                underlineColorAndroid="#fff"
                onBlur={() => {
                  this.setState({ show: true });
                }}
                placeholderTextColor={placeholderTextColor}
                style={[styles.textInput, styleTextInput]}
                underlineColor="#fff"
                theme={{
                  colors: {
                    primary: primary,
                    accent: "#ffffff",
                    underlineColor: "transparent",
                  },
                }}
                {...this.props}
              />
              {value != "" && this.state.show == false ? (
                <FontAwesome5Pro
                  onPress={onDelete}
                  name={name}
                  size={sizeFont(4)}
                  solid
                  color={"#969696"}
                  style={
                    {
                      //marginRight: sizeWidth(2),
                    }
                  }
                />
              ) : (
                <FontAwesome5Pro
                  //onPress={onDelete}
                  name={name}
                  size={sizeFont(4)}
                  solid
                  color="#fff"
                  style={{ marginRight: sizeWidth(2) }}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export class FormTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eye: true,
      show: true,
    };
  }
  onchangeShow = () => {
    this.setState({ show: !this.state.show });
  };
  render() {
    const { eye } = this.state;
    const {
      type,
      size,
      name,
      onChangeText,
      placeholder,
      placeholderTextColor,
      primary,
      color,
      value,
      onDelete,
      style,
    } = this.props.props;
    const {
      onSetSee,
      styleTextInput,
      styleChild,
      onPressCustom,
      changeColor,
    } = this.props;
    return (
      <View style={[styles.viewTextInput, style]}>
        <View style={[styles.viewChild, styleChild]}>
          <TouchableOpacity
            onPress={onPressCustom}
            disabled={type == "email" ? false : true}
          >
            <View style={styles.viewChildNest} {...this.props}>
              <TextInput
                mode="flat"
                label={placeholder}
                placeholder={placeholder}
                onChangeText={(text) => {
                  onChangeText(text);
                }}
                value={value}
                onFocus={() => {
                  this.setState({ show: false });
                }}
                underlineColorAndroid="#fff"
                onBlur={() => {
                  this.setState({ show: true });
                }}
                secureTextEntry={type == "password" && eye ? true : false}
                placeholderTextColor={placeholderTextColor}
                style={[styles.textInput, styleTextInput]}
                underlineColor="#fff"
                theme={{
                  colors: {
                    primary: primary,
                    accent: "#ffffff",
                    underlineColor: "transparent",
                  },
                }}
                {...this.props}
              />
              {value != "" && this.state.show == false ? (
                <FontAwesome5Pro
                  onPress={onDelete}
                  name={name}
                  size={sizeFont(4)}
                  solid
                  color={type == "password" ? "#969696" : "#fff"}
                  style={{
                    marginRight: sizeWidth(2),
                  }}
                />
              ) : (
                <FontAwesome5Pro
                  //onPress={onDelete}
                  name={name}
                  size={sizeFont(4)}
                  solid
                  color="#fff"
                  style={{ marginRight: sizeWidth(2) }}
                />
              )}
              {type == "password" ? (
                <TouchableOpacity onPress={() => this.setState({ eye: !eye })}>
                  <Image
                    style={{ width: sizeWidth(7), height: sizeHeight(2.2) }}
                    resizeMode="contain"
                    source={
                      eye
                        ? require("../../assets/images/eye.png")
                        : require("../../assets/images/eye-hidden.png")
                    }
                  />
                </TouchableOpacity>
              ) : (
                <FontAwesome5Pro
                  onPress={onDelete}
                  name={name}
                  size={changeColor != undefined ? sizeFont(7) : sizeFont(4)}
                  solid
                  color={
                    changeColor != undefined
                      ? COLOR.BUTTON
                      : (type == "email" &&
                          value != "" &&
                          this.state.show == false) ||
                        (value != "" && this.state.show == false)
                      ? "#969696"
                      : "#fff"
                  }
                  style={{
                    marginRight: sizeWidth(2),
                    paddingHorizontal: sizeWidth(2),
                    //paddingHorizontal: sizeWidth(1),
                  }}
                  {...this.props}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export class FormTextInput1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eye: true,
      show: true,
    };
  }
  onchangeShow = () => {
    this.setState({ show: !this.state.show });
  };
  render() {
    const { eye } = this.state;
    const {
      type,
      size,
      name,
      onChangeText,
      placeholder,
      placeholderTextColor,
      primary,
      color,
      value,
      onDelete,
      style,
    } = this.props.props;
    const {
      onPressCustom,
      changeColor,
    } = this.props;
    return (
      <View >
        <View >
          <TouchableOpacity
            onPress={onPressCustom}
            disabled={type == "email" ? false : true}
          >
            <View style={styles.viewChildNest1} >
              <TextInput
                mode="flat"
                label={placeholder}
                placeholder={placeholder}
                onChangeText={(text) => {
                  onChangeText(text);
                }}
                value={value}
                onFocus={() => {
                  this.setState({ show: false });
                }}
               
                onBlur={() => {
                  this.setState({ show: true });
                }}
                secureTextEntry={type == "password" && eye ? true : false}
                placeholderTextColor={placeholderTextColor}
                style={styles.textInput1}
                
                theme={{
                  colors: {
                    primary: primary,
                    accent: "#ffffff",
                    underlineColor: "transparent",
                  },
                }}
                {...this.props}
              />
              {value != "" && this.state.show == false ? (
                <FontAwesome5Pro
                  onPress={onDelete}
                  name={name}
                  size={sizeFont(4)}
                  solid
                  color={type == "password" ? "#969696" : "#fff"}
                  style={{
                    marginRight: sizeWidth(2),
                  }}
                />
              ) : (
                <FontAwesome5Pro
                  //onPress={onDelete}
                  name={name}
                  size={sizeFont(4)}
                  solid
                  color="#fff"
                  style={{ marginRight: sizeWidth(2) }}
                />
              )}
              {type == "password" ? (
                <TouchableOpacity onPress={() => this.setState({ eye: !eye })}>
                  <Image
                    style={{ width: sizeWidth(7), height: sizeHeight(2.2)}}
                    resizeMode="contain"
                    source={
                      eye
                        ? require("../../assets/images/eye.png")
                        : require("../../assets/images/eye-hidden.png")
                    }
                  />
                </TouchableOpacity>
              ) : (
                <FontAwesome5Pro
                  onPress={onDelete}
                  name={name}
                  size={changeColor != undefined ? sizeFont(7) : sizeFont(4)}
                  solid
                  color={
                    changeColor != undefined
                      ? COLOR.BUTTON
                      : (type == "email" &&
                          value != "" &&
                          this.state.show == false) ||
                        (value != "" && this.state.show == false)
                      ? "#969696"
                      : "black"
                  }
                  style={{
                    marginRight: sizeWidth(2),
                    paddingHorizontal: sizeWidth(2),
                  }}
                  {...this.props}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default class ComponentTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eye: true,
      show: false,
    };
  }
  onchangeShow = () => {
    this.setState({ show: !this.state.show });
  };
  onSetSee = () => {
    this.setState({
      eye: !this.state.eye,
    });
  };
  render() {
    const { eye } = this.state;
    const { size, name, color, nameIcon } = this.props;
    return (
      <View style={styles.conatainer}>
        <Image
          source={
            nameIcon === "user-circle"
              ? require("../../assets/images/uer-login.png")
              : require("../../assets/images/pass.png")
          }
          resizeMode="contain"
          style={{
            width: sizeWidth(10),
            height: sizeHeight(4.2),
          }}
        />
        <FormTextInput props={this.props} eye={eye} onSetSee={this.onSetSee} />
      </View>
    );
  }
}
export class ComponentSign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eye: true,
      show: false,
    };
  }
  onchangeShow = () => {
    this.setState({ show: !this.state.show });
  };
  onSetSee = () => {
    this.setState({
      eye: !this.state.eye,
    });
  };
  render() {
    const { eye } = this.state;
    const { size, name, color, nameIcon } = this.props;
    return (
      <View style={styles.conatainer1}>
        <FormTextInput props={this.props} eye={eye} onSetSee={this.onSetSee} />
      </View>
    );
  }
}

export class ComponentSign1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eye: true,
      show: false,
    };
  }
  onchangeShow = () => {
    this.setState({ show: !this.state.show });
  };
  onSetSee = () => {
    this.setState({
      eye: !this.state.eye,
    });
  };
  render() {
    const { eye } = this.state;
    const { size, name, color, nameIcon } = this.props;
    return (
      <View style={styles.conatainer2}>
        <FormTextInput1 props={this.props} eye={eye} onSetSee={this.onSetSee} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conatainer: {
    alignSelf: "center",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    marginTop: sizeHeight(4),
    width: sizeWidth(90),
  },
  conatainer1: {
    borderBottomColor:'yellow',
    marginTop: sizeHeight(4),
    width: sizeWidth(100),
  },
  conatainer2: {
   
    marginTop: sizeHeight(4),
    
  },
  viewTextInput: {
    borderRadius:100,
  },
  viewChild: {
    borderRadius: 10,
    height: 55,
  },
  viewChildNest: {
    alignSelf: "center",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    height: 57,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  textInput: {
    backgroundColor: "#fff",
    width: sizeWidth(65),
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  viewChildNest1: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems: "center",
    height: 57,
    borderRadius:25,
    borderWidth:2,
  },
  textInput1: {
    backgroundColor: COLOR.HEADER,
    borderRadius:50,
    borderWidth:2,
    width: sizeWidth(70),
    height:sizeHeight(10)
  },
});
