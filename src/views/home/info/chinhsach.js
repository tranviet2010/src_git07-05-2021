import React,{Component} from 'react'
import { StyleSheet, Text, View,FlatList,TouchableOpacity,Image } from 'react-native'
import { connect } from "react-redux";
import {GetInformation} from "../../../service/account"
import HTML from "react-native-render-html";
import { IGNORED_TAGS } from "react-native-render-html/src/HTMLUtils";
import _ from "lodash";
import {
    sizeFont,
    sizeWidth,
    sizeHeight,
  } from "../../../utils/helper/size.helper";
const tags = _.without(
    IGNORED_TAGS,
    "table",
    "caption",
    "col",
    "colgroup",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "tr"
  );
  const renderers = {
    table: (x, c) => <View style={tableColumnStyle}>{c}</View>,
    col: (x, c) => <View style={tableColumnStyle}>{c}</View>,
    colgroup: (x, c) => <View style={tableRowStyle}>{c}</View>,
    tbody: (x, c) => <View style={tableColumnStyle}>{c}</View>,
    tfoot: (x, c) => <View style={tableRowStyle}>{c}</View>,
    th: (x, c) => <View style={thStyle}>{c}</View>,
    thead: (x, c) => <View style={tableRowStyle}>{c}</View>,
    caption: (x, c) => <View style={tableColumnStyle}>{c}</View>,
    tr: (x, c) => <View style={tableRowStyle}>{c}</View>,
    td: (x, c) => <View style={tdStyle}>{c}</View>,
  };

class chinhsach extends Component {
    constructor(props){
        super(props)
        this.state={
            data_intro:[],
        }
    }
    handleLoad1 = async () => {
        // type:2 chính sách
        await GetInformation({
          USERNAME: this.props.authUser.USERNAME,
          TYPES: 3,
          ID_PARENT: '',
          IDSHOP: "F6LKFY",
          CATEGORY: '',
        })
          .then((result) => {
            if (result.data.ERROR == "0000") {
              this.setState(
                {
                  data_intro: result.data.INFO,
                },
                () => {
    
                  this.setState({ loading: false });
                }
              );
            } else {
              this.setState({ loading: false }, () => {
                AlertCommon("Thông báo", result.data.RESULT, () => null)
                console.log(this.state.data)
              }
              );
            }
          })
          .catch((error) => {
            this.setState({ loading: false });
          });
      }
    componentDidMount(){
        this.handleLoad1();
    }
    render() {
      const {data_intro}=this.state;
      console.log("chinh sách",data_intro)
        return (
            <View>
            {/* chính sách */}
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={styles.title}>Tin tức</Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("Chính sách")}
                ><Text style={styles.title}>Xem thêm</Text></TouchableOpacity>
              </View>
              <View>
                <FlatList
                  data={data_intro}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
  
                        onPress={() =>
                          navigation.navigate("DetailProducts", {
                            ID_PRODUCT: item.ID_PRODUCT,
                            NAME: "Home",
                          })
                        }
                        style={{flexDirection:'row',alignItems:'center'}}
                      >
                        <View> 
                          <Image
                            source={
                              item.IMAGE_COVER == null
                                ? require("../../../assets/images/camera.png")
                                : { uri: item.IMAGE_COVER }
                            }
                            resizeMode="center"
                            style={{ width: sizeWidth(20), height: sizeHeight(15) }}
                          />
                        </View>
                        <View style={{marginLeft:sizeWidth(10)}}>
                          <Text>{item.TITLE}</Text>
                          <HTML
                            ignoredTags={tags}
                            html={
                              item.CONTENT === null
                                ? "<h1>Không có dữ liệu</h1>"
                                : item.CONTENT
                            }
                            onLinkPress={(event, href) =>
                              console.log("clicked link: ", href)
                            }
                            renderers={renderers}
                            baseFontStyle={{ fontSize: sizeFont(4) }}
                          />
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
  
              </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title:{
        fontSize:sizeFont(4.5)
      }
})


const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    username: state.authUser.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(chinhsach);
