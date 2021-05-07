import React, { Component, PureComponent } from "react";
import { connect } from "react-redux";
import Itemorder from "./itemorder";
import Itemstore from "./itemstore";

class OrderUser extends PureComponent {
  render() {
    const { navigation, name } = this.props;
    return name === "OrderUser" ? (
      <Itemorder TYPE={1} navigation={navigation} name={name} />
    ) : (
      <Itemstore TYPE={1} navigation={navigation} name={name} />
    );
  }
}
// const mapStateToProps = (state) => {
//   return {
//     status: state.authUser.status,
//     authUser: state.authUser.authUser,
//     username: state.authUser.username,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {};
// };
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(OrderUser);

export default OrderUser;
