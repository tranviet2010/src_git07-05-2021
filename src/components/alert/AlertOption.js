import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Button, Paragraph, Dialog, Portal } from "react-native-paper";
import { COLOR } from "../../utils/color/colors";
import {
  sizeHeight,
  sizeWidth,
  sizeFont,
} from "../../utils/helper/size.helper";

//import { StyleSheet } from 'react-native';

export default class AlertOption extends Component {
  render() {
    const {
      showAlertOption,
      onClose,
      title,
      message,
      onCloseContinue,
      Cancel,
      Continue,
    } = this.props;

    return showAlertOption ? (
      <View>
        <Portal>
          <Dialog visible={showAlertOption} onDismiss={onClose}>
            <Dialog.Title style={styles.textTitle}>{title} </Dialog.Title>
            <Dialog.Content>
              <Paragraph style={styles.textMessage}>{message} </Paragraph>
            </Dialog.Content>
            <Dialog.Actions
              style={{
                justifyContent: "space-between",
                borderTopWidth: 0.5,
                borderTopColor: "#ddd",
              }}
            >
              <TouchableOpacity
                onPress={onClose}
                style={[styles.touch, { borderRightWidth: 1 }]}
              >
                <Text style={styles.textTouch}>{Cancel} </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touch} onPress={onCloseContinue}>
                <Text style={[styles.textTouch, { color: "#017DFF" }]}>
                  {Continue}
                </Text>
              </TouchableOpacity>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  containerTouch: {
    flexDirection: "row",
    alignSelf: "center",
  },
  touch: {
    paddingVertical: sizeHeight(1.5),
    marginHorizontal: sizeWidth(3),
  },
  textTouch: {
    fontSize: sizeFont(4.2),
    color: COLOR.BUTTON,
    textAlign: "center",
  },
  textMessage: {
    fontSize: sizeFont(4),
    textAlign: "center",
  },
  textTitle: {
    fontSize: sizeFont(5),
    textAlign: "center",
  },
});
