import React, { Component, PureComponent } from "react";
import { Provider, Paragraph, Portal, Dialog } from "react-native-paper";

import { TouchableOpacity, Text } from "react-native";
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../utils/helper/size.helper";
import { COLOR } from "../../utils/color/colors";

export default class AlertDesignNotification extends PureComponent {
  render() {
    let { showAlert, onClose, message, title } = this.props;
    return showAlert ? (
      <Portal>
        <Dialog
          visible={showAlert}
          dismissable={false}
          onDismiss={() => {
            // this.setState({showAlert: false});
            onClose();
          }}
        >
          <Dialog.Title style={{ textAlign: "center", fontSize: sizeFont(5) }}>
            {title}
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={{ textAlign: "center", fontSize: sizeFont(4) }}>
              {message}
            </Paragraph>
          </Dialog.Content>

          <TouchableOpacity
            style={{
              paddingVertical: sizeHeight(1.5),
              backgroundColor: COLOR.BUTTON,
              overflow: "hidden",
              width: sizeWidth(30),
              alignSelf: "center",
              borderRadius: 6,
              marginBottom: 10,
            }}
            onPress={() => {
              //   this.setState({showAlert: false});
              onClose();
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: sizeFont(4),
                color: "#fff",
              }}
            >
              OK
            </Text>
          </TouchableOpacity>
        </Dialog>
      </Portal>
    ) : null;
  }
}
