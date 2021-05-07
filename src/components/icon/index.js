import React, { Component } from "react";
import FontAwesome5Pro from "react-native-vector-icons/FontAwesome5";
import PropTypes from "prop-types";
export default class IconComponets extends Component {
  render() {
    const { size, name, color, light } = this.props;
    
    return (
      <FontAwesome5Pro size={size} name={name} color={color} {...this.props} />
    );
  }
}

IconComponets.propTypes = {
  size: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
