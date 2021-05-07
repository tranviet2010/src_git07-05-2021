import React,{Component} from 'react'
import { StyleSheet, Text, View,FlatList,TouchableOpacity,Image } from 'react-native'
import { connect } from "react-redux";
import {GetInformation} from "../../../../service/account"
import HTML from "react-native-render-html";
import { IGNORED_TAGS } from "react-native-render-html/src/HTMLUtils";
import _ from "lodash";
import {
    sizeFont,
    sizeWidth,
    sizeHeight,
  } from "../../../../utils/helper/size.helper";
 

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

class index extends Component {
    constructor(props){
        super(props)
        this.state={
            data_intro:[],
        }
    }
    handleLoad1 = async () => {
        await GetInformation({
          USERNAME: this.props.authUser.USERNAME,
          TYPES: 2,
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

    render(){

    const {data_intro}=this.state;
    console.log("SADfdsfsd",data_intro)
    return (
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
              style={{flexDirection:'row'}}
            >
              <View>
                <Image
                  source={
                    item.IMAGE_COVER == null
                      ? require("../../../../assets/images/camera.png")
                      : { uri: item.IMAGE_COVER }
                  }
                  resizeMode="center"
                  style={{ width: sizeWidth(20), height: sizeHeight(15) }}
                />
              </View>
              <View>
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
    )
}
}
const mapStateToProps = (state) => {
    return {
      status: state.authUser.status,
      authUser: state.authUser.authUser,
      username: state.authUser.username,
      idshop: state.product.database,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      LoginPhone: (data) => dispatch(LoginPhone(data)),
      UpdateDivice: (data) => dispatch(UpdateDivice(data)),
      GetProfile: (data) => dispatch(GetProfile(data)),
      countNotify: (text) => dispatch(countNotify(text)),
    };
  };
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(index);
const styles = StyleSheet.create({})
