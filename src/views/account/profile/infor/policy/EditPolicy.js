import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  sizeHeight,
  sizeWidth,
  sizeFont,
} from "../../../../../utils/helper/size.helper";
import { COLOR } from "../../../../../utils/color/colors";
import styles from "./style";

export default class EditPolicy extends Component {
  constructor(props) {
    super(props);
    const { item } = this.props.route.params;
    this.state = {
      valueTitle: item.TITLE,
      content: item.DESCRIPTION,
    };
  }

  componentDidMount() {}
  render() {
    const { item } = this.props.route.params;
    const { valueTitle, content } = this.state;
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
      >
        <View style={styles.viewTitle}>
          <Text style={styles.title}>Tiêu đề</Text>
          <TextInput
            value={valueTitle}
            style={styles.textInput}
            onChangeText={(text) => this.setState({ valueTitle: text })}
          />
        </View>
        <Text style={styles.textContent}>Nội dung</Text>
        <TextInput
          value={content}
          style={styles.textInputContent}
          onChangeText={(text) => this.setState({ content: text })}
          multiline={true}
        />
        <TouchableOpacity style={styles.touch}>
          <Text style={styles.textTouch}>Cập nhật</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

