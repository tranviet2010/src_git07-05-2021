import React, { Component } from "react";
import Modal from "react-native-modal";
import {
  View,
  SectionList,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  sizeHeight,
  sizeWidth,
  sizeFont,
} from "../../../utils/helper/size.helper";
import { COLOR } from "../../../utils/color/colors";
import IconComponets from "../../../components/icon";

export default class SearchComponent extends Component {
  render() {
    const { showModal, closeModal, data } = this.props;
    return (
      <Modal
        isVisible={showModal}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        backdropOpacity={0}
      >
        <View
          style={{
            backgroundColor: "#fff",
            height: sizeHeight(70),
            borderWidth: 1,
            borderColor: "red",
          }}
        >
          <SectionList
            sections={data}
            keyExtractor={(item, index) => {
              return index;
            }}
            renderItem={({ item, section, index }) => {
              if (index == section.INFO.length - 1) {
                this.count = 0;
              }
              return this.count == 0 ? (
                <View>
                  <FlatList
                    data={section.INFO}
                    //horizontal={true}
                    renderItem={({ item, index }) => {
                      this.count = this.count + 1;
                      return (
                        <TouchableOpacity
                          style={{
                            overflow: "hidden",
                            borderBottomColor: "#ddd",
                            borderBottomWidth: 1,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingVertical: sizeHeight(1.5),
                            paddingHorizontal: sizeWidth(2.5),
                          }}
                          onPress={() =>
                            navigation.navigate("DetailProducts", {
                              ID_PRODUCT: item.ID_PRODUCT,
                            })
                          }
                        >
                          <Text
                            style={{
                              fontSize: sizeFont(4),
                              //   paddingVertical: sizeHeight(3.5),
                              //   paddingHorizontal: sizeWidth(2),
                              //   paddingTop: sizeHeight(4.5),
                              //   paddingVertical: sizeHeight(1),
                            }}
                          >
                            {item.PRODUCT_NAME}{" "}
                          </Text>
                          <IconComponets
                            name="angle-right"
                            size={sizeFont(6)}
                            color="#888"
                          />
                        </TouchableOpacity>
                      );
                    }}
                    keyExtractor={(item) => item.ID_PRODUCT.toString()}
                  />
                </View>
              ) : null;
            }}
            stickySectionHeadersEnabled={true}
            renderSectionHeader={({ section: { PARENT_NAME, ID } }) => (
              <View
                style={{
                  backgroundColor: "#ddd",
                  paddingVertical: sizeHeight(1.5),
                  flexDirection: "row",
                  alignItems: "center",
                  alignContent: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: sizeWidth(2.5),
                }}
              >
                <Text style={{ fontSize: sizeFont(4.5), fontWeight: "bold" }}>
                  {PARENT_NAME}{" "}
                </Text>
              </View>
            )}
          />
        </View>
      </Modal>
    );
  }
}
