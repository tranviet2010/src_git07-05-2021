import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import SearchComponent from "../../../components/search";
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../utils/helper/size.helper";
import _ from "lodash";
import { COLOR } from "../../../utils/color/colors";
import styles from "../style";
import IconComponets from "../../../components/icon";

class Collaborator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      city: "- tất cả -",
      level: "- tất cả -",
    };
  }
  changeCity = (text) => {
    if (text == "- tất cả -") {
      this.setState({ city: "- tất cả -" });
    } else this.setState({ city: text.NAME });
  };
  changeLevel = (text) => {
    this.setState({ level: text });
  };
  render() {
    const { search, city, level } = this.state;
    return (
      <View>
        <View style={styles.container}>
          <SearchComponent
            name="search"
            color="#999"
            size={sizeFont(6)}
            value={search}
            placeholder={"Tên/Mã/Số điện thoại"}
            onChangeText={(text) => this.setState({ search: text })}
            style={{
              borderColor: COLOR.BUTTON,
              borderWidth: 1,
              paddingHorizontal: sizeWidth(2),
              width: sizeWidth(96),
            }}
            isIcon={true}
          />
          <View style={{ flexDirection: "row", marginTop: sizeHeight(1) }}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("LevelCollaborator", {
                  onSetLevel: this.changeLevel,
                })
              }
              style={styles.touchOne}
            >
              <View>
                <Text style={styles.textFirst}>Cấp đại lý</Text>
                <Text style={styles.textSecond}>
                  {_.truncate(level, {
                    length: 19,
                  })}
                </Text>
              </View>
              <View style={styles.viewIcon}>
                <IconComponets
                  name="angle-down"
                  size={sizeFont(7)}
                  color={"#fff"}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("ListCountries", {
                  onSetCity: this.changeCity,
                })
              }
              style={styles.touchTwo}
            >
              <View>
                <Text style={styles.textFirst}>Tỉnh/Thành phố</Text>
                <Text style={styles.textSecond}>
                  {_.truncate(city, {
                    length: 19,
                  })}
                </Text>
              </View>
              <View style={styles.viewIcon}>
                <IconComponets
                  name="angle-down"
                  size={sizeFont(7)}
                  color={"#fff"}
                />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.touchSearchColl}>
            <Text style={{ textAlign: "center", color: "#fff" }}>Tìm kiếm</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewColl}>
          <Text>
            Tổng số đại lý:{" "}
            <Text style={{ fontSize: sizeFont(4), fontWeight: "bold" }}>0</Text>
          </Text>
        </View>
        <View style={styles.viewPerson}>
          <View
            style={[
              styles.viewChildPerson,
              { borderLeftColor: "#fff", borderLeftWidth: 1 },
            ]}
          >
            <Text style={styles.textColl}>Họ và tên</Text>
          </View>
          <View style={[styles.viewChildPerson, { flex: 0.6 }]}>
            <Text style={styles.textColl}>Mã</Text>
          </View>
          <View style={styles.viewChildPerson}>
            <Text style={styles.textColl}>Điện thoại</Text>
          </View>
          <View style={styles.viewChildPerson}>
            <Text style={styles.textColl}>Cấp đại lý</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  null
)(Collaborator);
