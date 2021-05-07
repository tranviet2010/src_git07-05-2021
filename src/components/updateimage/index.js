import React, { Component } from "react";
import ImagePicker from "react-native-image-picker";
const options = {
  title: "Select Avatar",
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
  maxWidth: 720,
  maxHeight: 1080,
};
export default class UpdateImageComponent extends Component {
  handleImage = (type) => {
    ImagePicker.showImagePicker(options, async (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState(
          {
            loading: true,
          },
          () => this.upload(source, response.data, type)
        );

        console.log("image", response);
      }
    });
  };
  upload = (source, data, type) => {
    if (source != null) {
      var photo = { ...source, name: "image.jpg", type: "image/jpeg" };

      //If file selected then create FormData
      const data = new FormData();
      data.append("name", "imagefile");
      data.append("image", photo);
      fetch("http://admin.babumart.vn/f/upload_image.jsp", {
        method: "post",
        body: data,
        headers: {
          "Content-Type": "multipart/form-data; ",
          "Content-Disposition": "form-data",
        },
      })
        .then(async (res) => {
          let responseJson = await res.json();
          console.log(responseJson);
          if (responseJson.ERROR == "0000") {
            console.log("Upload Successful", responseJson.URL);
            if (type === 1) {
              this.setState(
                {
                  imageAvatar: responseJson.URL,
                },
                () => this.setState({ loading: false })
              );
            } else if (type === 2) {
              this.setState(
                {
                  CMT_1: responseJson.URL,
                },
                () => this.setState({ loading: false })
              );
            } else if (type === 3) {
              this.setState(
                {
                  CMT_2: responseJson.URL,
                },
                () => this.setState({ loading: false })
              );
            }
            //this.props.onChange(responseJson.URL);
          } else {
            this.setState(
              {
                loading: false,
              },
              () => {
                this.message = setTimeout(
                  () =>
                    AlertCommon("Thông báo", result.data.RESULT, () => null),
                  10
                );
              }
            );
          }
        })
        .catch((err) => {
          console.log("err", err);
          this.setState({ loading: false });
        });
    }
  };
  render() {
    return null;
  }
}
