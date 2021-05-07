import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import styles from "./style";

export default class NewPolicy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueTitle: "",
      content: "",
    };
  }

  componentDidMount() {}
  render() {
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
          <Text style={styles.textTouch}>Thêm mới</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
